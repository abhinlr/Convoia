const Redis = require('ioredis');
const logger = require('./logger');

module.exports = function () {
    const redis = new Redis({
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD || undefined,
        db: process.env.REDIS_DB || 0});

    redis.on('connect', () => {
        logger.info('Redis connected');
    });

    redis.on('error', (err) => {
        logger.error('Redis connection error:', err);
        process.exit(1);
    });

    redis.on('end', () => {
        logger.info('Redis disconnected');
    });
    return redis;
};