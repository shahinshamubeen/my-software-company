# Netlify Identity + Git Gateway setup

This project uses Decap CMS at `/admin/` with Netlify Identity and Git Gateway. Keep the auth flow boring: `/admin/` is the only login and registration surface, and public pages only forward Netlify email hash tokens to `/admin/`.

Netlify now recommends `@netlify/identity` for new custom app auth, but Decap's Git Gateway integration still uses the hosted Netlify Identity widget. Do not introduce a second auth library unless the CMS backend is changed too.

## Auth flow in this repo

- `src/pages/admin.html` loads the Netlify Identity widget and Decap CMS.
- `src/layouts/Layout.astro` detects Identity email tokens on public pages and redirects them to `/admin/` with the hash preserved.
- There is no separate registration page and no `/admin/callback/` route.
- Do not call `netlifyIdentity.init()` or force `netlifyIdentity.open("signup")` manually. The hosted widget handles `invite_token`, `confirmation_token`, `recovery_token`, and `email_change_token` when the hash is present.

## Netlify dashboard setup

1. Open Netlify dashboard > Project configuration > Identity and enable Identity.
2. Set Registration to `Invite only` for CMS-only access.
3. Open Identity > Services and enable Git Gateway.
4. Authorize Netlify against the GitHub repository.
5. Invite editor emails from Identity > Users.

## Email link paths

Netlify default Identity emails use `{{ .ConfirmationURL }}`, which usually points to your site root with a hash token such as `/#invite_token=...`. This repo forwards those links to `/admin/#invite_token=...` automatically.

If your Netlify plan allows custom Identity email templates, point links directly to `/admin/`:

```html
<!-- Invitation -->
<a href="{{ .SiteURL }}/admin/#invite_token={{ .Token }}">Accept the invite</a>

<!-- Confirmation -->
<a href="{{ .SiteURL }}/admin/#confirmation_token={{ .Token }}">Confirm your email</a>

<!-- Password recovery -->
<a href="{{ .SiteURL }}/admin/#recovery_token={{ .Token }}">Reset password</a>

<!-- Email change -->
<a href="{{ .SiteURL }}/admin/#email_change_token={{ .Token }}">Confirm email change</a>
```

## Test checklist

1. Deploy the latest build.
2. Send a fresh Identity invite.
3. Open the invite link in a normal browser window.
4. Confirm the final URL is `/admin/#invite_token=...`.
5. The Identity widget should show registration fields for the invite.
6. After the user sets a password, `/admin/` should load Decap CMS.
7. Returning editors should go directly to `/admin/` and use email + password login.

## Troubleshooting

- If the widget shows login instead of registration, the URL probably does not contain `invite_token` or the invite token was already used. Send a fresh invite.
- If the invite email never arrives, check spam/quarantine, existing pending users, and any custom SMTP settings in Netlify.
- If login succeeds but Decap cannot load content or save, re-check Git Gateway and the branch in `public/admin/config.yml`.
- If a custom domain is used, verify HTTPS is active. Identity requires HTTPS outside local development.
