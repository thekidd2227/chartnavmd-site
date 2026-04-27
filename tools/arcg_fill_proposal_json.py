#!/usr/bin/env python3
"""
ARCG Systems — JSON-Driven Proposal Generator v2
File: arcg_fill_proposal_json.py

Usage:
  python3 arcg_fill_proposal_json.py --json path/to/report.json
  python3 arcg_fill_proposal_json.py --json report.json --template ~/Desktop/ARCG_Proposal_Template.html

How to generate the JSON:
  1. Run the v4 intake prompt in Manus or Claude.
  2. After the report is generated, ask:
     "Output the full report as a JSON object matching the ARCG proposal schema."
  3. Save the JSON output to a file (e.g., sentinel_report.json).
  4. Run this script pointing at that file.

The script will fill the HTML template and open the proposal in Chrome.
"""

import os
import sys
import json
import argparse
from datetime import date

# ── DEFAULT PATHS ─────────────────────────────────────────────
DEFAULT_TEMPLATE = os.path.expanduser("~/Desktop/ARCG_Proposal_Template.html")
OUTPUT_DIR       = os.path.expanduser("~/Desktop")

# ── ARGUMENT PARSING ──────────────────────────────────────────
parser = argparse.ArgumentParser(description="ARCG Proposal Generator — JSON Mode")
parser.add_argument("--json",     required=True, help="Path to the JSON report file")
parser.add_argument("--template", default=DEFAULT_TEMPLATE, help="Path to the HTML proposal template")
args = parser.parse_args()

# ── LOAD JSON ─────────────────────────────────────────────────
with open(args.json, "r") as f:
    d = json.load(f)

def g(path: str, fallback: str = "") -> str:
    """Safely navigate a dot-path into the JSON dict."""
    keys = path.split(".")
    val = d
    for k in keys:
        if isinstance(val, dict):
            val = val.get(k, fallback)
        else:
            return fallback
    return str(val) if val is not None else fallback

today = date.today().strftime("%B %-d, %Y")

# ── BUILD SWAP MAP ────────────────────────────────────────────
swaps = {
    # Header
    "{{CLIENT_NAME}}":      g("client.businessName"),
    "{{CONTACT_NAME}}":     g("client.contactName"),
    "{{INDUSTRY}}":         g("client.industry"),
    "{{DATE}}":             g("client.date", today),
    "{{VOLUME}}":           g("client.volume"),
    "{{PROBLEM_AREA}}":     g("client.problemArea"),

    # Executive Summary
    "{{EXEC_SUMMARY_P1}}":  g("executiveSummary.p1"),
    "{{EXEC_SUMMARY_P2}}":  g("executiveSummary.p2"),

    # Root Cause / Diagnosis
    "{{ROOT_CAUSE_P1}}":    g("diagnosis.p1"),
    "{{ROOT_CAUSE_P2}}":    g("diagnosis.p2"),

    # Quick Wins
    "{{WIN_1_TITLE}}": g("quickWins.win1.title"), "{{WIN_1_BODY}}": g("quickWins.win1.body"),
    "{{WIN_2_TITLE}}": g("quickWins.win2.title"), "{{WIN_2_BODY}}": g("quickWins.win2.body"),
    "{{WIN_3_TITLE}}": g("quickWins.win3.title"), "{{WIN_3_BODY}}": g("quickWins.win3.body"),

    # 90-Day Roadmap
    "{{PHASE_1_TITLE}}":  g("roadmap.phase1.title"),  "{{PHASE_1_TOOLS}}":  g("roadmap.phase1.tools"),
    "{{PHASE_1_BODY}}":   g("roadmap.phase1.body"),   "{{PHASE_1_OUTPUT}}": g("roadmap.phase1.output"),
    "{{PHASE_2_TITLE}}":  g("roadmap.phase2.title"),  "{{PHASE_2_TOOLS}}":  g("roadmap.phase2.tools"),
    "{{PHASE_2_BODY}}":   g("roadmap.phase2.body"),   "{{PHASE_2_OUTPUT}}": g("roadmap.phase2.output"),
    "{{PHASE_3_TITLE}}":  g("roadmap.phase3.title"),  "{{PHASE_3_TOOLS}}":  g("roadmap.phase3.tools"),
    "{{PHASE_3_BODY}}":   g("roadmap.phase3.body"),   "{{PHASE_3_OUTPUT}}": g("roadmap.phase3.output"),

    # Why This Works
    "{{WHY_P1}}": g("whyItWorks.p1"),
    "{{WHY_P2}}": g("whyItWorks.p2"),
    "{{WHY_P3}}": g("whyItWorks.p3"),
    "{{BA_ROW1_AREA}}": g("whyItWorks.beforeAfter.row1.area"),
    "{{BA_ROW1_BEFORE}}": g("whyItWorks.beforeAfter.row1.before"),
    "{{BA_ROW1_AFTER}}":  g("whyItWorks.beforeAfter.row1.after"),
    "{{BA_ROW2_AREA}}": g("whyItWorks.beforeAfter.row2.area"),
    "{{BA_ROW2_BEFORE}}": g("whyItWorks.beforeAfter.row2.before"),
    "{{BA_ROW2_AFTER}}":  g("whyItWorks.beforeAfter.row2.after"),
    "{{BA_ROW3_AREA}}": g("whyItWorks.beforeAfter.row3.area"),
    "{{BA_ROW3_BEFORE}}": g("whyItWorks.beforeAfter.row3.before"),
    "{{BA_ROW3_AFTER}}":  g("whyItWorks.beforeAfter.row3.after"),

    # Tech Stack (5 tools)
    "{{TOOL_1}}": g("techStack.tool1.name"), "{{TOOL_1_PURPOSE}}": g("techStack.tool1.purpose"),
    "{{TOOL_1_WHY}}": g("techStack.tool1.why"), "{{TOOL_1_COST}}": g("techStack.tool1.cost"),
    "{{TOOL_2}}": g("techStack.tool2.name"), "{{TOOL_2_PURPOSE}}": g("techStack.tool2.purpose"),
    "{{TOOL_2_WHY}}": g("techStack.tool2.why"), "{{TOOL_2_COST}}": g("techStack.tool2.cost"),
    "{{TOOL_3}}": g("techStack.tool3.name"), "{{TOOL_3_PURPOSE}}": g("techStack.tool3.purpose"),
    "{{TOOL_3_WHY}}": g("techStack.tool3.why"), "{{TOOL_3_COST}}": g("techStack.tool3.cost"),
    "{{TOOL_4}}": g("techStack.tool4.name"), "{{TOOL_4_PURPOSE}}": g("techStack.tool4.purpose"),
    "{{TOOL_4_WHY}}": g("techStack.tool4.why"), "{{TOOL_4_COST}}": g("techStack.tool4.cost"),
    "{{TOOL_5}}": g("techStack.tool5.name"), "{{TOOL_5_PURPOSE}}": g("techStack.tool5.purpose"),
    "{{TOOL_5_WHY}}": g("techStack.tool5.why"), "{{TOOL_5_COST}}": g("techStack.tool5.cost"),

    # Pricing
    "{{PRICE_A}}": g("pricing.optionA.price"), "{{SCOPE_A}}": g("pricing.optionA.scope"),
    "{{SUPPORT_A}}": g("pricing.optionA.support"),
    "{{PRICE_B}}": g("pricing.optionB.price"), "{{SCOPE_B}}": g("pricing.optionB.scope"),
    "{{SUPPORT_B}}": g("pricing.optionB.support"),
    "{{PRICE_C}}": g("pricing.optionC.price"), "{{SCOPE_C}}": g("pricing.optionC.scope"),
    "{{SUPPORT_C}}": g("pricing.optionC.support"),

    # Assumptions
    "{{ASSUMPTION_1_TITLE}}": g("assumptions.a1.title"), "{{ASSUMPTION_1_BODY}}": g("assumptions.a1.body"),
    "{{ASSUMPTION_2_TITLE}}": g("assumptions.a2.title"), "{{ASSUMPTION_2_BODY}}": g("assumptions.a2.body"),
    "{{ASSUMPTION_3_TITLE}}": g("assumptions.a3.title"), "{{ASSUMPTION_3_BODY}}": g("assumptions.a3.body"),
    "{{ASSUMPTION_4_TITLE}}": g("assumptions.a4.title"), "{{ASSUMPTION_4_BODY}}": g("assumptions.a4.body"),
    "{{ASSUMPTION_5_TITLE}}": g("assumptions.a5.title"), "{{ASSUMPTION_5_BODY}}": g("assumptions.a5.body"),

    # Email
    "{{CONTACT_FIRST_NAME}}": g("email.firstName"),
    "{{EMAIL_SUBJECT}}":      g("email.subject"),
    "{{EMAIL_P1}}":           g("email.p1"),
    "{{EMAIL_P2}}":           g("email.p2"),
    "{{EMAIL_P3}}":           g("email.p3"),
}

# ── LOAD TEMPLATE ─────────────────────────────────────────────
if not os.path.exists(args.template):
    print(f"\n  ERROR: Template not found at {args.template}")
    print("  Copy ARCG_Proposal_Template.html to your Desktop and try again.")
    sys.exit(1)

with open(args.template, "r") as f:
    html = f.read()

# ── PERFORM SWAPS ─────────────────────────────────────────────
for key, val in swaps.items():
    html = html.replace(key, val)

# ── SAVE OUTPUT ───────────────────────────────────────────────
client_name = g("client.businessName", "Client")
safe_name   = client_name.replace(" ", "_").replace("/", "-").replace(",", "")
out_path    = os.path.join(OUTPUT_DIR, f"{safe_name}_Proposal.html")

with open(out_path, "w") as f:
    f.write(html)

# ── REPORT STATUS ─────────────────────────────────────────────
unfilled = [k for k in swaps if k in html]
print(f"\n{'='*60}")
print(f"  ARCG SYSTEMS — PROPOSAL GENERATOR v2 (JSON MODE)")
print(f"{'='*60}")
print(f"  Client:   {client_name}")
print(f"  Output:   {out_path}")
if unfilled:
    print(f"\n  WARNING: {len(unfilled)} placeholder(s) not filled:")
    for u in unfilled:
        print(f"    {u}")
else:
    print(f"  STATUS:   All placeholders filled successfully")
print(f"{'='*60}")
print(f"\n  Open in Chrome → File → Print → Save as PDF\n")

# ── AUTO-OPEN ─────────────────────────────────────────────────
os.system(f'open -a "Google Chrome" "{out_path}"')
