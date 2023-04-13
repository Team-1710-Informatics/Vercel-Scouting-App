import mongoose from 'mongoose';
const { Schema } = mongoose;

const user = new Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    name: {
        type: {
            first: String,
            last: String
        },
        required:true
    },
    password:{
        type: {
            hash: String,
            salt: String
        },
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    team: {
        type: Number,
        required: true
    },
    stats: {},
    preferences: {},
    permissions: [],
    flags: {},
    token: String,
    status: String,
});

export default mongoose.model("User", user);