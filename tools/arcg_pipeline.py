#!/usr/bin/env python3
"""
ARCG Systems — One-Command Intake-to-Proposal Pipeline
File: arcg_pipeline.py

Usage:
  python3 arcg_pipeline.py --intake intake.json
  python3 arcg_pipeline.py --intake intake.json --template ~/Desktop/ARCG_Proposal_Template.html
  python3 arcg_pipeline.py --intake intake.json --save-json report.json --no-open

What it does:
  1. Reads client intake data from a JSON file (see ARCG_INTAKE_SCHEMA.md)
  2. Builds the v4.1 intake prompt automatically
  3. Calls the OpenAI API (gpt-4o) to generate the Operational Intelligence Report
  4. Extracts the structured JSON output from the AI response
  5. Runs arcg_fill_proposal_json.py to fill the HTML template
  6. Opens the completed proposal in Chrome

Requirements:
  pip install openai
  OPENAI_API_KEY must be set in environment (or .env file)

Intake JSON format (see ARCG_INTAKE_SCHEMA.md for full spec):
  {
    "businessName": "Acme Corp",
    "industry": "Facilities Management",
    "contactName": "John Smith",
    "workEmail": "john@acme.com",
    "biggestProblem": "...",
    "problemArea": "...",
    "currentTools": "...",
    "crm": "None",
    "firstAutomationTarget": "...",
    "volume": "...",
    "desiredResult": "..."
  }
"""

import os
import sys
import json
import argparse
import subprocess
from pathlib import Path
from datetime import date

# ── ARGUMENT PARSING ──────────────────────────────────────────
parser = argparse.ArgumentParser(description="ARCG One-Command Intake-to-Proposal Pipeline")
parser.add_argument("--intake",    required=True, help="Path to the client intake JSON file")
parser.add_argument("--template",  default=os.path.expanduser("~/Desktop/ARCG_Proposal_Template.html"),
                    help="Path to the HTML proposal template")
parser.add_argument("--save-json", default=None,
                    help="Optional path to save the AI-generated report JSON (default: auto-named in /tmp)")
parser.add_argument("--no-open",   action="store_true",
                    help="Skip auto-opening the proposal in Chrome")
parser.add_argument("--govcon",    action="store_true",
                    help="Use GovCon v4.1 prompt (DoD tool preferences, FAR compliance language)")
args = parser.parse_args()

# ── LOAD INTAKE ───────────────────────────────────────────────
with open(args.intake, "r") as f:
    intake = json.load(f)

def req(field: str) -> str:
    val = intake.get(field, "").strip()
    if not val:
        print(f"  ERROR: Required intake field '{field}' is missing or empty.")
        sys.exit(1)
    return val

business_name          = req("businessName")
industry               = req("industry")
contact_name           = req("contactName")
work_email             = req("workEmail")
biggest_problem        = req("biggestProblem")
problem_area           = req("problemArea")
current_tools          = req("currentTools")
crm                    = intake.get("crm", "None")
first_automation_target = req("firstAutomationTarget")
volume                 = req("volume")
desired_result         = req("desiredResult")

# ── BUILD PROMPT ──────────────────────────────────────────────
govcon_addendum = ""
if args.govcon or industry.lower() in ["government contracting", "govcon", "defense", "federal", "dod"]:
    govcon_addendum = """
GOVCON SPECIFIC RULES:
- Prioritize DoD-familiar and cost-effective tools.
- Prefer Power BI ($20/mo) over Quick Base ($600/mo) or Salesforce unless already in use.
- Prefer Airtable or Smartsheet for database layers.
- In the Pricing Rationale section, mention FAR compliance, audit readiness, or DCAA audit defensibility if applicable.
"""

prompt = f"""You are a senior operational consultant and AI systems architect for ARCG Systems — a certified SDVOSB, HUBZone, MBE, DBE, and SBE firm specializing in AI automation, operational intelligence, and facilities support.

A business has submitted an intake form requesting a Free Operational Audit.

CRITICAL RULES:
- NEVER show hours in the final output
- Final output must present fixed-price packages
- Anchor pricing to impact (time saved, errors reduced, scalability) — not labor
- Use the EXACT contact name provided. Never change it.
- Every recommendation must trace to something the client actually said.
- No generic advice. No fake certainty.
{govcon_addendum}

CLIENT INTAKE DATA:
| Field | Value |
|-------|-------|
| Business Name | {business_name} |
| Industry | {industry} |
| Contact Name | {contact_name} |
| Work Email | {work_email} |
| Biggest Problem | {biggest_problem} |
| Problem Area | {problem_area} |
| Current Tools | {current_tools} |
| CRM | {crm} |
| First Automation Target | {first_automation_target} |
| Volume | {volume} |
| Desired Result | {desired_result} |

INTERNAL ANALYSIS (do not output this section):
- Determine system components needed
- Complexity: Low (5-10h) / Medium (10-20h) / High (20-40h+)
- Map to pricing tiers: Option A $2,500-$4,500 | Option B $4,500-$7,500 | Option C $7,500-$12,500+
- Monthly support: $500-$1,500/month

OUTPUT INSTRUCTIONS:
Output the full Operational Intelligence Report as a single valid JSON object with this exact structure.
Do not include any text before or after the JSON. Output ONLY the JSON.

{{
  "client": {{
    "businessName": "{business_name}",
    "contactName": "{contact_name}",
    "industry": "{industry}",
    "date": "{date.today().strftime('%B %-d, %Y')}",
    "volume": "{volume}",
    "problemArea": "{problem_area}"
  }},
  "executiveSummary": {{
    "p1": "...",
    "p2": "..."
  }},
  "diagnosis": {{
    "p1": "...",
    "p2": "..."
  }},
  "quickWins": {{
    "win1": {{"title": "...", "body": "..."}},
    "win2": {{"title": "...", "body": "..."}},
    "win3": {{"title": "...", "body": "..."}}
  }},
  "roadmap": {{
    "phase1": {{"title": "Foundation (Days 1-30)", "body": "...", "tools": "...", "output": "..."}},
    "phase2": {{"title": "Integration (Days 31-60)", "body": "...", "tools": "...", "output": "..."}},
    "phase3": {{"title": "Scale & Visibility (Days 61-90)", "body": "...", "tools": "...", "output": "..."}}
  }},
  "whyItWorks": {{
    "p1": "...", "p2": "...", "p3": "...",
    "beforeAfter": {{
      "row1": {{"area": "...", "before": "...", "after": "..."}},
      "row2": {{"area": "...", "before": "...", "after": "..."}},
      "row3": {{"area": "...", "before": "...", "after": "..."}}
    }}
  }},
  "techStack": {{
    "tool1": {{"name": "...", "purpose": "...", "why": "...", "cost": "..."}},
    "tool2": {{"name": "...", "purpose": "...", "why": "...", "cost": "..."}},
    "tool3": {{"name": "...", "purpose": "...", "why": "...", "cost": "..."}},
    "tool4": {{"name": "...", "purpose": "...", "why": "...", "cost": "..."}},
    "tool5": {{"name": "...", "purpose": "...", "why": "...", "cost": "..."}}
  }},
  "pricing": {{
    "optionA": {{"price": "$X,XXX", "scope": "...", "support": "..."}},
    "optionB": {{"price": "$X,XXX", "scope": "...", "support": "..."}},
    "optionC": {{"price": "$X,XXX+", "scope": "...", "support": "..."}}
  }},
  "assumptions": {{
    "a1": {{"title": "...", "body": "..."}},
    "a2": {{"title": "...", "body": "..."}},
    "a3": {{"title": "...", "body": "..."}},
    "a4": {{"title": "...", "body": "..."}},
    "a5": {{"title": "...", "body": "..."}}
  }},
  "email": {{
    "firstName": "...",
    "subject": "...",
    "p1": "...",
    "p2": "...",
    "p3": "..."
  }}
}}
"""

# ── CALL OPENAI API ───────────────────────────────────────────
print(f"\n{'='*60}")
print(f"  ARCG SYSTEMS — INTAKE-TO-PROPOSAL PIPELINE")
print(f"{'='*60}")
print(f"  Client:   {business_name}")
print(f"  Contact:  {contact_name}")
print(f"  Mode:     {'GovCon v4.1' if args.govcon else 'Standard v4.1'}")
print(f"\n  Calling AI... (this takes ~15-30 seconds)")

try:
    from openai import OpenAI
except ImportError:
    print("\n  ERROR: openai package not installed. Run: pip install openai")
    sys.exit(1)

client = OpenAI()  # reads OPENAI_API_KEY from environment

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "system",
            "content": "You are a senior operational consultant for ARCG Systems. You output only valid JSON. No markdown, no code fences, no commentary — pure JSON only."
        },
        {
            "role": "user",
            "content": prompt
        }
    ],
    temperature=0.4,
    max_tokens=4000,
)

raw_output = response.choices[0].message.content.strip()

# Strip markdown code fences if the model added them despite instructions
if raw_output.startswith("```"):
    lines = raw_output.split("\n")
    raw_output = "\n".join(lines[1:-1]) if lines[-1].strip() == "```" else "\n".join(lines[1:])

# ── PARSE JSON ────────────────────────────────────────────────
try:
    report_data = json.loads(raw_output)
except json.JSONDecodeError as e:
    print(f"\n  ERROR: AI output was not valid JSON: {e}")
    print(f"\n  Raw output saved to /tmp/arcg_raw_output.txt for inspection.")
    with open("/tmp/arcg_raw_output.txt", "w") as f:
        f.write(raw_output)
    sys.exit(1)

print(f"  AI report generated successfully.")

# ── SAVE JSON ─────────────────────────────────────────────────
safe_name = business_name.replace(" ", "_").replace("/", "-").replace(",", "")
json_path = args.save_json or f"/tmp/{safe_name}_report.json"

with open(json_path, "w") as f:
    json.dump(report_data, f, indent=2)

print(f"  Report JSON saved: {json_path}")

# ── RUN PROPOSAL FILL SCRIPT ──────────────────────────────────
script_dir = Path(__file__).parent
fill_script = script_dir / "arcg_fill_proposal_json.py"

if not fill_script.exists():
    print(f"\n  ERROR: arcg_fill_proposal_json.py not found at {fill_script}")
    print(f"  JSON report saved at {json_path}. Run the fill script manually.")
    sys.exit(1)

cmd = [
    sys.executable,
    str(fill_script),
    "--json", json_path,
    "--template", args.template,
]

print(f"\n  Running proposal fill script...")
result = subprocess.run(cmd, capture_output=False)

if result.returncode != 0:
    print(f"\n  WARNING: Fill script exited with code {result.returncode}")
    print(f"  JSON report is at: {json_path}")
