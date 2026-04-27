# ARCG Systems — Client Intake JSON Schema
# File: ARCG_INTAKE_SCHEMA.md
# Use: Fill this template with data from the intake form email, then run:
#   python3 arcg_pipeline.py --intake client_intake.json

## INTAKE JSON TEMPLATE

Save as `client_intake.json` and fill in all fields:

```json
{
  "businessName": "Company Name Here",
  "industry": "e.g. Facilities Management / GovCon / Staffing / Healthcare",
  "contactName": "First Last — USE EXACT NAME FROM EMAIL",
  "workEmail": "contact@company.com",
  "biggestProblem": "Paste their exact problem statement from the intake form",
  "problemArea": "e.g. Lead Follow-Up / Compliance Reporting / Vendor Coordination",
  "currentTools": "e.g. Excel, Outlook, QuickBooks, HubSpot",
  "crm": "e.g. HubSpot / Salesforce / None",
  "firstAutomationTarget": "e.g. Intake routing / Compliance reports / Work order dispatch",
  "volume": "e.g. 50 work orders/week / 12 locations / 200 employees",
  "desiredResult": "What they said they want to achieve"
}
```

## GOVCON FLAG

If the client is in Government Contracting, add `--govcon` to the pipeline command:

```bash
python3 arcg_pipeline.py --intake client_intake.json --govcon
```

This activates:
- DoD-appropriate tool recommendations (Power BI, Airtable, Smartsheet)
- FAR compliance language in the pricing rationale
- DCAA audit defensibility framing

## FULL PIPELINE COMMAND

```bash
python3 arcg_pipeline.py \
  --intake client_intake.json \
  --template ~/Desktop/ARCG_Proposal_Template.html \
  --save-json ~/Desktop/reports/client_report.json
```

## REQUIRED ENVIRONMENT

```bash
export OPENAI_API_KEY="sk-..."
```

Or add to `~/.zshrc` / `~/.bashrc` to persist.

## OUTPUT

The pipeline produces:
1. A JSON report file (saved to `--save-json` path or `/tmp/`)
2. A filled HTML proposal (saved to `~/Desktop/ClientName_Proposal.html`)
3. Auto-opens the proposal in Chrome for review and PDF export
