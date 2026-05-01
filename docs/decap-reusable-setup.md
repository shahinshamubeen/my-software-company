# Reusable Decap Setup

The correct reusable shape is a static admin bundle, not a framework route. Decap's official install guide expects an `admin` folder with `index.html` and `config.yml` in the static/public directory for the framework. This repo follows that shape under `public/admin/`.

## What to copy

Copy this folder into the target project's static assets directory:

```text
public/admin/
  index.html
  admin-auth.js
  identity-token-redirect.js
  config.yml
```

For other frameworks, place the same `admin` folder wherever static files are served:

- Astro, Next, Nuxt 3: `public/admin`
- SvelteKit, Hugo, Nuxt 2: `static/admin`
- Docusaurus: `static/admin`
- Jekyll: `admin` at the project root

## What is reusable

- `index.html` is the framework-agnostic Decap entrypoint.
- `admin-auth.js` keeps Netlify Identity login/logout behavior clean.
- `identity-token-redirect.js` forwards Netlify Identity email hash tokens from public pages to `/admin/`.

## What must change per project

- `config.yml` collections, folders, fields, media folders, and preview paths.
- `backend.branch` if the target project does not deploy from `master`.
- Any content validation in the app itself, such as Astro content collections.

For Git Gateway, do not add `backend.repo`; Netlify Git Gateway uses the repository connected to the Netlify site.

## Add the public token redirect

If Netlify Identity emails use the default `{{ .ConfirmationURL }}` links, include this script in the target app's main layout or root HTML head:

```html
<script src="/admin/identity-token-redirect.js"></script>
```

This script detects hashes such as `#invite_token=...` on public pages and redirects to `/admin/#invite_token=...`, where the Identity widget and Decap are loaded.

If you customize Netlify Identity email templates to point directly to `/admin/#...`, the public redirect script is optional.

## Optional custom admin path

The scripts default to `/admin/`. If a project mounts Decap somewhere else, set this before loading either reusable script:

```html
<script>
  window.DECAP_ADMIN_PATH = "/cms/";
</script>
<script src="/admin/identity-token-redirect.js"></script>
```

If you change the mounted path, also update `index.html` script/link URLs and `config.yml` paths accordingly.

## Netlify setup

1. Enable Netlify Identity.
2. Set Registration to `Invite only` for editor-only CMS access.
3. Enable Git Gateway under Identity services.
4. Invite users from the Identity users screen.
5. Test with a fresh invite link.

Note: Netlify's Git Gateway docs now mark Git Gateway as deprecated for new configurations, although existing enabled sites continue to work. For brand-new long-lived projects, consider whether a provider OAuth backend is a better fit before standardizing on Git Gateway.

## References

- Decap CMS install guide: https://decapcms.org/docs/install-decap-cms/
- Decap CMS backend guide: https://decapcms.org/docs/choosing-a-backend/
- Decap Git Gateway backend: https://decapcms.org/docs/git-gateway-backend/
- Netlify Git Gateway docs: https://docs.netlify.com/manage/security/secure-access-to-sites/git-gateway/
