# Development log

One entry per work session, most recent first. It is the raw material for the thesis: what was done, what was hard and what was learned.

## Template

```
## YYYY-MM-DD · Area · Plan item(s)
**Done:** what was finished.
**Problems:** what failed or cost time, and how it was solved.
**Decisions:** if there were any, link to decisions.md.
**AI:** what the AI agents did, for the thesis.
**Next:** what comes in the next session.
```

---

## 2026-11-10 · Planning · Requirements 1.0
**Done:** consolidated the documentation into `requirements.md` 1.0 (baseline), merging and removing `roadmap.md`, `architecture.md`, `ai-usage.md` and `third-party-licenses.md`. Reviewed every feature with the author and closed all open questions of the 0.1 draft. Added guest access, Spanish and English interface, ten bot levels, three ratings with calibration, server-side analysis with move classification, mistake bank, online play by invitation, statistics with recommendations, CI and the agent-based workflow. New plan with 39 items. Interim `AGENTS.md`.
**Problems:** none. The licences of chess.js (BSD-2-Clause), react-chessboard (MIT), chesslib (Apache-2.0) and the Lichess datasets (CC0) were checked.
**Decisions:** D-18 to D-38 in [decisions.md](decisions.md).
**AI:** planning chat in Claude (requirements, decisions and documentation drafted with the AI and approved by the author).
**Next:** item 10 (AI workspace: agents and skills), then item 4 (backend base project).

## 2026-11-07 · Frontend · Roadmap item 3
**Done:** scaffolded `frontend/` with create-vite (`react-ts` template): Vite 8, React 19, TypeScript and Oxlint. Added Tailwind CSS v4 through `@tailwindcss/vite`. Replaced the template demo with a test page that uses Tailwind utilities. No chessboard yet (roadmap item 7). Build and lint pass in a Linux sandbox.
**Problems:** none blocking. The visual check in the browser on Windows was confirmed by the author.
**Decisions:** D-17 in [decisions.md](decisions.md).
**Next:** item 4 (backend base project); then item 2 (Dockerfiles; the Vite dev server needs `--host` inside the container).

## 2026-11-07 · Repository · Roadmap item 1
**Done:** created the GitHub repository with the GPLv3 license, README, `.gitignore`, the `engine/` placeholder and the `docs/` folder. Decided D-12 to D-16 (engine process pool, UCI options, test endpoint contract, failure handling, repository language).
**Problems:** `LICENSE` showed as modified in git because of Windows line endings (no content change); restored it.
**Decisions:** D-12 to D-16 in [decisions.md](decisions.md).
**Next:** items 3 and 4 (frontend and backend base projects), then item 2 (Dockerfiles).

## 2026-11 · Planning
**Done:** feasibility analysis, stack choice, a 33-item roadmap with priorities, organization of the work with AI and the project control panel.
**Decisions:** D-01 to D-11 in [decisions.md](decisions.md).
**Next:** initial phase, item 1: create the repository.
