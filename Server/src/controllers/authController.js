import otpGenerator from "otp-generator";
import {getRedisClient} from "../config/cache.js";
import logger from "../utils/logger.js";

async function generateOtp(phoneNumber) {

    const redisClient = getRedisClient();
    const expiryInSeconds = 300;

    const checkExistingOtp = await redisClient.get(phoneNumber);
    if (checkExistingOtp) {
        await redisClient.del(phoneNumber);
    }
    const otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    });
    try {
        const saveCache = await redisClient.set(phoneNumber, otp, {EX: expiryInSeconds});
        if (saveCache === 'OK') {
            logger.info(`OTP stored in cache for ${expiryInSeconds} seconds`);
            return phoneNumber;
        } else {
            new Error('Unable to store OTP in cache');
        }
    } catch (error) {
        throw error;
    }
}

export default {generateOtp};