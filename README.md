# CheckMate

Your companion to learn and improve at chess.

CheckMate is a web application where you play against bots, get live help while you play (trainer mode), review your games afterwards (review mode) and practise openings, endgames and puzzles. The name joins *check*, *checkmate* and *mate* in the sense of "companion".

> Final Degree Project (TFG), Software Engineering.
> University: UCM · Year: 4th · Supervisor: José Alberto Verdejo López

## Status

Under development, **initial phase**: checking end to end that the browser, the backend and Stockfish talk to each other. Detailed progress is in [docs/roadmap.md](docs/roadmap.md).

## Planned features

- Games against Stockfish with difficulty levels.
- Trainer mode: live help (best move, threats, attacks, checks, captures).
- Review mode: evaluation of a whole game and of each move, from your own game or a PGN file.
- Games in progress: save and resume.
- User statistics dashboard.
- Learn openings and endgames, with puzzles.
- Show mode: bots playing against each other.
- Custom chess engine in C++ (final phase).

## Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind, `react-chessboard` + `chess.js` |
| Backend | Spring Boot (Spring Security + JWT, JPA/Hibernate) |
| Database | PostgreSQL |
| Chess engine | Stockfish and a custom C++ engine, both as external processes over the UCI protocol |
| Deployment | Docker + Docker Compose |

## Structure

```
checkmate/
├── frontend/   # React + Vite + Tailwind
├── backend/    # Spring Boot
├── engine/     # custom C++ engine (later phase)
├── docs/       # roadmap, architecture, decisions, devlog
└── README.md
```

## Running the project

```bash
docker compose up
```

_Available once the initial phase is complete._

## Documentation

- [Roadmap and priorities](docs/roadmap.md)
- [Architecture](docs/architecture.md)
- [Technical decisions](docs/decisions.md)
- [Use of artificial intelligence](docs/ai-usage.md)
- [Third-party licenses](docs/third-party-licenses.md)
- [Development log](docs/devlog.md)

## License

[GNU GPL v3.0](LICENSE). Stockfish, which runs as an external process, is also GPL v3; see [docs/third-party-licenses.md](docs/third-party-licenses.md).
