# CheckMate

Your companion to learn and improve at chess.

CheckMate is a web application where you play against bots of every strength, get live help while you play, review your games move by move, turn your own mistakes into exercises and play your friends online. The name joins *check*, *checkmate* and *mate* in the sense of "companion".

> Final Degree Project (TFG), Software Engineering.
> University: UCM · Year: 4th · Supervisor: José Alberto Verdejo López

## Status

Under development, **initial phase**: checking end to end that the browser, the backend and Stockfish talk to each other. The plan and its progress are in [docs/requirements.md](docs/requirements.md#16-implementation-plan).

## Features

- Ten bot levels, from absolute beginner to full Stockfish, with or without an account.
- Trainer mode: best move, threats, attacks, checks and captures while you play.
- Review mode: evaluation and classification of every move (Brilliant to Blunder).
- Mistake bank: your own mistakes come back as exercises until you master them.
- Online games against friends with an invitation code and a clock.
- Ratings, statistics and recommendations about what to practise.
- Show mode: two engines play each other.
- A chess engine written from scratch in C++.
- Interface in Spanish and English, light and dark themes, several boards and piece sets.

## Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS, react-chessboard, chess.js |
| Backend | Java 21, Spring Boot (Security with JWT, Data JPA, WebSocket), chesslib |
| Database | PostgreSQL with Flyway |
| Engines | Stockfish and a custom C++ engine, both as external processes over UCI |
| Infrastructure | Docker Compose, GitHub Actions |

## Running the project

```bash
docker compose up
```

_Available once the initial phase is complete._

## Documentation

- [Requirements](docs/requirements.md): the single source of truth (features, API, data model, stack, plan).
- [Decisions](docs/decisions.md): why each technical choice was made.
- [Development log](docs/devlog.md): what happened in each work session.
- [AGENTS.md](AGENTS.md): rules for the AI agents that help build the project.

## Credits

Opening names come from the [Lichess chess-openings](https://github.com/lichess-org/chess-openings) dataset (CC0). Piece sets come from the [Lichess lila](https://github.com/lichess-org/lila) repository: cburnett (Colin M.L. Burnett, GPLv2+), merida (Armando Hernandez Marroquin, GPLv2+), chessnut (Alexis Luengas, Apache 2.0), fantasy and celtic (Maurizio Monge, MIT) and rhosgfx (RhosGFX, CC0).

## License

[GNU GPL v3.0](LICENSE). Stockfish, which runs as an external process, is also GPL v3. Third-party licences are listed in [the requirements](docs/requirements.md#115-dependencies-and-licences).
