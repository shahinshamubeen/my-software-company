# Netlify Identity + Git Gateway setup

This project uses Decap CMS (Netlify CMS) with `git-gateway` as the backend. Follow the steps below to enable email/password (Identity) login for non-technical clients.

## 1. Confirm site on Netlify
- Ensure the repo `shahinshamubeen/my-software-company` is connected to a Netlify Site and that the current branch is deployed.

## 2. Enable Identity
1. In the Netlify dashboard, open your Site → `Site settings` → `Identity` (or `Identity` in the left sidebar).
2. Click **Enable Identity**.
3. (Optional) Under Settings → `Identity` → `Registration`, choose **Invite only** to prevent open signups.

## 3. Enable Git Gateway
1. In the Netlify Site dashboard go to `Identity` → `Services` → find **Git Gateway** and click **Enable Git Gateway**.
2. Authorize Netlify to access your Git provider (GitHub). This allows commits to be made on behalf of Identity users.

## 4. Invite users (email/password)
1. Identity → `Invite users` → enter client email(s) and send invite.
2. The invited user will receive an email to set a password and sign in.

## 5. Test Decap CMS login
1. Visit `/admin` for your deployed site (e.g., `https://your-site.netlify.app/admin`).
2. Click **Login** and use the invited email + password.
3. The CMS should allow editing and commit changes via Git Gateway.

## 6. CLI alternatives
- Invite users via Netlify Teams API or `netlify` CLI if you prefer automation (`netlify login`, then use the API or UI).

## Notes
- Keep `local_backend: true` for local development — it does not interfere with Netlify Identity in production.
- If you want a visible `username` field in the CMS UI, add a custom user metadata field in Netlify Identity and map it in your editorial workflow.

If you want, I can open the Netlify site settings page for you (requires `netlify` CLI login) or invite a specific email if you provide the Netlify access token. Otherwise, proceed with the dashboard steps above.
