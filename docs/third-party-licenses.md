# Third-party licenses

Third-party software and data used by the project, with their license. A row is added whenever a new piece is incorporated, with the license checked in its repository or official page.

| Component | Use | License | How it is integrated |
|---|---|---|---|
| [Stockfish](https://github.com/official-stockfish/Stockfish) | Chess engine to play against | GPL v3 | External process over UCI, compiled from the official source in the Dockerfile. Its code is not copied into the repository |

## To be checked

License to confirm when they are incorporated:

- `react-chessboard` (board)
- `chess.js` (client-side rules)
- Opening and endgame puzzle database (roadmap item 12)
- The remaining frontend and backend dependencies

## Note on the GPL

The CheckMate repository is GPL v3 (see [decisions.md](decisions.md), D-10), consistent with shipping Stockfish. This is not legal advice.
