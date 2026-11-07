# Development log

One entry per work session, most recent first. It is the raw material for the thesis: what was done, what was hard and what was learned.

## Template

```
## YYYY-MM-DD · Area · Roadmap item(s)
**Done:** what was finished.
**Problems:** what failed or cost time, and how it was solved.
**Decisions:** if there were any, link to decisions.md.
**Next:** what comes in the next session.
```

---

## 2026-11-07 · Frontend · Roadmap item 3
**Done:** scaffolded `frontend/` with create-vite (`react-ts` template): Vite 8, React 19, TypeScript and Oxlint. Added Tailwind CSS v4 through `@tailwindcss/vite`. Replaced the template demo with a test page that uses Tailwind utilities. No chessboard yet (roadmap item 7). Build and lint pass in a Linux sandbox.
**Problems:** none blocking. The visual check in the browser on Windows is pending.
**Decisions:** D-17 in [decisions.md](decisions.md).
**Next:** confirm the test page shows Tailwind styles and tick item 3; item 4 (backend base project); then item 2 (Dockerfiles; the Vite dev server needs `--host` inside the container).

## 2026-11-07 · Repository · Roadmap item 1
**Done:** created the GitHub repository with the GPLv3 license, README, `.gitignore`, the `engine/` placeholder and the `docs/` folder. Decided D-12 to D-16 (engine process pool, UCI options, test endpoint contract, failure handling, repository language).
**Problems:** `LICENSE` showed as modified in git because of Windows line endings (no content change); restored it.
**Decisions:** D-12 to D-16 in [decisions.md](decisions.md).
**Next:** items 3 and 4 (frontend and backend base projects), then item 2 (Dockerfiles).

## 2026-11 · Planning
**Done:** feasibility analysis, stack choice, a 33-item roadmap with priorities, organization of the work with AI and the project control panel.
**Decisions:** D-01 to D-11 in [decisions.md](decisions.md).
**Next:** initial phase, item 1: create the repository.
