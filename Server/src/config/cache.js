import redis from 'redis';

import logger from "../utils/logger.js";

let redisClient;
let {REDIS_HOST:host,REDIS_PORT:port,REDIS_PASS:password} = process.env;
port = Number(port);

export async function initializeRedisClient() {
    if (host && port && password) {
        redisClient = redis.createClient({ password, socket:{ host, port} }).on("error", (e) => {
            logger.error(`Failed to create the Redis client with error:${e}`);
        });
        try {
            await redisClient.connect();
            logger.info(`Connected to Redis successfully!`);
        } catch (e) {
            logger.error(`Connection to Redis failed with error:${e}`);
        }
    }
}

export function getRedisClient() {
    if (!redisClient) {
        throw new Error('Redis client has not been initialized.');
    }
    return redisClient;
}
export default {initializeRedisClient,getRedisClient};