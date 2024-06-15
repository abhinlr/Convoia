import express from "express";
import authController from "../controllers/authController.js";
import isLoggedIn from "../middlewares/auth.js";
import logger from "../utils/logger.js";
import passport from "passport";

const router = express.Router();

router.post('/generate-otp', function (req,res){
    const {phoneNumber} = req.body;
    authController.generateOtp(phoneNumber).then((response) => {
        return res.status(200).json({response,success:true});
    }).catch((error) => {
        return res.status(500).json({error,success:false});
    });
});

router.post('/verify-otp', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'An error occurred during authentication.' });
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'An error occurred during login.' });
            }
            return res.status(200).json({ success: true, user });
        });
    })(req, res, next);
});

router.get('/profile', function (req, res) {
    return res.status(200).json({ user: req.user });
});

router.get('/logout', isLoggedIn, function (req, res) {
    req.logOut();
    return res.status(200).json({ message: 'Logged out successfully' });
});

export default router;