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
**Reason:** it decouples the backend language from the engine language, treats both engines the same way and avoids ambiguity with the GPL license, because nothing is linked. See the licences in [requirements.md](requirements.md#115-dependencies-and-licences).

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
**Decision:** a test endpoint that receives a FEN position and an optional search time, and returns the best move in UCI notation. The full contract (input and output format, errors and the steps the backend follows) is in [requirements.md](requirements.md#75-test-endpoint).
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

---

### D-18 · One source of truth for the documentation
**Decision:** `docs/requirements.md` holds everything about what is built and how: functionality, interface, API, data model, stack, quality, use of AI, plan and risks. Only two other documents remain: `decisions.md` (why) and `devlog.md` (what happened). `roadmap.md`, `architecture.md`, `ai-usage.md` and `third-party-licenses.md` were merged into it and removed.
**Alternative:** several documents, each with its own topic.
**Reason:** the same information in several places drifts apart, and a change is easy to apply in one place and forget in another. AI agents also need one reference to follow (spec-driven development).

### D-19 · Development with AI agents, by area
**Decision:** the project is built with Claude Code agents in VS Code (`.claude/agents/`, `.claude/skills/`). The author approves the design in the requirements; the `frontend` and `backend` agents implement it (the backend agent also covers the database), and the author reviews every diff. The custom engine is written only by the author: agents review, explain and help debug, and the agents that look at it have no editing tools.
**Alternative:** the previous rule for the backend (the author writes the code and the AI only explains and reviews).
**Reason:** the backend design stays with the author, through the requirements, while the agents do the implementation work; the custom engine keeps its academic value as the author's own work. It replaces the backend rule of the former `ai-usage.md`.

### D-20 · Guest access
**Decision:** guests can play any number of games against bots at any level, without trainer and without storing anything, and can review the game they have just played once per day per IP. Everything else needs an account.
**Alternative:** everything behind login.
**Reason:** people can try the product at once; the daily limit protects engine time, because each analysis is expensive.

### D-21 · Interface in Spanish and English
**Decision:** a language selector (Spanish and English) like the theme selector, with i18next and react-i18next. The API returns error codes that the frontend translates. Moves are shown in figurine notation, independent of the language.
**Alternative:** a single language.
**Reason:** the committee and most users are Spanish, while the repository is in English (D-16).

### D-22 · Ten bot levels
**Decision:** levels labelled 100, 500, 800, 1000, 1200, 1400, 1700, 2000, 2400 and Max. The two lowest choose random legal moves with a given probability; 800 to 1200 use Stockfish's `Skill Level`; 1400 to 2400 use `UCI_LimitStrength` and `UCI_Elo`; Max is full strength. Parameters are configurable and checked with matches between consecutive levels.
**Alternative:** eight levels starting at 800.
**Reason:** absolute beginners need opponents much weaker than `UCI_Elo` allows (its minimum is 1320).

### D-23 · Three separate ratings and calibration
**Decision:** bot rating, online rating and puzzle rating, all Elo with K = 32, never mixed. The bot rating is calibrated with three games chosen by binary search over [0, 3000]; estimates above 1500 are reduced by 15 % (never below 1500). The online rating starts from the bot rating.
**Alternative:** one rating for everything.
**Reason:** bots, people and puzzles measure different things; mixing them would distort matchmaking. Starting the online rating from the bot rating keeps the author's idea of using the bot result.

### D-24 · Analysis on the server
**Decision:** finished player games are analysed in the background on the server, with `chesslib` for the rules and a separate pool of engine processes, so playing is never slowed by analysis. Opening an unanalysed game analyses it at once.
**Alternative:** analysis in the browser with `chess.js`, only on demand.
**Reason:** the mistake bank and statistics need every game analysed, even when the user never opens the review.

### D-25 · Move classification
**Decision:** the categories of chess.com (Brilliant, Great, Best, Good, Book, Inaccuracy, Mistake, Miss, Blunder, with Excellent merged into Best), computed from expected points with the Lichess win-percentage formula, fixed thresholds and CheckMate's own rules for Brilliant, Great and Miss. Accuracy uses the Lichess move formula. Each position is searched with `MultiPV 2`.
**Alternatives:** only inaccuracy, mistake and blunder (Lichess); thresholds that depend on the rating (chess.com).
**Reason:** the author likes the chess.com categories for learning; fixed thresholds are simpler and easier to explain in the thesis. `MultiPV 2` lowers the search depth slightly for the same time, but it is needed to detect the only good move.

### D-26 · Mistake bank with spaced repetition
**Decision:** the player's Mistakes, Blunders and Misses in positions with one clear solution become exercises, practised with four boxes (1, 3, 7 and 21 days) until mastered.
**Alternative:** generic puzzles chosen by rating.
**Reason:** practising one's own mistakes is the most direct way to learn from them.

### D-27 · Online play by invitation
**Decision:** online games are created with a code or link; the creator chooses 1 to 10 minutes, 0 to 3 seconds of increment, colour, and rated or casual. The server is the referee (`chesslib`), keeps the clocks and talks to the browsers over WebSocket with STOMP. Matchmaking by rating is Could.
**Alternatives:** a matchmaking queue from the start; the client deciding the results.
**Reason:** invitations deliver online play with much less complexity; between people the server cannot trust the clients.

### D-28 · Busy engine pool
**Decision:** when every process of a pool is busy, a request waits up to 5 s for one and then answers 503.
**Alternative:** answer 503 at once.
**Reason:** with a pool of one process, two users moving at the same moment is normal and should not fail.

### D-29 · Deployment
**Decision:** the frontend goes to Vercel with the author's domain in Cloudflare. The backend and the database are deployed when the demo needs them; the host is chosen then, with Render plus Neon as first candidate, and with at least 1 CPU and 2 GB of RAM. The backend image carries two Stockfish builds and picks one by detecting AVX2 at start-up.
**Alternatives:** a VPS with Docker Compose; Render's free tier.
**Reason:** development is local with Docker; the free tier of Render sleeps after 15 minutes and has 512 MB, which breaks online games and is too small for the engines, so the choice is made with real measurements when it matters.

### D-30 · Database migrations with Flyway
**Decision:** the schema is created and changed only with versioned Flyway migrations; Hibernate only validates it.
**Alternative:** schema generated by Hibernate.
**Reason:** versioned SQL documents the schema for the thesis and avoids surprises with existing data.

### D-31 · Test tools
**Decision:** Vitest for frontend logic; JUnit 5, Spring Boot Test and Testcontainers (PostgreSQL) for the backend; a fake UCI engine for most engine tests and tests tagged `stockfish` for the real one.
**Alternative:** manual testing only.
**Reason:** agents need fast, reliable checks to prove their work before the author reviews it.

### D-32 · Continuous integration with direct commits to main
**Decision:** a GitHub Actions workflow runs lint, build and tests on every push. Commits keep going directly to `main` (D-10); the agents run the same checks locally before finishing, and CI is the safety net.
**Alternative:** pull requests with required checks.
**Reason:** a single author gains nothing from pull requests, and local checks by the agents catch problems before the commit.

### D-33 · Player games on the server
**Decision:** player games against bots live on the server, which validates every move and saves after each one; guest games are kept only in the browser.
**Alternative:** all games kept in the browser and saved at the end.
**Reason:** saving after every move gives games in progress for free and the same validation as online games; guests need nothing stored.

### D-34 · Authentication with JWT
**Decision:** HS256 tokens issued and checked with Spring Security's resource-server support, valid for 24 hours, kept by the frontend in `localStorage` and sent as a bearer token. No refresh tokens.
**Alternatives:** an external JWT library; HTTP-only cookies.
**Reason:** no extra dependency, and a bearer token works when frontend and backend are on different domains (Vercel and another host).

### D-35 · Show mode driven by the browser
**Decision:** the browser keeps the Show game, asks the backend for each engine move and plays it after a delay. No server state and no WebSockets.
**Alternative:** the server plays the game and streams it.
**Reason:** each engine already decides its move through the normal endpoint, so the browser can drive the game; WebSockets stay only where they are needed (online play).

### D-36 · Design with Google Stitch
**Decision:** a `design` agent writes Stitch prompts from the screens in the requirements; the author generates and chooses the screens in Stitch; the `frontend` agent turns the result into Tailwind tokens and base components. Charts use Recharts.
**Alternative:** design directly in code.
**Reason:** the author can compare visual options before any screen is built.

### D-37 · Chess data sources
**Decision:** the Lichess `chess-openings` dataset (CC0) for opening names and book moves; a filtered subset of the Lichess puzzle database (CC0) if puzzles are built.
**Alternative:** building an own opening list.
**Reason:** both are free, complete and compatible with GPL v3.

### D-38 · Priorities and plan
**Decision:** Must: infrastructure and CI, accounts, play against the bot, ratings, analysis, review, trainer, mistake bank, online play by invitation. Should: statistics, games in progress, Show mode, custom engine. Could: engine improvements and tooling, matchmaking, puzzles, endgames, openings. If time runs short, Could goes first, then games in progress, Show mode and statistics, and the custom engine last. No calendar; progress is reviewed at each item.
**Alternative:** the previous priorities, with online play out of scope and Show mode as Could.
**Reason:** online play gained priority for the author; Show mode is wanted before the custom engine to have a working engine comparison; infrastructure and tests go first so every module has tests from the start.
