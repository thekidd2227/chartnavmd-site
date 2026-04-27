# ARCG Systems — Proposal JSON Schema
## Version 2.0 | For use with arcg_fill_proposal_json.py

After running the v4 intake prompt, ask Manus or Claude:

> "Output the full report as a JSON object matching the ARCG proposal schema."

The AI must return a JSON object with the following exact structure.
Copy the JSON output, save it as `ClientName_report.json`, then run:

```bash
python3 arcg_fill_proposal_json.py --json ClientName_report.json
```

---

## JSON Schema

```json
{
  "client": {
    "businessName": "Sentinel Defense Solutions LLC",
    "contactName": "Marcus Thorne",
    "industry": "Government Contracting (Defense Logistics)",
    "date": "March 21, 2026",
    "volume": "4 bases, ~50 sub-vendors, 4 weekly reports",
    "problemArea": "Compliance Reporting & Data Aggregation"
  },
  "executiveSummary": {
    "p1": "Paragraph 1 of executive summary...",
    "p2": "Paragraph 2 of executive summary..."
  },
  "diagnosis": {
    "p1": "Root cause paragraph 1...",
    "p2": "Root cause paragraph 2..."
  },
  "quickWins": {
    "win1": { "title": "Win 1 Title", "body": "Win 1 description..." },
    "win2": { "title": "Win 2 Title", "body": "Win 2 description..." },
    "win3": { "title": "Win 3 Title", "body": "Win 3 description..." }
  },
  "roadmap": {
    "phase1": {
      "title": "Foundation — Data Integration",
      "tools": "Make.com, Airtable",
      "body": "What gets built in phase 1...",
      "output": "Deliverable at end of phase 1..."
    },
    "phase2": {
      "title": "Automation — Report Generation",
      "tools": "Power BI, Zapier",
      "body": "What gets built in phase 2...",
      "output": "Deliverable at end of phase 2..."
    },
    "phase3": {
      "title": "Scale & Visibility",
      "tools": "Custom Dashboard, Alert System",
      "body": "What gets built in phase 3...",
      "output": "Deliverable at end of phase 3..."
    }
  },
  "whyItWorks": {
    "p1": "Why this system works — paragraph 1...",
    "p2": "Why this system works — paragraph 2...",
    "p3": "Why this system works — paragraph 3...",
    "beforeAfter": {
      "row1": { "area": "Compliance Reporting", "before": "15–20 hrs/week manual", "after": "Automated, zero manual input" },
      "row2": { "area": "Data Accuracy",        "before": "Human error, cure notice risk", "after": "Single source of truth" },
      "row3": { "area": "PM Capacity",           "before": "Consumed by data entry", "after": "Focused on contract management" }
    }
  },
  "techStack": {
    "tool1": { "name": "Make.com",       "purpose": "Workflow automation",      "why": "Connects ERP, email, and Excel without code", "cost": "$29/mo" },
    "tool2": { "name": "Airtable",       "purpose": "Central data repository",  "why": "Structured database with real-time sync",     "cost": "$20/user/mo" },
    "tool3": { "name": "Power BI",       "purpose": "Compliance dashboard",     "why": "Integrates Excel natively, DoD-familiar UI",  "cost": "$20/user/mo" },
    "tool4": { "name": "Google Workspace","purpose": "Document collaboration",  "why": "Lightweight, accessible from any base",       "cost": "$12/user/mo" },
    "tool5": { "name": "Zapier",         "purpose": "Alert & notification layer","why": "Triggers alerts when SLA thresholds are missed","cost": "$25/mo" }
  },
  "pricing": {
    "optionA": { "price": "$3,500", "scope": "Phase 1 only — data integration and central repository", "support": "$500/month" },
    "optionB": { "price": "$6,000", "scope": "Phases 1–2 — full automation and report generation",     "support": "$750/month" },
    "optionC": { "price": "$9,500", "scope": "All 3 phases — full system, dashboard, and alerts",      "support": "$1,200/month" }
  },
  "assumptions": {
    "a1": { "title": "ERP API Access",       "body": "Client provides read access to the legacy ERP system." },
    "a2": { "title": "Data Format",          "body": "Existing Excel reports follow a consistent column structure." },
    "a3": { "title": "Stakeholder Access",   "body": "Client PM is available for 2 working sessions during Phase 1." },
    "a4": { "title": "Compliance Templates", "body": "Client provides approved report templates for each base." },
    "a5": { "title": "Timeline",             "body": "90-day roadmap assumes no major scope changes after kickoff." }
  },
  "email": {
    "firstName": "Marcus",
    "subject": "Your Compliance Reporting Is Costing You More Than Time",
    "p1": "Email paragraph 1...",
    "p2": "Email paragraph 2...",
    "p3": "Email paragraph 3..."
  }
}
```

---

## Notes

- All fields are strings. Do not use arrays or nested objects beyond the schema above.
- The `date` field defaults to today's date if omitted.
- The script will flag any unfilled `{{PLACEHOLDER}}` values after running.
- To add a 6th tool, update both the JSON schema and the `swaps` dict in the script.
