const winston = require('winston');
const colors = require('colors');

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
    let colorFunc;

    switch (level) {
        case 'error':
            colorFunc = colors.red;
            break;
        case 'warn':
            colorFunc = colors.yellow;
            break;
        case 'info':
            colorFunc = colors.blue;
            break;
        case 'http':
            colorFunc = colors.magenta;
            break;
        case 'verbose':
            colorFunc = colors.cyan;
            break;
        case 'debug':
            colorFunc = colors.green;
            break;
        case 'silly':
            colorFunc = colors.gray;
            break;
        default:
            colorFunc = colors.white;
            break;
    }

    return `${colors.gray(timestamp)} ${colorFunc(level)}: ${colorFunc(message)}`;
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        myFormat
    ),
    transports: [
        new winston.transports.Console()
    ],
});

module.exports = logger;
