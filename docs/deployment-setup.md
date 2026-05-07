# Deployment Setup Guide

This document is for the person deploying or handing off the site. It covers the third-party services, environment variables, and checks needed to deploy the project safely.

## Scope

The site uses the following external services:

- Cookiebot for cookie consent and cookie declaration pages
- Google Analytics 4 for consented statistics analytics
- Meta Pixel for consented marketing tracking
- Google Gemini for the AI chat API route
- Decap CMS for content editing at `/admin`
- Google Fonts for typography
- Calendly and Cal.com as external booking destinations

## Required environment variables

Set these in your hosting environment for production:

```env
PUBLIC_COOKIEBOT_CBID="your-cookiebot-domain-group-id"
PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
PUBLIC_META_PIXEL_ID="123456789012345"
GEMINI_API_KEY="your-gemini-api-key"
```

Notes:

- `PUBLIC_*` variables are exposed in the browser, so they must only contain public identifiers.
- `GEMINI_API_KEY` is server-side only and must never be exposed in browser code.
- If `PUBLIC_COOKIEBOT_CBID` is missing, Cookiebot, GA4, and Meta Pixel remain disabled.

## Cookiebot setup

Cookiebot is the consent gate for analytics and marketing.

1. Create or open the Cookiebot domain group for this site.
2. Add the production domain to the domain group.
3. Copy the domain group ID into `PUBLIC_COOKIEBOT_CBID`.
4. Ensure the Cookiebot banner and privacy trigger are enabled.
5. Re-scan the site after deployment so the cookie declaration reflects the live page.
6. Confirm that Cookiebot categorizes the detected scripts correctly:
   - Google Analytics 4 under `Statistics`
   - Meta Pixel under `Marketing`

Important:

- This site is configured to keep GA4 and Meta Pixel blocked until the matching consent category is accepted.
- The cookie declaration page at `/cookies` depends on the Cookiebot scan.

## Google Analytics 4 setup

1. Create or open the GA4 property.
2. Copy the Measurement ID from the web data stream.
3. Place it in `PUBLIC_GA_MEASUREMENT_ID`.
4. Confirm that GA4 is only loaded after `Statistics` consent.
5. Verify page views in GA4 Realtime after accepting statistics cookies.

## Meta Pixel setup

1. Create or open the Pixel in Meta Events Manager.
2. Copy the numeric Pixel ID.
3. Place it in `PUBLIC_META_PIXEL_ID`.
4. Confirm that the Pixel only loads after `Marketing` consent.
5. Verify `PageView` events in Meta Events Manager after accepting marketing cookies.

## Gemini chat API setup

The AI chat endpoint in `src/pages/api/chat.ts` depends on Google Gemini.

1. Add `GEMINI_API_KEY` to the production environment.
2. Ensure the runtime can resolve the Gemini SDK dependency.
3. Confirm the chat route returns a valid response before launch.

Notes:

- If the Gemini API key is missing, the chat API should fail closed.
- If the SDK dependency is not installed, the build or runtime will fail until it is added.

## Decap CMS setup

The site is wired for Decap CMS at `/admin`.

1. Keep the reusable admin shell in `public/admin/index.html`, `public/admin/admin-auth.js`, and `public/admin/identity-token-redirect.js`.
2. Update the project-specific collections and branch in `public/admin/config.yml`.
3. Confirm the hosting provider supports the chosen authentication flow.
4. For local authoring, run `pnpm dev` and `pnpm cms:proxy` together, then open `/admin`.
5. Verify the CMS can edit these content collections:
   - `src/content/blog`
   - `src/content/work`
   - `src/content/jobs`

## Legal and compliance checks

Before launch, make sure the live site includes:

- A correct legal entity name and privacy contact details in the privacy policy
- Working `/privacy`, `/terms`, and `/cookies` pages
- A cookie consent banner that matches the configured Cookiebot account
- A documented retention and vendor review for any analytics, advertising, or AI providers
- A jurisdiction-specific legal review for the countries where the site will be used

The code is set up for a consent-first model, but legal sign-off is still required for any real deployment.

## Hosting verification checklist

Before handing over the site, confirm the following:

- The site builds successfully in the target hosting environment
- `Cookiebot`, `GA4`, and `Meta Pixel` are all configured with production IDs
- Cookie consent categories behave correctly in the browser
- `/cookies` shows the live Cookiebot declaration after the domain scan completes
- `/admin` works if Decap CMS is part of the deployment
- The booking links and contact page load without blocked mixed-content or CSP issues

## Notes on external assets

The site also loads fonts and icons from third-party CDNs such as Google Fonts, jsDelivr, and unpkg.

- If the deployment environment uses a strict Content Security Policy, allow those asset domains explicitly.
- If you want to eliminate those dependencies, replace them with locally hosted assets before launch.
