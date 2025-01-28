import express from "express";
import http from "http";
import { join } from "path";
import { Server } from 'socket.io';
import { startState } from "./utils/start-state";
import { checkWin } from "./utils/check-win";
import { State } from "./interfaces/state.interface";

const runApp = () => {
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server);
    let game: State = {
        ...startState,
        board: [...startState.board]
    };

    // Serve static file
    app.get('/', (req, res) => {
        res.sendFile(join(__dirname, '../public/index.html'));
    });

    io.on("connection", (socket) => {
        socket.emit('updateState', game);

        socket.on('move', (index: number) => {
            if (game.winner || game.board[index]) return;

            game.board[index] = game.currentPlayer;
            game.winner = checkWin(game.board);

            if (!game.winner) {
                game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';
            }

            io.emit('updateState', game);
        });

        socket.on('newGame', () => {
            game = {
                ...startState,
                board: [...startState.board]
            };
            io.emit('updateState', game);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    })

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Running on port ${PORT}`);
    });
}

export { runApp };