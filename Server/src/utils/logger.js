import winston from 'winston';
import chalk from 'chalk';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
    let coloredLevel;
    switch (level) {
        case 'error':
            coloredLevel = chalk.red(capitalize(level));
            break;
        case 'warn':
            coloredLevel = chalk.yellow(capitalize(level));
            break;
        case 'info':
            coloredLevel = chalk.blue(capitalize(level));
            break;
        case 'debug':
            coloredLevel = chalk.green(capitalize(level));
            break;
        default:
            coloredLevel = capitalize(level);
            break;
    }
    return `${chalk.gray(timestamp)} ${coloredLevel}: ${message}`;
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
    ),
    transports: [new winston.transports.Console()],
});

export default logger;