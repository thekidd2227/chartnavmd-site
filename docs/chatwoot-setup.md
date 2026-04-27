# ARCG Systems — Chatwoot Setup Handoff

## What is done

1. **Tidio removed** from `index.html` (was `code.tidio.co/zcayqmz3yjuh5qsa3l9a3cohfdpxlhbr.js`).
2. **Chatwoot widget loader** installed at `public/assets/chatwoot.js`, loaded from `index.html` via `<script src="/assets/chatwoot.js" defer>`.
3. The loader has a safe guard: if the website token is still the placeholder, it skips loading silently.
4. **SourceDeck knowledge base** (100 Q&A rows) already imported as canned responses into Chatwoot account 160989 via the `sourcedeck-site/docs/chatwoot-canned-responses.json` import (completed in prior step).

## What you need to do

### Step 1 — Create an ARCG Systems website inbox in Chatwoot

1. Sign in at https://app.chatwoot.com (account 160989).
2. Go to **Settings → Inboxes → Add Inbox → Website**.
3. Set:
   - **Website name:** `ARCG Systems`
   - **Website URL:** `https://arcgsystems.com`
   - **Welcome tagline:** `Diagnosis-first operational intelligence. Ask us anything.`
   - **Welcome message:** `I can help with SourceDeck, operational diagnostics, and how ARCG Systems works. What can I help with?`
   - **Widget color:** `#C9941A` (ARCG gold) or `#0071e3` (blue)
   - **Reply time:** `A few minutes`
4. Click **Create Inbox**. Copy the **Website Token**.

### Step 2 — Paste the token

Open `public/assets/chatwoot.js` and replace:

```js
var CHATWOOT_TOKEN = 'PASTE_YOUR_WEBSITE_TOKEN_HERE';
```

with your real token, e.g.:

```js
var CHATWOOT_TOKEN = 'abc123XYZdef456';
```

### Step 3 — Rebuild + deploy

```bash
cd ~/arcg-live
npm run build
git add public/assets/chatwoot.js
git commit -m "chat: activate Chatwoot with live ARCG Systems website token"
git push origin main
```

### Step 4 — Verify

Open https://arcgsystems.com in an incognito window. The Chatwoot bubble should appear in the bottom-right corner.

## Canned responses

The 100 SourceDeck canned responses are already loaded in account 160989. They cover:
- product overview, pricing, setup
- integrations, campaigns, deliverability
- desktop app, data protection, support
- ARCG Systems relationship

Agents use them by typing `/short_code` in any conversation. The SourceDeck-specific ones work for both sites since ARCG Systems is the parent company.

If you need ARCG-specific canned responses (consulting services, federal access, compliance reporting, etc.), create additional ones in **Settings → Canned Responses** using the arcgsystems.com page content as source material.

## File locations

| Asset | Path | Purpose |
|---|---|---|
| Widget loader | `public/assets/chatwoot.js` | Single config point — edit token here |
| SourceDeck KB (CSV) | `~/sourcedeck-site/docs/sourcedeck-knowledge-base.csv` | 100 Q&A rows — already imported as canned responses |
| SourceDeck canned JSON | `~/sourcedeck-site/docs/chatwoot-canned-responses.json` | The file that was bulk-imported |
| This setup note | `docs/chatwoot-setup.md` | You are reading it |

## What Chatwoot does NOT do

- No auto-trained AI Q&A bot from CSV. Canned responses are agent-assist (slash commands), not autonomous bot answers.
- AI auto-reply requires Chatwoot's OpenAI integration (Settings → Integrations → OpenAI) with your own API key.
