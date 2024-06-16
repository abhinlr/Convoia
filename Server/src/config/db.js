const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = function () {
    mongoose.connect(process.env.MONGO_URI, {}).then(r => {
        logger.info('MongoDB connected');
    }).catch((err)=>{
        logger.error(err);
        process.exit(1);
    });
}