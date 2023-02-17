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
});

export const User = mongoose.model("User", user);

const scoutEntry2023 = new Schema({
    event: {type: String, match:/(\d{4})\w+/},
    match: Number,
    alliance: {type: String, match:/red|blue/},
    team: Number,
    scout: String,
    pregame: {
        start: {x:Number,y:Number},
        preload: {type:String, match:/cube|cone|none/}
    },
    game:{
        actions: Array,
        
    }
})