<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a2161633-b8aa-4899-a51c-be2d5626087d

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## FLOWLYM AI Demo

The site includes a live Vapi voice demo at `#/ai-demos` using `@vapi-ai/web`.

Install dependencies before running the project:

```bash
npm install
npm run dev
```

The Vapi public key and assistant ID are configured in `src/pages/AIDemosPage.tsx`. For production, move the public configuration into your preferred environment/config strategy if you want easier assistant switching.

### Team portraits

The Team page currently uses branded initials as placeholders for Muhammad Shahmir, Muhammad Sajawal and Muhammad Huzaifa. Replace those placeholders with real portraits later without changing the layout.
