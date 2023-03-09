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
    token: String,
    status: String,
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
        start:Number,
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

scoutEntry2023.methods.getIndividualScore=function(){
    let score=0;
    this.game.actions.forEach(action=>{
        if(action.type=="place"){
            if((action.time - this.game?.start??0) < 18){
                switch(action.node.y){
                    case 0: score += 6;
                    case 1: score += 4;
                    case 2: score += 3;
                }
            }else{
                switch(action.node.y){
                    case 0: score += 5;
                    case 1: score += 3;
                    case 2: score += 2;
                }
            }
        }
    })
    if(this.game.untimed.mobile) score += 3;
    if(this.game.untimed.dockedAuto){
        score += 8;
        if(this.game.untimed.engageAuto) score += 4;
    }
    if(this.game.untimed.dockedMatch){
        score += 6
        if(this.game.untimed.engageMatch) score += 4;
    }
    else if(this.game.untimed.parked) score += 2;

    return score;
};

export const ScoutData = mongoose.model("2023entry", scoutEntry2023);


const transaction = new Schema({
    user:String,
    amount:Number,
    reason:String,
    time:Number
});

export const Transaction = mongoose.model("Transaction", transaction);

const scheduleItem = new Schema({ 
    //event: {type: String, match:/(\d{4})\w+/},
    name: String,
    time:{
        start:Number,
        end:Number
    },
    users: Array,
    notes: String 
})

scheduleItem.methods.getIndividualStatus=function(username){
    for (const user in this.users) {
        if(this.users[user] === username) {
            return(true);
        }
    }
    return(false);
}

export const Schedule = mongoose.model("Schedule", scheduleItem);

