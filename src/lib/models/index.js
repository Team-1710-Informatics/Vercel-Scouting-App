import mongoose from 'mongoose';
const { Schema } = mongoose;

// mongoose.set('strictQuery', false);

const user = new Schema({
    username: String,
    email: String,
    name: {
        first: String,
        last: String
    },
    password: {
        hash: String,
        salt: String
    },
    credits: Number,
    team: Number,
    stats: {},
    preferences: {},
    permissions: [],
    flags: {},
    token: String
})

export const User = mongoose.model("User", user);