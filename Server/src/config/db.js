import mongoose from 'mongoose';

const db = process.env.DB;

async function connectDB(req, res, next) {
    try {
        await mongoose.connect(db);
    } catch (err) {
        process.exit(1);
    }
}

export default connectDB;