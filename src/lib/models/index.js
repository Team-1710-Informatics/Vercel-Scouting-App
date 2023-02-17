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
        untimed: {
            mobile: Boolean,
            dockedAuto: Boolean,
            engageAuto: Boolean,
            dockedMatch: Boolean,
            engageMatch: Boolean,
            parked: Boolean
        }
    },
    postgame:{
        strategy:Array,
        rating: {type: Number, min: 0, max: 10},
        thoughts: String
    }
})

export const ScoutData = mongoose.model("2023entry", scoutEntry2023);