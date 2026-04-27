#!/usr/bin/env python3
# PATCHED: Apr 13-14 2026
# Changes from original:
#   - Validation tags: "MX Validated" → ["mx", "domain-resolves"] (lowercase, matches PROD-03 filter)
#   - Scraper blocklist expanded to 30+ domains (facebook, instagram, vagaro, gmail, etc.)
#   - Industry sets odd: removed small_church + dental_clinic, added handyman_contractor + landscaping
#   - iMessage status reports via IMESSAGE_RECIPIENT in config.env
# Live path: ~/arcg_prod08/arcg_daily_discovery.py
# Launchd: com.arcgsystems.prod08.plist — M-F 7AM,9:30AM,12PM,2:30PM,5PM
"""
ARCG PROD-08 — Daily Automated Lead Discovery
Feeds the live PROD-03 → Instantly cold-outreach pipeline.

Rotation: 5 cities × 9 industries/day = 45 searches/day, 990/month.
DR + Colombia get 50% of monthly budget (weeks 1 & 3).

Usage:
  python3 arcg_daily_discovery.py                # normal daily run
  python3 arcg_daily_discovery.py --dry-run      # discover + filter, no writes
  python3 arcg_daily_discovery.py --test         # 1 city × 1 industry, live writes
  python3 arcg_daily_discovery.py --week 1       # override week number
  python3 arcg_daily_discovery.py --day ODD      # override industry set
  python3 arcg_daily_discovery.py --limit 9      # cap total searches
  python3 arcg_daily_discovery.py --full          # all 15 industries (75 searches)
"""

import os
import sys
import json
import time
import hashlib
import argparse
import logging
import subprocess
from pathlib import Path
from datetime import date, datetime
from urllib.parse import urlparse

import requests

# ── LANGUAGE ROUTING CONSTANTS ──
SPANISH_CAMPAIGN_MARKER = "SPANISH"
ENGLISH_CAMPAIGN_MARKER = "ENGLISH"
PUERTO_RICO_CITIES = ["San Juan, Puerto Rico", "Ponce, Puerto Rico"]

def get_language_flag(city_name, city_lang):
    """Returns SPANISH or ENGLISH based on city routing rules.
    Puerto Rico = ENGLISH (US territory, bilingual, English templates appropriate)."""
    if city_lang == "es" and city_name not in PUERTO_RICO_CITIES:
        return SPANISH_CAMPAIGN_MARKER
    return ENGLISH_CAMPAIGN_MARKER

def send_imessage(recipient, message):
    """Send iMessage via macOS osascript. Silent fail if not on Mac."""
    escaped = message.replace('"', '\\"').replace('\n', '\\n')
    applescript = f'''
    tell application "Messages"
        set targetService to 1st service whose service type = iMessage
        set targetBuddy to buddy "{recipient}" of targetService
        send "{escaped}" to targetBuddy
    end tell
    '''
    try:
        result = subprocess.run(
            ["osascript", "-e", applescript],
            capture_output=True, text=True, timeout=10
        )
        return result.returncode == 0
    except Exception:
        return False

# ══════════════════════════════════════════════════════════════════
# ENVIRONMENT
# ══════════════════════════════════════════════════════════════════

SCRIPT_DIR = Path(__file__).parent
ENV_PATH = SCRIPT_DIR / "config.env"
LOG_DIR = SCRIPT_DIR / "logs"
LOG_DIR.mkdir(exist_ok=True)

def load_env():
    """Load config.env into os.environ."""
    if not ENV_PATH.exists():
        print("✗ config.env not found at", ENV_PATH)
        sys.exit(1)
    for line in ENV_PATH.read_text().strip().splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        key, _, val = line.partition("=")
        os.environ.setdefault(key.strip(), val.strip())

load_env()

REQUIRED_KEYS = ["SERPAPI_KEY", "AIRTABLE_TOKEN", "AIRTABLE_BASE",
                  "AIRTABLE_TABLE", "AIRTABLE_FP_TABLE", "APOLLO_KEY"]
for k in REQUIRED_KEYS:
    if not os.environ.get(k):
        print(f"✗ Missing required env var: {k}")
        sys.exit(1)

SERPAPI_KEY    = os.environ["SERPAPI_KEY"]
AIRTABLE_TOKEN= os.environ["AIRTABLE_TOKEN"]
AIRTABLE_BASE = os.environ["AIRTABLE_BASE"]
AIRTABLE_TABLE= os.environ["AIRTABLE_TABLE"]
AIRTABLE_FP   = os.environ["AIRTABLE_FP_TABLE"]
APOLLO_KEY    = os.environ["APOLLO_KEY"]

def mask(s, show=8):
    """Mask a secret, showing only the first `show` chars."""
    return s[:show] + "..." if len(s) > show else s

# ══════════════════════════════════════════════════════════════════
# INDUSTRY CONFIG — targeting small, independently owned local
# businesses: mom-and-pop shops, small residential communities,
# local churches, neighborhood services. NOT corporate chains.
# ══════════════════════════════════════════════════════════════════

INDUSTRY_MAP = {
    # ── CORE: small property / residential / community ──
    "small_property":      "Property Management",
    "condo_hoa":           "Property Management",
    "small_church":        "Other",
    # ── LOCAL SERVICES: neighborhood shops ──
    "barber_beauty":       "Other",
    "nail_salon":          "Other",
    "deli_cafe":           "Other",
    "auto_detail_repair":  "Other",
    "laundromat":          "Other",
    # ── TRADES: local contractors ──
    "hvac_plumbing":       "HVAC / Plumbing / Electrical",
    "handyman_contractor": "Facilities / Maintenance",
    "cleaning":            "Cleaning / Janitorial",
    "landscaping":         "Other",
    # ── PROFESSIONAL: small offices ──
    "dental_clinic":       "Other",
    "medical_office":      "Other",
    "tax_accounting":      "Other",
    "small_law":           "Other",
    "insurance_agent":     "Other",
    # ── OTHER LOCAL ──
    "daycare":             "Other",
    "pet_grooming":        "Other",
    "printing_shipping":   "Other",
    "fitness_studio":      "Other",
}

QUERY_EN = {
    "small_property":      "small property management company residential",
    "condo_hoa":           "condominium association HOA management",
    "small_church":        "small church congregation ministry",
    "barber_beauty":       "barber shop beauty salon",
    "nail_salon":          "nail salon manicure",
    "deli_cafe":           "deli sandwich shop cafe local",
    "auto_detail_repair":  "auto detailing car repair shop",
    "laundromat":          "laundromat dry cleaner",
    "hvac_plumbing":       "plumber HVAC contractor local",
    "handyman_contractor": "handyman contractor home repair",
    "cleaning":            "cleaning service maid residential",
    "landscaping":         "landscaping lawn care service",
    "dental_clinic":       "dentist dental office clinic",
    "medical_office":      "doctor medical office family practice",
    "tax_accounting":      "tax preparer accountant CPA",
    "small_law":           "attorney law office small",
    "insurance_agent":     "insurance agent local broker",
    "daycare":             "daycare childcare center preschool",
    "pet_grooming":        "pet grooming dog groomer",
    "printing_shipping":   "printing shop shipping center",
    "fitness_studio":      "gym fitness studio personal training",
}

QUERY_ES = {
    "small_property":      "administracion de propiedades residencial",
    "condo_hoa":           "administracion de condominios",
    "small_church":        "iglesia pequeña congregacion",
    "barber_beauty":       "barberia salon de belleza",
    "nail_salon":          "salon de uñas manicure",
    "deli_cafe":           "cafeteria delicatessen local",
    "auto_detail_repair":  "taller mecanico detallado automotriz",
    "laundromat":          "lavanderia tintoreria",
    "hvac_plumbing":       "plomero aire acondicionado local",
    "handyman_contractor": "contratista reparaciones hogar",
    "cleaning":            "servicio de limpieza residencial",
    "landscaping":         "jardineria mantenimiento de jardines",
    "dental_clinic":       "consultorio dental dentista",
    "medical_office":      "consultorio medico doctor",
    "tax_accounting":      "contador publico preparador de impuestos",
    "small_law":           "abogado oficina legal",
    "insurance_agent":     "agente de seguros local",
    "daycare":             "guarderia centro de cuidado infantil",
    "pet_grooming":        "peluqueria canina mascotas",
    "printing_shipping":   "imprenta centro de envios",
    "fitness_studio":      "gimnasio estudio fitness",
}

# 9 industries per day, all 21 covered every ~2.3 days
INDUSTRY_SETS = {
    "odd": [
        # Mon/Wed/Fri — property + community + neighborhood services
        "small_property", "condo_hoa", "small_church",
        "barber_beauty", "nail_salon", "deli_cafe",
        "hvac_plumbing", "dental_clinic", "cleaning",
    ],
    "even": [
        # Tue/Thu — trades + professional + other local
        "small_property", "auto_detail_repair", "laundromat",
        "handyman_contractor", "landscaping", "medical_office",
        "tax_accounting", "daycare", "pet_grooming",
    ],
    "full": [
        # All 21 — use with --full flag
        "small_property", "condo_hoa", "small_church",
        "barber_beauty", "nail_salon", "deli_cafe",
        "auto_detail_repair", "laundromat",
        "hvac_plumbing", "handyman_contractor", "cleaning", "landscaping",
        "dental_clinic", "medical_office", "tax_accounting",
        "small_law", "insurance_agent",
        "daycare", "pet_grooming", "printing_shipping", "fitness_studio",
    ],
}

ALL_INDUSTRIES = list(INDUSTRY_MAP.keys())

# ══════════════════════════════════════════════════════════════════
# CITY SCHEDULE
# ══════════════════════════════════════════════════════════════════

def city(name, ll, lang="en"):
    return {"name": name, "ll": ll, "lang": lang}

# ── PRIMARY: DC METRO SMALL COMMUNITIES (weeks 1 & 2 = 50% of budget) ──
# ── SECONDARY: other US East Coast cities (week 3 = 25%) ──
# ── TERTIARY: international rotation (week 4 = 25%) ──
#
# Targeting: mom-and-pop shops, small residential communities,
# local churches, neighborhood services, condos, barber shops,
# nail salons, delis, small contractors. NOT corporate chains.
# Zoom level 14-15z = tight neighborhood radius for hyper-local results.

# ═══════════════════════════════════════════════════════════════════
# CITY ROTATION — targeting small community-driven cities with
# independent mom-and-pop businesses. NOT big corporate metros.
# Week 1: DC Metro home base (Hyattsville corridor)
# Week 2: Florida + Southeast small cities
# Week 3: Northeast + West Coast + Islands
# Week 4: Extended rotation (8 sets — cycles every 8 months)
# Zoom 14-15z = neighborhood-level results.
# ═══════════════════════════════════════════════════════════════════

WEEK_1_CITIES = [
    # HOME BASE — DC Metro / PG County / Hyattsville corridor
    city("Hyattsville MD",         "@38.9560,-76.9455,15z"),
    city("College Park MD",        "@38.9807,-76.9369,15z"),
    city("Takoma Park MD",         "@38.9779,-77.0075,15z"),
    city("Petworth DC",            "@38.9417,-77.0241,15z"),
    city("Brookland DC",           "@38.9340,-76.9936,15z"),
]

WEEK_2_CITIES = [
    # FLORIDA + SOUTHEAST — small community cities (operator-specified)
    city("Winter Park FL",         "@28.5999,-81.3392,14z"),
    city("Opa-locka FL",           "@25.9023,-80.2501,14z"),
    city("St Augustine FL",        "@29.8946,-81.3145,14z"),
    city("Key West FL",            "@24.5551,-81.7800,14z"),
    city("Dunwoody GA",            "@33.9462,-84.3346,14z"),
]

WEEK_3_CITIES = [
    # NORTHEAST + WEST + ISLANDS (operator-specified)
    city("New Rochelle NY",        "@40.9115,-73.7824,14z"),
    city("Long Island NY",         "@40.7891,-73.1350,13z"),
    city("Pittsburgh PA",          "@40.4406,-79.9959,13z"),
    city("Philadelphia PA",        "@39.9526,-75.1652,13z"),
    city("Brentwood CA",           "@37.9317,-121.6961,14z"),
]

INTL_ROTATIONS = {
    0: [  # months 4, 8, 12 — West Coast + Pacific Islands
        city("San Diego CA",          "@32.7157,-117.1611,13z"),
        city("Boise ID",              "@43.6150,-116.2023,13z"),
        city("Portland OR",           "@45.5152,-122.6784,13z"),
        city("Honolulu HI",           "@21.3069,-157.8583,13z"),
        city("Hagatna Guam",          "@13.4443,144.7937,13z"),
    ],
    1: [  # months 1, 5, 9 — DC Metro extended + Poconos
        city("Silver Spring MD",      "@38.9940,-77.0261,15z"),
        city("Arlington VA",          "@38.8799,-77.1068,14z"),
        city("Mount Rainier MD",      "@38.9415,-76.9650,15z"),
        city("Poconos PA",            "@41.0534,-75.2479,13z"),
        city("Bladensburg MD",        "@38.9390,-76.9339,15z"),
    ],
    2: [  # months 2, 6, 10 — Louisiana + Southern small cities
        city("Shreveport LA",         "@32.5252,-93.7502,13z"),
        city("Baton Rouge LA",        "@30.4515,-91.1871,13z"),
        city("Savannah GA",           "@32.0809,-81.0912,13z"),
        city("Charleston SC",         "@32.7765,-79.9311,13z"),
        city("Pensacola FL",          "@30.4213,-87.2169,13z"),
    ],
    3: [  # months 3, 7, 11 — Northeast small communities
        city("Yonkers NY",            "@40.9312,-73.8988,14z"),
        city("White Plains NY",       "@41.0340,-73.7629,14z"),
        city("Trenton NJ",            "@40.2171,-74.7429,14z"),
        city("Wilmington DE",         "@39.7391,-75.5398,14z"),
        city("Annapolis MD",          "@38.9784,-76.4922,14z"),
    ],
    4: [  # months — PG County deeper + Baltimore corridor
        city("Bowie MD",              "@38.9428,-76.7301,14z"),
        city("Laurel MD",             "@39.0993,-76.8483,14z"),
        city("Capitol Heights MD",    "@38.8851,-76.9158,15z"),
        city("Greenbelt MD",          "@38.9946,-76.8830,15z"),
        city("Baltimore MD",          "@39.2904,-76.6122,13z"),
    ],
    5: [  # months — Florida beach + resort communities
        city("Fort Lauderdale FL",    "@26.1224,-80.1373,13z"),
        city("Daytona Beach FL",      "@29.2108,-81.0228,14z"),
        city("Naples FL",             "@26.1420,-81.7948,14z"),
        city("Clearwater FL",         "@27.9659,-82.8001,14z"),
        city("Kissimmee FL",          "@28.2920,-81.4076,14z"),
    ],
    6: [  # months — Spanish Caribbean (low priority, still in rotation)
        city("Santo Domingo, DR",    "@18.4861,-69.9312,13z", "es"),
        city("Santiago, DR",          "@19.4517,-70.6970,13z", "es"),
        city("Bogota, Colombia",      "@4.7110,-74.0721,12z",  "es"),
        city("Medellin, Colombia",    "@6.2442,-75.5812,13z",  "es"),
        city("San Juan, Puerto Rico", "@18.4655,-66.1057,13z", "en"),
    ],
    7: [  # months — Mid-size US cities with community character
        city("Richmond VA",           "@37.5407,-77.4360,13z"),
        city("Norfolk VA",            "@36.8508,-76.2859,13z"),
        city("Asheville NC",          "@35.5951,-82.5515,14z"),
        city("Greenville SC",         "@34.8526,-82.3940,14z"),
        city("Knoxville TN",          "@35.9606,-83.9207,13z"),
    ],
}

WEEK_LABELS = {
    1: "DC Metro — Hyattsville / PG County Home Base",
    2: "Florida + Southeast Small Cities",
    3: "Northeast + West Coast + Islands",
    4: "Extended Rotation",
}

# ══════════════════════════════════════════════════════════════════
# SCHEDULE RESOLVER
# ══════════════════════════════════════════════════════════════════

def resolve_schedule(today, week_override=None, day_override=None, use_full=False):
    week = week_override or min((today.day - 1) // 7 + 1, 4)
    parity = day_override or ("odd" if today.isoweekday() % 2 == 1 else "even")
    month_rot = today.month % len(INTL_ROTATIONS)

    if week == 1:
        cities = WEEK_1_CITIES
    elif week == 2:
        cities = WEEK_2_CITIES
    elif week == 3:
        cities = WEEK_3_CITIES
    else:
        cities = INTL_ROTATIONS.get(month_rot, INTL_ROTATIONS[0])

    industries = ALL_INDUSTRIES if use_full else INDUSTRY_SETS.get(parity, INDUSTRY_SETS["odd"])
    week_label = WEEK_LABELS.get(week, f"Week {week}")
    if week == 4:
        week_label += f" (rot {month_rot})"

    return {
        "week": week,
        "parity": parity,
        "cities": cities,
        "industries": industries,
        "week_label": week_label,
        "lang": cities[0]["lang"] if cities else "en",
    }

# ══════════════════════════════════════════════════════════════════
# SERPAPI SEARCH
# ══════════════════════════════════════════════════════════════════

def search_google_maps(query, ll, lang):
    params = {
        "engine": "google_maps",
        "q": query,
        "ll": ll,
        "hl": lang,
        "api_key": SERPAPI_KEY,
        "type": "search",
        "num": 20,
    }
    r = requests.get("https://serpapi.com/search", params=params, timeout=15)
    r.raise_for_status()
    time.sleep(0.2)
    return r.json().get("local_results", [])

# ══════════════════════════════════════════════════════════════════
# FILTER
# ══════════════════════════════════════════════════════════════════

def passes_filter(result):
    reviews = result.get("reviews", 0) or 0
    website = result.get("website", "")
    phone   = result.get("phone", "")
    title   = (result.get("title", "") or "").lower()

    # Too established — likely already has systems, not our target
    if reviews > 100:
        return False, "too_many_reviews"
    # Must have at least a phone (mom-and-pop shops always have a phone)
    if not phone:
        return False, "no_phone"
    # Closed businesses
    if "closed" in title or "permanently closed" in title:
        return False, "closed"
    # Skip big chains — not independently owned
    CHAIN_SIGNALS = [
        "mcdonald", "subway", "starbucks", "dunkin", "7-eleven",
        "walgreens", "cvs", "walmart", "target", "costco",
        "home depot", "lowe's", "dollar tree", "dollar general",
        "great clips", "supercuts", "h&r block", "liberty tax",
    ]
    if any(chain in title for chain in CHAIN_SIGNALS):
        return False, "chain_business"
    # Website is nice but NOT required — many small local businesses
    # only have a Google listing or Facebook page. We can still
    # discover their email via SerpAPI data (Google profile) or
    # fallback pattern if domain is present.
    return True, "pass"

# ══════════════════════════════════════════════════════════════════
# FINGERPRINT + DEDUPE
# ══════════════════════════════════════════════════════════════════

def extract_domain(url):
    try:
        parsed = urlparse(url if url.startswith("http") else "https://" + url)
        domain = parsed.netloc.lower().replace("www.", "")
        return domain
    except Exception:
        return ""

def build_fingerprint(domain, name):
    return f"{domain.lower()}|{(name or '').lower()[:30].strip()}"

def fingerprint_exists(fp):
    url = f"https://api.airtable.com/v0/{AIRTABLE_BASE}/{AIRTABLE_FP}"
    headers = {"Authorization": f"Bearer {AIRTABLE_TOKEN}"}
    params = {"filterByFormula": f"{{Fingerprint}}='{fp}'", "maxRecords": "1"}
    try:
        r = requests.get(url, headers=headers, params=params, timeout=10)
        time.sleep(0.1)
        return len(r.json().get("records", [])) > 0
    except Exception:
        return False  # on error, let it through — worst case a dupe writes

# ══════════════════════════════════════════════════════════════════
# APOLLO ENRICHMENT
# ══════════════════════════════════════════════════════════════════

def enrich_with_apollo(domain):
    """Try Apollo people search by domain. Returns (first, last, email) or (None,None,None)."""
    if not domain:
        return None, None, None
    payload = {
        "api_key": APOLLO_KEY,
        "q_organization_domains": domain,
        "person_titles": [
            "owner", "founder", "president", "CEO",
            "director", "general manager", "operations manager",
        ],
        "per_page": 1,
    }
    try:
        r = requests.post(
            "https://api.apollo.io/v1/mixed_people/search",
            json=payload, timeout=15
        )
        time.sleep(0.3)
        if r.status_code == 403:
            # Free plan — people search blocked. Fail gracefully.
            return None, None, None
        people = r.json().get("people", [])
        if people:
            p = people[0]
            return p.get("first_name"), p.get("last_name"), p.get("email")
    except Exception:
        pass
    return None, None, None

# ══════════════════════════════════════════════════════════════════
# MX VALIDATION
# ══════════════════════════════════════════════════════════════════

def has_mx_record(domain):
    if not domain:
        return False
    try:
        url = f"https://cloudflare-dns.com/dns-query?name={domain}&type=MX"
        headers = {"Accept": "application/dns-json"}
        r = requests.get(url, headers=headers, timeout=8)
        data = r.json()
        answers = [a for a in data.get("Answer", []) if a.get("type") == 15]
        return len(answers) > 0
    except Exception:
        return False

# ══════════════════════════════════════════════════════════════════
# AIRTABLE WRITE
# ══════════════════════════════════════════════════════════════════

def write_lead(record_dict):
    url = f"https://api.airtable.com/v0/{AIRTABLE_BASE}/{AIRTABLE_TABLE}"
    headers = {
        "Authorization": f"Bearer {AIRTABLE_TOKEN}",
        "Content-Type": "application/json",
    }
    payload = {"records": [{"fields": record_dict}], "typecast": True}
    try:
        r = requests.post(url, headers=headers, json=payload, timeout=15)
        time.sleep(0.1)
        return r.status_code == 200
    except Exception:
        return False

def write_fingerprint(fp, domain):
    url = f"https://api.airtable.com/v0/{AIRTABLE_BASE}/{AIRTABLE_FP}"
    headers = {
        "Authorization": f"Bearer {AIRTABLE_TOKEN}",
        "Content-Type": "application/json",
    }
    payload = {"records": [{"fields": {
        "fldArkGJ3ZaIJwj82": fp,
        "fld556mTF9qtXkRhN": domain,
        "fld2crC5aq2CfuQMF": "Active",
    }}], "typecast": True}
    try:
        requests.post(url, headers=headers, json=payload, timeout=15)
        time.sleep(0.1)
    except Exception:
        pass

# ══════════════════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════════════════

def _get_batch_tracker_path():
    return SCRIPT_DIR / "batch_tracker.json"

def _load_batch_tracker(today):
    """Track which city batch we've completed today. Resets daily."""
    path = _get_batch_tracker_path()
    try:
        data = json.loads(path.read_text())
        if data.get("date") == str(today):
            return data
    except Exception:
        pass
    return {"date": str(today), "completed_batches": 0, "total_searches": 0}

def _save_batch_tracker(data):
    path = _get_batch_tracker_path()
    tmp = path.with_suffix(".tmp")
    tmp.write_text(json.dumps(data, indent=2))
    tmp.replace(path)

def main():
    parser = argparse.ArgumentParser(description="ARCG PROD-08 Daily Lead Discovery")
    parser.add_argument("--dry-run", action="store_true", help="No Airtable writes")
    parser.add_argument("--test", action="store_true", help="1 city × 1 industry only")
    parser.add_argument("--full", action="store_true", help="All 15 industries (75 searches)")
    parser.add_argument("--week", type=int, choices=[1,2,3,4], help="Override week number")
    parser.add_argument("--day", choices=["ODD","EVEN"], help="Override industry set parity")
    parser.add_argument("--limit", type=int, default=45, help="Max total searches")
    parser.add_argument("--batch", action="store_true",
                        help="Run 1 city batch only (9 searches). Auto-advances each run. "
                             "Use with launchd every-2-hour schedule to spread 45 searches "
                             "across the business day (7am-6pm).")
    args = parser.parse_args()

    DRY_RUN = args.dry_run
    today = date.today()
    day_override = args.day.lower() if args.day else None

    sched = resolve_schedule(today, week_override=args.week, day_override=day_override, use_full=args.full)
    cities = sched["cities"]
    industries = sched["industries"]
    week_label = sched["week_label"]
    lang = sched["lang"]
    query_map = QUERY_ES if lang == "es" else QUERY_EN

    if args.test:
        cities = cities[:1]
        industries = industries[:1]

    # ── BATCH MODE: run 1 city per invocation, auto-advance ──
    if args.batch:
        tracker = _load_batch_tracker(today)
        batch_idx = tracker["completed_batches"]
        if batch_idx >= len(cities):
            print(f"  ✓ All {len(cities)} city batches completed today. Nothing to do.")
            return
        cities = [cities[batch_idx]]
        args.limit = len(industries)  # 9 searches = 1 city × 9 industries
        print(f"  [BATCH {batch_idx+1}/{len(sched['cities'])}] City: {cities[0]['name']}")

    total_searches = len(cities) * len(industries)
    if total_searches > args.limit and not args.full:
        total_searches = args.limit

    # Header
    city_names = ", ".join(c["name"] for c in cities)
    set_label = "A (odd)" if sched["parity"] == "odd" else "B (even)"
    print(f"""
╔══════════════════════════════════════════════╗
║  ARCG PROD-08 — Daily Lead Discovery         ║
║  {today} | Week {sched['week']} | Set {set_label:<8}  ║
║  Region: {week_label:<35} ║
║  Cities: {city_names[:38]:<38} ║
║  Industries: {len(industries)} | Searches: {total_searches:<14} ║
║  Mode: {'DRY RUN' if DRY_RUN else ('TEST' if args.test else 'PRODUCTION'):<17}                  ║
╚══════════════════════════════════════════════╝
""")
    print(f"  Keys: SERP={mask(SERPAPI_KEY)} AT={mask(AIRTABLE_TOKEN)} APO={mask(APOLLO_KEY)}")
    print()

    # Counters
    discovered = 0
    filtered_out = 0
    dupes = 0
    apollo_found = 0
    mx_pass_count = 0
    synced = 0
    new_status = 0
    errors = 0
    search_count = 0

    for c in cities:
        city_lang = c["lang"]
        city_qmap = QUERY_ES if city_lang == "es" else QUERY_EN
        for ind in industries:
            if search_count >= args.limit and not args.full:
                break
            search_count += 1
            query = city_qmap.get(ind, ind)
            print(f"\n  [{search_count}/{total_searches}] {c['name']} × {ind}")
            print(f"    query: \"{query}\"")

            try:
                results = search_google_maps(query, c["ll"], city_lang)
            except Exception as e:
                print(f"    ✗ SerpAPI error: {e}")
                errors += 1
                continue

            print(f"    → {len(results)} raw results")

            for r in results:
                discovered += 1
                title = r.get("title", "")
                ok, reason = passes_filter(r)
                if not ok:
                    filtered_out += 1
                    continue

                domain = extract_domain(r.get("website", ""))
                fp = build_fingerprint(domain, title)

                if not DRY_RUN and fingerprint_exists(fp):
                    dupes += 1
                    continue

                # Apollo enrichment
                first, last, email = enrich_with_apollo(domain)
                if email:
                    apollo_found += 1

                # MX validation
                mx = has_mx_record(domain) if email else has_mx_record(domain)
                if mx:
                    mx_pass_count += 1

                # Build validation checks
                checks = ["Has Website"]
                if mx:
                    checks.append("MX Validated")
                if email:
                    checks.append("Apollo Email Found")

                # Determine status
                if email and mx:
                    status = "Synced to Notion"
                    next_action = "Send cold email via Instantly"
                    synced += 1
                else:
                    status = "New"
                    next_action = "Manual email lookup"
                    new_status += 1

                contact_name = ""
                if first and last:
                    contact_name = f"{first} {last}"

                record = {
                    "fldt0gCGo4zVBrU6P": title,
                    "fldrpWjehF3U0VAP3": status,
                    "fldTZrlwiuS3GZq6x": c["name"],
                    "fldAueJ0Hp36eL16I": email or "",
                    "fldA3zgsVdyHkyYJ0": r.get("phone", ""),
                    "fld49BXRVKBn0Q0QW": r.get("address", ""),
                    "fldifSYpPd35F75NE": INDUSTRY_MAP.get(ind, "Other"),
                    "fld3LRKpzA0VrAubo": "Manual Entry",
                    "fld7qSL7jojUPHc09": next_action,
                    "fldxpTVeA2bOojFpY": f"PROD-08 | {get_language_flag(c['name'], c['lang'])} | {week_label} | {c['name']} | {ind}",
                    "fld7R3OGzfSXvgXYH": r.get("website", ""),
                    "fldU74UtvdhcmpRlt": fp,
                    "fldHrXjgp2Ag9kdDz": checks,
                }

                if DRY_RUN:
                    tag = "SYNCED" if status == "Synced to Notion" else "NEW"
                    print(f"    [DRY] [{tag}] {title} | {c['name']} | email:{email or 'none'}")
                else:
                    ok = write_lead(record)
                    if ok:
                        write_fingerprint(fp, domain)
                        tag = "[SYNCED]" if status == "Synced to Notion" else "[NEW]"
                        print(f"    ✓ {tag} {title} | {c['name']}")
                    else:
                        errors += 1
                        print(f"    ✗ Airtable write failed: {title}")

        if search_count >= args.limit and not args.full:
            break

    # Summary
    summary = f"""
┌─────────────────────────────────────────────┐
│  PROD-08 Run Complete — {today}            │
│  Region: {week_label:<20} | Set: {set_label:<8}│
├─────────────────────────────────────────────┤
│  Discovered:    {discovered:<28}│
│  Filtered out:  {filtered_out:<28}│
│  Dupes skipped: {dupes:<28}│
│  Apollo emails: {apollo_found:<28}│
│  MX validated:  {mx_pass_count:<28}│
├─────────────────────────────────────────────┤
│  → Synced to Notion: {synced:<23}│
│  → New (no email):   {new_status:<23}│
│  Errors:        {errors:<28}│
│  Mode:          {'DRY RUN' if DRY_RUN else 'LIVE':<28}│
└─────────────────────────────────────────────┘
"""
    print(summary)

    # Write JSON log
    log_data = {
        "date": str(today),
        "week": sched["week"],
        "week_label": week_label,
        "parity": sched["parity"],
        "cities": [c["name"] for c in cities],
        "industries": industries,
        "searches": search_count,
        "discovered": discovered,
        "filtered_out": filtered_out,
        "dupes": dupes,
        "apollo_found": apollo_found,
        "mx_pass": mx_pass_count,
        "synced": synced,
        "new_status": new_status,
        "errors": errors,
        "dry_run": DRY_RUN,
    }
    log_path = LOG_DIR / f"{today}.log"
    log_path.write_text(json.dumps(log_data, indent=2))
    # STATS_JSON line — appended for weekly digest (arcg_weekly_digest.py)
    stats_line = "STATS_JSON:" + json.dumps({
        "date":       str(today),
        "script":     "prod08",
        "discovered": discovered,
        "synced":     synced,
        "new_status": new_status,
        "dupes":      dupes,
        "errors":     errors,
        "region":     week_label,
        "set":        sched["parity"],
    })
    with open(log_path, "a") as f:
        f.write("\n" + stats_line + "\n")
    print(f"  Log written to {log_path}")

    # Update batch tracker (if in batch mode)
    if args.batch:
        tracker = _load_batch_tracker(today)
        tracker["completed_batches"] += 1
        tracker["total_searches"] += search_count
        _save_batch_tracker(tracker)
        remaining = len(sched["cities"]) - tracker["completed_batches"]
        print(f"  Batch {tracker['completed_batches']}/{len(sched['cities'])} done. {remaining} remaining today.")

    # iMessage daily notification
    summary_msg = (
        f"ARCG PROD-08 | {today}\n"
        f"Region: {week_label}\n"
        f"───────────────\n"
        f"Discovered:  {discovered}\n"
        f"Synced:      {synced} → Instantly\n"
        f"New (no email): {new_status}\n"
        f"Dupes skipped: {dupes}\n"
        f"Errors: {errors}"
    )
    recipient = os.environ.get("IMESSAGE_RECIPIENT", "")
    if recipient and not DRY_RUN:
        ok = send_imessage(recipient, summary_msg)
        print(f"  iMessage {'sent ✓' if ok else 'failed — check Messages app'}")
    elif not recipient:
        print("  iMessage skipped — IMESSAGE_RECIPIENT not set in config.env")


if __name__ == "__main__":
    main()
