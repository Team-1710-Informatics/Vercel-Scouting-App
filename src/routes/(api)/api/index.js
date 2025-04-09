export default {
    desc: 'all scouting entries come in the structure of this schema.',
    ex:
`
{
    event: { type: String, match: /(\\d{4})\\w+/ },
    match: Number,
    alliance: { type: String, match: /red|blue/ },
    team: Number,
    scout: String,
    pregame: {
        startPosition: { x: Number, y: Number },
        preload: Boolean,
    },
    start: Number,
    actions: Array,
    climb: {
        time: Number,
        type: { type: String, match: /shallow|deep|none/ },
        fails: Number,
    },
    untimed: {
        exitAuto: Boolean,
        buddyClimb: Number,
        parkMatch: Boolean,
    },
    postgame: {
        strategy: Array,
        rating: { type: Number, min: 0, max: 10 },
        climbStability: { type: Number, min: 0, max: 10 },
        driverSkill: { type: Number, min: 0, max: 10 },
        speed: { type: Number, min: 0, max: 10 },
        thoughts: String,
    }
}
`,
}
