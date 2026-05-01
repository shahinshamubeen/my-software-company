# MY Software Company (Astro)

Marketing site built with Astro, React islands, and Tailwind.

## Commands

- `pnpm install` - install dependencies
- `pnpm dev` - run local dev server
- `pnpm build` - build production output
- `pnpm preview` - preview the built site
- `pnpm cms:proxy` - run the Decap local backend proxy

## Consent And Analytics Setup

This project now supports:

- Cookiebot CMP for consent collection
- Google Analytics 4 behind Cookiebot `statistics` consent
- Meta Pixel behind Cookiebot `marketing` consent

### 1) Configure environment variables

Copy `.env.example` to `.env` and replace the placeholders:

- `PUBLIC_COOKIEBOT_CBID`
- `PUBLIC_GA_MEASUREMENT_ID`
- `PUBLIC_META_PIXEL_ID`

Important:

- GA4 and Meta Pixel are only enabled when `PUBLIC_COOKIEBOT_CBID` is set.
- The Cookiebot domain scan must complete before the cookie declaration page is fully populated.
- These are public browser-side IDs, so they intentionally use the `PUBLIC_` prefix.

Example:

```env
PUBLIC_COOKIEBOT_CBID="11111111-2222-3333-4444-555555555555"
PUBLIC_GA_MEASUREMENT_ID="G-ABC123DEF4"
PUBLIC_META_PIXEL_ID="123456789012345"
```

### 2) Where to get each ID

#### Cookiebot

- Create or open your Cookiebot domain group
- Add your website domain to that domain group
- Copy the Cookiebot domain group ID and place it in `PUBLIC_COOKIEBOT_CBID`

#### Google Analytics 4

- Open Google Analytics
- Go to `Admin` -> `Data streams`
- Open your web data stream
- Copy the `Measurement ID` that looks like `G-XXXXXXXXXX`
- Place it in `PUBLIC_GA_MEASUREMENT_ID`

#### Meta Pixel

- Open Meta Events Manager
- Create or open the Pixel for this site
- Copy the numeric Pixel ID
- Place it in `PUBLIC_META_PIXEL_ID`

### 3) Cookiebot checklist

In Cookiebot:

- Add your production domain under the correct domain group
- Configure the banner and privacy trigger
- Keep Google consent mode enabled in Cookiebot
- Re-scan the site after deploying GA4 and Meta Pixel so Cookiebot can classify them
- Make sure `Google Analytics 4` is categorized under `Statistics`
- Make sure `Meta Pixel` is categorized under `Marketing`

### 4) What the code does

The consent and analytics wiring lives in:

- `src/components/ConsentAndAnalytics.astro`
- `src/layouts/Layout.astro`
- `src/pages/cookies.astro`
- `src/components/Footer.astro`

Behavior:

- Cookiebot loads first when `PUBLIC_COOKIEBOT_CBID` is present
- GA4 loads only after `statistics` consent
- Meta Pixel loads only after `marketing` consent
- Page views are sent manually so they also work across Astro view transitions
- The footer includes a `Cookie Settings` trigger that reopens the Cookiebot dialog
- `/cookies` renders the Cookiebot Cookie Declaration script

### 5) Events currently tracked

#### Google Analytics 4

- `page_view`
- `schedule_call_open`
- `schedule_call_provider_click`

Parameters currently sent where available:

- `provider`
- `label`

#### Meta Pixel

- `PageView`

Note:

- The current implementation does not yet send Meta custom events for booking clicks
- The contact form and newsletter form are still demo flows, so no lead submission events are tracked yet

### 6) Verify the setup

- Accept `statistics` cookies and confirm GA4 page views arrive in Realtime
- Accept `marketing` cookies and confirm Meta Pixel events appear in Events Manager
- Reject optional cookies and confirm GA4 and Meta Pixel do not fire
- Visit `/cookies` and confirm the Cookie Declaration renders after the Cookiebot scan completes
- Open the footer `Cookie Settings` button and confirm the Cookiebot dialog reopens
- Open DevTools and verify:
  - no `gtag/js` request before statistics consent
  - no `fbevents.js` request before marketing consent
  - `gtag/js` appears after statistics consent
  - `fbevents.js` appears after marketing consent

### 7) Local development notes

- If `PUBLIC_COOKIEBOT_CBID` is missing, Cookiebot, GA4, and Meta Pixel stay disabled
- If `/cookies` shows the placeholder message, the Cookiebot ID is missing or the domain scan has not completed yet
- Localhost behavior depends on how your Cookiebot domain group is configured
- If you want to test the full banner locally, add the local domain in Cookiebot if your plan/setup allows it

### 8) Deployment checklist

- Add the production IDs to your hosting environment variables
- Deploy the site
- Re-run the Cookiebot scan after deployment
- Verify consent categories in Cookiebot
- Verify GA4 Realtime
- Verify Meta Events Manager `Test Events`
- Confirm `/cookies`, `/privacy`, and `/terms` are all live before launch

For a deployment handoff checklist that includes Cookiebot, GA4, Meta Pixel, Gemini chat, and Decap CMS, see [docs/deployment-setup.md](docs/deployment-setup.md).

Note: the current contact and newsletter forms are still demo flows, so no lead conversion event is sent yet.

## Decap CMS Setup

This project is wired to Decap CMS at `/admin` and Astro content collections.

The reusable Decap shell lives in `public/admin/`:

- `index.html` - static CMS entrypoint
- `admin-auth.js` - Netlify Identity login/logout cleanup
- `identity-token-redirect.js` - public-page invite/reset token forwarding
- `config.yml` - project-specific Decap backend and collections

### 1) Configure Decap backend

The CMS uses Netlify Identity + Git Gateway:

- `backend.name` should stay `git-gateway`
- `backend.branch` should match the Netlify-connected branch, currently `master`
- Do not add a `backend.repo` field for Git Gateway

For the full login, invite, and registration flow, see [docs/netlify-identity-setup.md](docs/netlify-identity-setup.md).
For reuse in other projects, see [docs/decap-reusable-setup.md](docs/decap-reusable-setup.md).

### 2) Local authoring workflow

Run both commands in separate terminals:

- `pnpm dev`
- `pnpm cms:proxy`

Then open `http://localhost:4321/admin`.

### 3) Content sources managed by CMS

- [src/content/blog](src/content/blog) (one markdown file per post)
- [src/content/work](src/content/work) (one JSON file per case study)
- [src/content/jobs](src/content/jobs) (one JSON file per role)

These entries are validated and loaded through Astro collections in [src/content.config.ts](src/content.config.ts).

## Authentication Notes

- Netlify deployments can use Git Gateway + Netlify Identity.
- Other hosts require an external OAuth flow compatible with Decap.

Reference: https://docs.astro.build/en/guides/cms/decap-cms/
