import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { Server as SocketIOServer } from 'socket.io';

import logger from "./utils/logger.js";

const app = express();

const db = process.env.DB;
mongoose.connect(db)
    .then(() => logger.info('MongoDB connected'))
    .catch(err => logger.error('MongoDB connection error:', err));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;