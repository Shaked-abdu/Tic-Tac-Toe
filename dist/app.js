"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runApp = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = require("path");
const socket_io_1 = require("socket.io");
const start_state_1 = require("./utils/start-state");
const check_win_1 = require("./utils/check-win");
const runApp = () => {
    const app = (0, express_1.default)();
    const server = http_1.default.createServer(app);
    const io = new socket_io_1.Server(server);
    let game = {
        ...start_state_1.startState,
        board: [...start_state_1.startState.board]
    };
    // Serve static file
    app.get('/', (req, res) => {
        res.sendFile((0, path_1.join)(__dirname, '../public/index.html'));
    });
    io.on("connection", (socket) => {
        socket.emit('updateState', game);
        socket.on('move', (index) => {
            if (game.winner || game.board[index])
                return;
            game.board[index] = game.currentPlayer;
            game.winner = (0, check_win_1.checkWin)(game.board);
            if (!game.winner) {
                game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';
            }
            io.emit('updateState', game);
        });
        socket.on('newGame', () => {
            game = {
                ...start_state_1.startState,
                board: [...start_state_1.startState.board]
            };
            io.emit('updateState', game);
        });
        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Running on port ${PORT}`);
    });
};
exports.runApp = runApp;
