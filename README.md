# Horcrux website

The marketing site for [Horcrux](https://github.com/mplorentz/horcrux), live at
[horcruxbackup.com](https://horcruxbackup.com).

## Stack

Built with [Zola](https://www.getzola.org/) (Rust static site generator, Tera templates)
+ plain CSS + a bit of vanilla JS. No npm/node.

## Local dev

```bash
brew install zola   # or: cargo install zola --locked
zola serve           # live-reloading dev server at http://127.0.0.1:1111
zola build            # outputs the static site to public/
```

## Layout

- `content/` — one Markdown file per page, front matter only (`template = "..."`); all
  copy lives in the templates, not the Markdown body.
- `templates/` — Tera templates. `base.html` is the shared shell; `partials/nav.html` and
  `partials/footer.html` vary per page based on Zola's `current_path`.
- `static/` — copied verbatim into the build: `styles.css`, `js/`, `assets/`, and a couple
  of standalone legacy pages (`404.html`, `delete-account/`) that predate the Zola port and
  are intentionally not Tera templates.
- `public/` — build output. Gitignored; never commit it.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `zola build` and
publishes `public/` to GitHub Pages via `actions/deploy-pages`.

This repo's GitHub Pages **source must stay set to "GitHub Actions"** (not "Deploy from a
branch"). If it's ever reset to branch-based deploy, the site 404s — `main`'s repo root has
no `index.html` (everything lives under `templates/`/`content/`/`static/` now), so a raw
branch checkout isn't a servable site. The custom domain (`horcruxbackup.com`) is configured
directly in the repo's Pages settings; it used to be auto-detected from a root-level `CNAME`
file under the old branch-deploy setup, which no longer applies.
