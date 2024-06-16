const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Redis = require('ioredis');

const logger = require('./src/config/logger');
const db = require('./src/config/db');
const cache = require('./src/config/cache');

const app = express();
const port = process.env.PORT || 3000;

db();
cache();

const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});



app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
})