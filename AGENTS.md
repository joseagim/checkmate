# CheckMate: rules for AI agents

CheckMate is a web application to learn and improve at chess, the Final Degree Project of its author. This file holds only the working rules. Everything about what to build is in [docs/requirements.md](docs/requirements.md), the single source of truth: read the sections of the item you work on before you start.

_Interim version. The full version, with the agents and skills, is written in item 10 of the plan._

## Rules

1. **Requirements first.** Implement what `docs/requirements.md` says, and nothing else. If something is missing, unclear or wrong, stop and say so; the requirement is changed first (section 18), then the code.
2. **Never touch `engine/`.** The custom C++ engine is written only by the author. You may review it, explain concepts and help find bugs, but you never write or edit its code, not even a one-line fix.
3. **Stay in your area** (section 13 of the requirements): frontend code in `frontend/`, backend code in `backend/`, infrastructure files, documentation in `docs/`.
4. **No new dependencies** unless they are listed in section 11.5 of the requirements.
5. **Prove your work.** Before finishing, run what applies: `npm run lint`, `npm run build` and `npm run test` in `frontend/`; `./mvnw verify` in `backend/`. Report the results.
6. **Do not commit or push.** The author reviews the diff and commits.
7. **English in the repository** (file names, code, comments, docs, commit messages); talk to the author in Spanish.
8. **Configuration, not constants**: values that may change are properties (section 11.6).

## Environment

Windows with PowerShell (`curl` is an alias there: use `curl.exe` or `Invoke-RestMethod`); Docker Desktop; JDK 24 installed, project target Java 21; Node `^20.19.0` or `>=22.12.0`. Scripts that run in containers need LF line endings.

## Documentation

- `docs/requirements.md`: what to build (single source of truth).
- `docs/decisions.md`: why each decision was taken.
- `docs/devlog.md`: one entry per work session.

At the end of a session, offer a summary in the devlog format (Done, Problems, Decisions, Next).
