# Roadmap

Copy of the work plan in execution order. The live reference is the project's control panel; this file is updated when each phase closes.

**Execution note:** the development Dockerfiles (item 2) need the frontend and backend projects to exist, so they are done after items 3 and 4. The folder structure part of item 2 is covered when the repository is created.

## Initial phase: technical spike, no login or database

- [ ] 1. Create the GitHub repo: GPLv3 license, `.gitignore`, README, `docs/`
- [ ] 2. Folder structure + development Dockerfiles + `docker-compose.yml` (frontend and backend only)
- [ ] 3. Frontend base project: Vite + React + Tailwind
- [ ] 4. Backend base project: Spring Initializr with Spring Web only
- [ ] 5. Compile Stockfish inside the backend Dockerfile
- [ ] 6. Test endpoint: receives a FEN or move, talks to Stockfish over UCI, returns `bestmove` as JSON
- [ ] 7. Board in the frontend (`react-chessboard` + `chess.js`) connected to the endpoint
- [ ] 8. **Phase closing criterion:** a full game against Stockfish from the browser, started with `docker compose up`

## Phase 1: design

- [ ] 9. UI/UX design: wireframes of the key screens and a base design system
- [ ] 10. Database design (PostgreSQL is added to `docker-compose.yml`)
- [ ] 11. Full specification of the features
- [ ] 12. Validate the data source for opening and endgame puzzles (for example, Lichess)

## Main application: core

Each feature is built end to end (entity, endpoint, screen) before moving on to the next.

- [ ] 13. Login and authentication (Spring Security + JWT)
- [ ] 14. Play against the bot (Stockfish, levels with `UCI_LimitStrength` / `UCI_Elo`)
- [ ] 15. Trainer mode
- [ ] 16. Games in progress (save and resume)
- [ ] 17. Review mode
- [ ] 18. User statistics dashboard
- [ ] 19. End-to-end testing and core polish

## Main application: extensions

- [ ] 20. Typical puzzles by user Elo
- [ ] 21. Learn endgames and endgame puzzles
- [ ] 22. Learn openings and opening puzzles
- [ ] 23. Show / Exhibition mode (WebSockets)

## Custom engine

- [ ] 24. Board representation
- [ ] 25. Move generator
- [ ] 26. Perft
- [ ] 27. Evaluation heuristic
- [ ] 28. Minimax and alpha-beta
- [ ] 29. Integrate the custom engine into the app (play against it and add it to Show mode)
- [ ] 30. Move ordering in alpha-beta
- [ ] 31. Quiescence search
- [ ] 32. Transposition tables
- [ ] 33. Null move pruning

## Priorities

If time runs short, cut from the bottom up. Anything not started becomes "future work" in the thesis.

| # | Priority |
|---|---|
| 1 | Database and login |
| 2 | Play against the bot (Stockfish) |
| 3 | Trainer mode |
| 4 | Review mode |
| 5 | Infrastructure (Docker, repo, CI): do it early, not at the end |
| 6 | Games in progress |
| 7 | Statistics dashboard |
| 8 | Custom engine, minimum version (representation, generator, perft, minimax and alpha-beta) |
| 9 | Endgames and endgame puzzles |
| 10 | Openings and opening puzzles |
| 11 | Puzzles by Elo |
| 12 | Show / Exhibition mode |
| 13 | Advanced engine improvements (move ordering, quiescence, transposition tables, null move) |
