# Technical decisions

Record of the decisions that shape the project: what was chosen, what other options existed and why. It is the basis for the thesis. Each new decision is added at the end with the next number.

---

### D-01 · Single repository (monorepo)
**Decision:** one repository with `frontend/`, `backend/` and `engine/`.
**Alternative:** one repository per part.
**Reason:** a single developer, and frontend and backend almost always change together. A change to an endpoint and to the screen that uses it goes in one commit, and one `docker-compose.yml` starts everything.

### D-02 · Backend with Spring Boot
**Decision:** Spring Boot with Spring Security + JWT and JPA/Hibernate.
**Alternatives:** Express (Node), Flask (Python), Go.
**Reason:** the author already has experience with a REST API in Spring Boot. With a fixed deadline, learning another framework adds no technical value to this project, because the engine does the heavy work, not the backend. WebSockets (Show mode) and external processes (`ProcessBuilder`) are well covered.

### D-03 · Frontend with React, Vite and Tailwind
**Decision:** React + Vite + Tailwind, with `react-chessboard` and `chess.js`.
**Alternative:** plain JavaScript without a framework.
**Reason:** many views with complex state (game, trainer, review, show, statistics) that are easier to maintain with components.

### D-04 · Engines as external processes over UCI
**Decision:** Stockfish and the custom engine run as independent processes and the backend talks to them over UCI (stdin / stdout).
**Alternative:** link Stockfish as a library inside the backend.
**Reason:** it decouples the backend language from the engine language, treats both engines the same way and avoids ambiguity with the GPL license, because nothing is linked. See [third-party-licenses.md](third-party-licenses.md).

### D-05 · Stockfish compiled in the Dockerfile
**Decision:** clone the official Stockfish repository and compile it in a stage of the backend Dockerfile, with `ARCH=x86-64-avx2`. If the target server does not support AVX2, use `ARCH=x86-64`.
**Alternatives:** store the binary in the repository or download a precompiled one.
**Reason:** reproducible between the development machine and the server, and no third-party code or binaries are added to the repository.

### D-06 · Custom engine in C++
**Decision:** the custom engine is written in C++.
**Alternatives:** Java, Go.
**Reason:** fine control over memory for bitboards and search, no garbage collector pauses during a time-limited search, and it is the language the author knows from the degree.

### D-07 · PostgreSQL database
**Decision:** PostgreSQL.
**Alternative:** MySQL.
**Reason:** good support for advanced types and JSON to store games and positions. MySQL would also work; it is not a critical decision.

### D-08 · Docker from day one
**Decision:** the whole development environment runs with Docker Compose from the start.
**Alternative:** dockerize at the end.
**Reason:** one command starts everything and there is no "it works on my machine" problem when deploying.

### D-09 · Building by features, end to end
**Decision:** each feature is completed entirely (entity, endpoint and screen) before starting the next one.
**Alternative:** build all the entities first, then all the screens and connect everything at the end.
**Reason:** integration problems between layers show up early and do not pile up at the end, when there is less room to fix them.

### D-10 · GPLv3 license and direct commits to `main`
**Decision:** the repository is GPLv3 and work is done directly on `main`, with a git tag when each major phase closes.
**Reason:** GPLv3 is consistent with shipping Stockfish. Working alone, branches and pull requests add no review; tags give easy return points.

### D-11 · Trainer mode in the core
**Decision:** trainer mode is part of the core of the application, not of the extensions.
**Reason:** it is the feature that best expresses the goal of the project, learning while playing.

---

### D-12 · Pool of long-lived Stockfish processes
**Decision:** the backend keeps a pool of Stockfish processes that are not closed between requests. Each use takes a process from the pool and returns it when done. The pool size is a configuration property and starts at 1. There are two ways to use it with the same mechanism: playing takes a process only for one move, and review mode keeps the same process for the whole analysis of a game. Requests carry no state: they always include the full position (FEN). Because UCI options stay in the process, they are set on every use.
**Alternatives:** one process per game, or a new process for every move.
**Reason:** one process per game forces cleaning up the processes of abandoned games. A new one per move works for playing, but review mode benefits from an already open process, and keeping both paths would duplicate code. The pool covers both uses and also the trainer and Show mode.

### D-13 · Initial UCI options
**Decision:** `Threads=1` and `Hash=64` (MB) per process, set at startup. If more capacity is needed, increase the pool size before the thread count.
**Alternative:** few processes with several threads each.
**Reason:** with several simultaneous users, several single-thread processes perform better, and 64 MB of hash is plenty for one-second searches. These are starting values: they are reviewed once performance is measured.

### D-14 · Test endpoint `POST /api/test-stockfish`
**Decision:** a test endpoint that receives a FEN position and an optional search time, and returns the best move in UCI notation. The full contract (input and output format, errors and the steps the backend follows) is in [architecture.md](architecture.md#test-endpoint-contract).
**Alternative:** `GET` with the position in the URL.
**Reason:** a FEN contains spaces and slashes, and a `POST` request with a JSON body handles it better. The input is validated and the time is limited because it goes to a line-based text protocol (a line with `quit` or `setoption` slipped into the FEN would reach the engine) and so nobody can block it with long searches. The endpoint will be replaced by the final one in item 14 of the roadmap.

### D-15 · Engine process failures
**Decision:** if a process closes or does not respond within `movetime` plus 2000 ms, it is discarded, another one is started and the request is repeated once. If the retry also fails, the API responds 503 and the failure is logged. The number of retries is a configuration property (1 by default). In addition, the process's standard error is always drained and all processes are shut down when the application stops.
**Alternative:** more than one retry.
**Reason:** a clean restart covers one-off failures (a process killed for lack of memory, a hung process). If the second attempt also fails, the cause is usually fixed (an input that breaks the engine, a binary the server's CPU does not support) and repeating only adds waits of up to `movetime` plus 2 seconds per attempt.

### D-16 · Repository language
**Decision:** all repository content is in English: file names, documentation, code identifiers and commit messages. Conversations with the AI assistant stay in Spanish.
**Reason:** author's preference, and it keeps documentation, code and commit history in one language.

### D-17 · Frontend base setup
**Decision:** Vite 8 + React 19 + TypeScript (create-vite `react-ts` template), Tailwind CSS v4 through the official `@tailwindcss/vite` plugin, and Oxlint (`npm run lint`) as the only linter for now. Node ^20.19.0 or >=22.12.0 is required (Vite 8). The dev server uses the default port 5173.
**Alternatives:** JavaScript instead of TypeScript; Tailwind through PostCSS and `tailwind.config.js`; ESLint + Prettier.
**Reason:** TypeScript catches errors early when most of the frontend code is generated by the AI. The Vite plugin is the current recommended Tailwind path and needs fewer config files. Oxlint comes with the template and is enough for now. Port 5173 matters later for backend CORS and Docker Compose.
