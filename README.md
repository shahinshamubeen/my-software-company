# MY Software Company (Astro)

Marketing site built with Astro, React islands, and Tailwind.

## Commands

- `pnpm install` - install dependencies
- `pnpm dev` - run local dev server
- `pnpm build` - build production output
- `pnpm preview` - preview the built site
- `pnpm cms:proxy` - run the Decap local backend proxy

## Decap CMS Setup

This project is wired to Decap CMS at `/admin` and Astro content collections.

### 1) Configure Decap backend

Edit [public/admin/config.yml](public/admin/config.yml) and set:

- `backend.repo` to your GitHub repo (`owner/name`)
- `backend.branch` to your default branch

### 2) Local authoring workflow

Run both commands in separate terminals:

- `pnpm dev`
- `pnpm cms:proxy`

Then open `http://localhost:4321/admin`.

### 3) Content sources managed by CMS

- [src/content-data/blog.json](src/content-data/blog.json)
- [src/content-data/case-studies.json](src/content-data/case-studies.json)
- [src/content-data/jobs.json](src/content-data/jobs.json)

These are validated and loaded through Astro collections in [src/content.config.ts](src/content.config.ts).

## Authentication Notes

- Netlify deployments can use Git Gateway + Netlify Identity.
- Other hosts require an external OAuth flow compatible with Decap.

Reference: https://docs.astro.build/en/guides/cms/decap-cms/
