# Project Instructions for AI Agents

This file provides instructions and context for AI coding agents working on this project.

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:ca08a54f -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd dolt push
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
<!-- END BEADS INTEGRATION -->


## Build & Test

```bash
zola serve   # live-reloading dev server at http://127.0.0.1:1111
zola build   # outputs the static site to public/ (gitignored, never commit it)
```

No test suite; `zola build` succeeding is the main correctness check, plus visually
checking pages that changed.

## Architecture Overview

A [Zola](https://www.getzola.org/) static site (Tera templates, plain CSS, no
npm/node). `content/*.md` are front-matter-only — page copy lives in `templates/`, not
Markdown bodies. `templates/partials/nav.html`/`footer.html` vary per page using Zola's
`current_path`. `static/` is copied verbatim into the build, including two standalone
pre-Zola pages (`404.html`, `delete-account/`) kept intentionally as plain HTML.

Deploys via `.github/workflows/deploy.yml` on push to `main` (GitHub Pages, source set
to "GitHub Actions" — not branch-based deploy, or the site 404s since `main`'s repo root
has no `index.html`). See README.md for the full local-dev/deploy writeup.

## Conventions & Patterns

- Don't hardcode page copy in `content/*.md`; it goes in the matching `templates/*.html`.
- `static/styles.css` has a compatibility block (search `.container`) that keeps
  `static/404.html` and `static/delete-account/`'s old class names styled. Don't remove
  it without restyling those two pages.
- The interactive recovery diagram is vanilla JS (`static/js/key-diagram.js`), no
  framework. Contact forms post to Formspree directly from the browser; there's no
  backend here.
