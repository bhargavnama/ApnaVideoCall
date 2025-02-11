import mongoose, { model, Schema } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    token: {
        type: String,
    }
});

const User = new model("User", userSchema);

export { User };