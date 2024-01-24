import mongoose from 'mongoose';
import UserModel from './user';
import { StoreModel, ReceiptModel } from './credit-store';

const { Schema } = mongoose;

mongoose.set('strictQuery', true);

export const User = UserModel;
export const StoreItem = StoreModel;
export const Receipt = ReceiptModel;

const team = new Schema({
    number: Number,
    authkey: String
});

export const Team = mongoose.model("team", team);

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
            parked: Boolean,
            supercharged: Boolean
        }
    },
    postgame:{
        strategy:Array,
        rating: {type: Number, min: 0, max: 10},
        driverSkill: {type: Number, min: 0, max: 10},
        thoughts: String
    }
},{
    virtuals:{
        placements:{
            get(){
                let med = this.game.actions.filter((i)=>{
                    return i.action === "place";
                });
                return med.length;
            }
        }
    },
    toJSON: { virtuals: true }
});

scoutEntry2023.methods.getIndividualScore=function(){
    let score=0;
    this.game.actions.forEach(action=>{
        if(action.type=="place"){
            if((action.time - this.game?.start??0) < 18){
                switch(action.node.y){
                    case 0: score += 6; break;
                    case 1: score += 4; break;
                    case 2: score += 3; break;
                }
            }else{
                switch(action.node.y){
                    case 0: score += 5; break;
                    case 1: score += 3; break;
                    case 2: score += 2; break;
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
    }else if(this.game.untimed.parked) score += 2;

    return score;
};

export const oldScoutData = mongoose.model("2023entry", scoutEntry2023);

const scoutEntry2024 = new Schema({
    event: {type: String, match:/(\d{4})\w+/},
    match: Number,
    alliance: {type: String, match:/red|blue/},
    team: Number,
    scout: String,
    submission: Number,
    pregame: {
        start: {x:Number,y:Number},
        preload: Boolean
    },
    game:{
        actions: Array,
        untimed: {
            exitAuto: Boolean,
            hangMatch: Boolean,
            parkMatch: Boolean,
            harmony: Boolean,
            spotlight: Boolean
        }
    },
    postgame:{
        strategy:Array,
        rating: {type: Number, min: 0, max: 10},
        driverSkill: {type: Number, min: 0, max: 10},
        defenseSkill: {type: Number, min: 0, max: 10},
        speed: {type: Number, min: 0, max: 10},
        thoughts: String
    }
});

export const ScoutData = mongoose.model("2024entry", scoutEntry2024);

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

const pitscout2023 = new Schema({
    event: String,
    team: Number,
    scout: String,
    intakeCube: String,
    intakeCone: String,
    shelfStation: String,
    chuteStation: String,
    floorStation: String,
    floor: String,
    placeHigh: String,
    placeMid: String,
    placeLow: String,
    mainStrategy: String,
    autoStrategy: String,
    averageScore: String,
    topSpeed: String,
    defenseCapability: String,
    defenseExperience: String,
    chargeStationMain: String,
    chargeStationAuto: String,
    drivetrain: String,
    piecePreferance: String,
    framePerimeter: String,
    weight: String,
    thoughts: String,
    otherScouts: String
});

export const pitdata2023 = mongoose.model("2023pitdata", pitscout2023);

const ticket = new Schema({
    user:String,
    match:String,
    amount:Number,
    alliance:String,
    timestamp:Number,
    resolved:Boolean
});

export const ScambleTicket = mongoose.model("ticket",ticket);

const portfolio = new Schema({
    user:String,
    portfolio:{},
    times:{}
});

export const Portfolio = mongoose.model("portfolio",portfolio);