import express from 'express';
import cors from 'cors';
import http from 'http'; // Import http module
import { Server as SocketIOServer } from 'socket.io';
import logger from './utils/logger.js';

import app from './app.js';

const port = process.env.PORT || 3000;
app.set('port', port);

const server = express();

server.use(app);
server.use(cors({
    origin: 'http://localhost:4200'
}));

const httpServer = http.createServer(server); // Create HTTP server
const io = new SocketIOServer(httpServer); // Create Socket.IO server

io.on('connection', (socket) => {
    logger.info('A user connected');

    socket.on('disconnect', () => {
        logger.info('User disconnected');
    });

    // Handle chat messages
    socket.on('chat message', (msg) => {
        logger.info('message: ' + msg);
        io.emit('chat message', msg); // Broadcast the message to all connected clients
    });
});

httpServer.listen(port, () => logger.info(`Server listening on port ${port}`));