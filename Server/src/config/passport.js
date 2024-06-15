// import dependencies
import { Strategy as LocalStrategy } from 'passport-local';
import { getRedisClient } from './cache.js';
import User from '../models/User.js';
import logger from '../utils/logger.js';

// initialize function to set up passport
const initialize = (passport) => {
    console.log(passport);
    // Function to authenticate user
    const authenticateUser = async (phoneNumber, otp, done) => {
        try {
            // Find or create user based on phoneNumber
            let user = await User.findOne({ phoneNumber });

            if (!user) {
                user = new User({ phoneNumber });
                await user.save();
            }

            // Get Redis client and check OTP
            const redisClient = getRedisClient();
            const savedOtp = await redisClient.get(phoneNumber);

            if (savedOtp !== otp) {
                return done(null, false, { message: 'Invalid OTP' });
            }

            // Authentication successful, pass user to passport
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    };

    // Configure passport to use LocalStrategy
    passport.use(new LocalStrategy({ usernameField: 'phoneNumber', passwordField: 'otp' }, authenticateUser));

    // Serialize user for session storage
    passport.serializeUser((user, done) => {
        if (!user) {
            return done(new Error('User is not defined'), null);
        }
        logger.info(`User ${user._id} serialized`);
        done(null, user._id);
    });

    // Deserialize user from session storage
    passport.deserializeUser(async (id, done) => {
        logger.info('DeserializeUser id:', id);
        try {
            const user = await User.findById(id);
            if (!user) {
                return done(new Error('User not found'), null);
            }
            logger.info('DeserializeUser user:', user);
            done(null, user);
        } catch (err) {
            logger.error('DeserializeUser error:', err);
            done(err, null);
        }
    });
};

export default initialize;