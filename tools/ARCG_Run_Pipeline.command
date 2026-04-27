#!/bin/bash
# ============================================================
# ARCG Systems — Intake-to-Proposal Pipeline Launcher
# Double-click this file on Mac to run the pipeline.
# Place this file in the same folder as:
#   - arcg_pipeline.py
#   - arcg_fill_proposal_json.py
#   - client_intake.json  (fill this out before running)
#   - crestline-proposal-final.html  (the proposal template)
# ============================================================

# Move to the directory where this script lives
cd "$(dirname "$0")"

# ── Check for Python 3 ──────────────────────────────────────
if ! command -v python3 &>/dev/null; then
  osascript -e 'display alert "Python 3 not found" message "Install Python 3 from python.org and try again." as critical'
  exit 1
fi

# ── Check for OPENAI_API_KEY ────────────────────────────────
if [ -z "$OPENAI_API_KEY" ]; then
  # Try loading from a local .env file if present
  if [ -f ".env" ]; then
    export $(grep -v '^#' .env | xargs)
  fi
fi

if [ -z "$OPENAI_API_KEY" ]; then
  osascript -e 'display alert "Missing API Key" message "Create a .env file in this folder with:\nOPENAI_API_KEY=sk-..." as critical'
  exit 1
fi

# ── Check for client_intake.json ────────────────────────────
if [ ! -f "client_intake.json" ]; then
  osascript -e 'display alert "No Intake File Found" message "Create a client_intake.json file in this folder before running. See ARCG_INTAKE_SCHEMA.md for the format." as critical'
  exit 1
fi

# ── Check for proposal template ─────────────────────────────
TEMPLATE=""
for f in *.html; do
  if [[ "$f" == *"proposal"* ]] || [[ "$f" == *"template"* ]]; then
    TEMPLATE="$f"
    break
  fi
done

if [ -z "$TEMPLATE" ]; then
  osascript -e 'display alert "No Proposal Template Found" message "Place the ARCG proposal HTML template in this folder." as critical'
  exit 1
fi

# ── Detect GovCon flag ──────────────────────────────────────
GOVCON_FLAG=""
INDUSTRY=$(python3 -c "import json; d=json.load(open('client_intake.json')); print(d.get('industry',''))" 2>/dev/null)
if echo "$INDUSTRY" | grep -qi "gov\|federal\|defense\|dod\|contract"; then
  GOVCON_FLAG="--govcon"
fi

# ── Run the pipeline ────────────────────────────────────────
echo ""
echo "============================================"
echo "  ARCG Systems — Intake Pipeline Running"
echo "============================================"
echo "  Client intake : client_intake.json"
echo "  Template      : $TEMPLATE"
echo "  GovCon mode   : ${GOVCON_FLAG:-off}"
echo "============================================"
echo ""

python3 arcg_pipeline.py \
  --intake client_intake.json \
  --template "$TEMPLATE" \
  --save-json \
  $GOVCON_FLAG

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
  osascript -e 'display notification "Proposal generated and opened in Chrome." with title "ARCG Pipeline Complete"'
else
  osascript -e 'display alert "Pipeline Error" message "Check the terminal window for details. Exit code: '"$EXIT_CODE"'" as critical'
fi
