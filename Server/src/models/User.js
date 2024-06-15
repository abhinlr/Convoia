import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: true
    },
    username: {
        type: String
    }
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'phoneNumber' });

export default mongoose.model("User", UserSchema);