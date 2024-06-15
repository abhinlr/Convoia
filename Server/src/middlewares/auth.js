const isLoggedIn = (req, res, next) => {
    console.log(123,(req.user));
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(200).json({ success:false,message: 'Unauthorized' });
};

export default isLoggedIn;