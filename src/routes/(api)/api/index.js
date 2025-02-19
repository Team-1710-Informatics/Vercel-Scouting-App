export default {
    desc: 'all scouting entries come in the structure of this schema.',
    ex: `{
        event:String,
        match: Number,
        alliance: String(red|blue),
        team: Number,
        scout: String,
        pregame: {
            start: {x:Number,y:Number},
            preload:String(cube|cone|none)
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
        }
    }`,
}
