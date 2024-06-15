import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import connectRedis from 'connect-redis';
import initialize from './config/passport.js';
import connectDB from "./config/db.js";
import {initializeRedisClient,getRedisClient} from "./config/cache.js";
import logger from "./utils/logger.js";

import authRoute from "./routes/auth.js";

const app = express();
initializeRedisClient().catch(err => logger.error(`Redis initialization error:${err}`));
connectDB().then(() => logger.info('MongoDB connected')).catch(err => logger.error(`MongoDB connection error: ${err}`));

app.use(session({
    store: new connectRedis({client: getRedisClient()}),
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
});

initialize(passport);

app.use(authRoute);

export default app;