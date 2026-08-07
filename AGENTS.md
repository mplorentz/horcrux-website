# Agent Instructions

This project uses **bd** (beads) for issue tracking. Run `bd prime` for full workflow context.

## Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work atomically
bd close <id>         # Complete work
bd dolt push          # Push beads data to remote
```

## Non-Interactive Shell Commands

**ALWAYS use non-interactive flags** with file operations to avoid hanging on confirmation prompts.

Shell commands like `cp`, `mv`, and `rm` may be aliased to include `-i` (interactive) mode on some systems, causing the agent to hang indefinitely waiting for y/n input.

**Use these forms instead:**
```bash
# Force overwrite without prompting
cp -f source dest           # NOT: cp source dest
mv -f source dest           # NOT: mv source dest
rm -f file                  # NOT: rm file

# For recursive operations
rm -rf directory            # NOT: rm -r directory
cp -rf source dest          # NOT: cp -r source dest
```

**Other commands that may prompt:**
- `scp` - use `-o BatchMode=yes` for non-interactive
- `ssh` - use `-o BatchMode=yes` to fail instead of prompting
- `apt-get` - use `-y` flag
- `brew` - use `HOMEBREW_NO_AUTO_UPDATE=1` env var

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

## This is a Zola site

Local dev: `zola serve`. Build: `zola build` (output in `public/`, gitignored — never
commit it). See README.md for the full picture; the load-bearing facts:

- **GitHub Pages source must stay "GitHub Actions."** `main`'s repo root has no
  `index.html` — the site only exists after `zola build`. If Pages is ever reset to
  branch-based deploy, horcruxbackup.com 404s (this happened once; see
  `.github/workflows/deploy.yml`, which is the thing that must run on every push to main).
- `content/*.md` are front-matter-only (`template = "..."`); page copy lives in
  `templates/`, not Markdown bodies.
- `templates/partials/nav.html` and `partials/footer.html` branch on Zola's built-in
  `current_path` variable to vary links per page — there's no per-template "set a
  page_key" variable (Tera doesn't allow `{% set %}` before `{% extends %}`).
- `static/404.html` and `static/delete-account/` are standalone pre-Zola pages, kept
  as-is on purpose. They still load `/styles.css`, so `static/styles.css` carries a
  small compatibility block (search `.container` near the bottom) that keeps their old
  class names (`.button`, `.spinner`, `.state`, etc.) styled. Don't delete that block
  without restyling those two pages first.
- The interactive recovery diagram (homepage + how-it-works) is vanilla JS in
  `static/js/key-diagram.js`, mounted on any `[data-key-diagram]` element via the
  `templates/partials/key-diagram.html` partial. No build step, no framework.
- Contact forms post to Formspree directly from the browser (see `how-it-works.html`);
  there's no backend in this repo.
