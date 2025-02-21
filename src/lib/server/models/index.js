import mongoose from 'mongoose'
import UserModel from './user'
import { StoreModel, ReceiptModel } from './credit-store'

const { Schema } = mongoose

mongoose.set('strictQuery', true)

export const User = UserModel
export const StoreItem = StoreModel
export const Receipt = ReceiptModel

const team = new Schema({
    number: Number,
    authkey: String,
})

export const Team = mongoose.model('team', team)

const scoutEntry2023 = new Schema(
    {
        event: { type: String, match: /(\d{4})\w+/ },
        match: Number,
        alliance: { type: String, match: /red|blue/ },
        team: Number,
        scout: String,
        pregame: {
            start: { x: Number, y: Number },
            preload: { type: String, match: /cube|cone|none/ },
        },
        game: {
            start: Number,
            actions: Array,
            untimed: {
                mobile: Boolean,
                dockedAuto: Boolean,
                engageAuto: Boolean,
                dockedMatch: Boolean,
                engageMatch: Boolean,
                parked: Boolean,
                supercharged: Boolean,
            },
        },
        postgame: {
            strategy: Array,
            rating: { type: Number, min: 0, max: 10 },
            driverSkill: { type: Number, min: 0, max: 10 },
            thoughts: String,
        },
    },
    {
        virtuals: {
            placements: {
                get() {
                    let med = this.game.actions.filter((i) => {
                        return i.action === 'place'
                    })
                    return med.length
                },
            },
        },
        toJSON: { virtuals: true },
    }
)

scoutEntry2023.methods.getIndividualScore = function () {
    let score = 0
    this.game.actions.forEach((action) => {
        if (action.type == 'place') {
            if ((action.time - this.game?.start ?? 0) < 18) {
                switch (action.node.y) {
                    case 0:
                        score += 6
                        break
                    case 1:
                        score += 4
                        break
                    case 2:
                        score += 3
                        break
                }
            } else {
                switch (action.node.y) {
                    case 0:
                        score += 5
                        break
                    case 1:
                        score += 3
                        break
                    case 2:
                        score += 2
                        break
                }
            }
        }
    })
    if (this.game.untimed.mobile) score += 3
    if (this.game.untimed.dockedAuto) {
        score += 8
        if (this.game.untimed.engageAuto) score += 4
    }
    if (this.game.untimed.dockedMatch) {
        score += 6
        if (this.game.untimed.engageMatch) score += 4
    } else if (this.game.untimed.parked) score += 2

    return score
}

export const oldScoutData = mongoose.model('2023entry', scoutEntry2023)

const scoutEntry2024 = new Schema({
    event: { type: String, match: /(\d{4})\w+/ },
    match: Number,
    alliance: { type: String, match: /red|blue/ },
    team: Number,
    scout: String,
    pregame: {
        startPosition: { x: Number, y: Number },
        preload: Boolean,
    },
    game: {
        start: Number,
        actions: Array,
        untimed: {
            exitAuto: Boolean,
            hangMatch: Boolean,
            parkMatch: Boolean,
            harmony: Number,
            spotlight: Boolean,
            spotlightAttempt: Boolean,
        },
    },
    postgame: {
        strategy: Array,
        rating: { type: Number, min: 0, max: 10 },
        driverSkill: { type: Number, min: 0, max: 10 },
        defenseSkill: { type: Number, min: 0, max: 10 },
        speed: { type: Number, min: 0, max: 10 },
        thoughts: String,
    },
})

const scoutEntry2025 = new Schema({
    event: { type: String, match: /(\d{4})\w+/ },
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
    climb: {},
    // untimed: {
    //     exitAuto: Boolean,
    //     hangMatch: Boolean,
    //     parkMatch: Boolean,
    //     cageLevel: String,
    // },
    postgame: {
        strategy: Array,
        rating: { type: Number, min: 0, max: 10 },
        climbStability: { type: Number, min: 0, max: 10 },
        driverSkill: { type: Number, min: 0, max: 10 },
        speed: { type: Number, min: 0, max: 10 },
        thoughts: String,
    },
})

export const ScoutData = mongoose.model('2025entry', scoutEntry2025)

const transaction = new Schema({
    user: String,
    amount: Number,
    reason: String,
    time: Number,
})

export const Transaction = mongoose.model('Transaction', transaction)

const scheduleItem = new Schema({
    //event: {type: String, match:/(\d{4})\w+/},
    name: String,
    time: {
        start: Number,
        end: Number,
    },
    users: Array,
    notes: String,
})

scheduleItem.methods.getIndividualStatus = function (username) {
    for (const user in this.users) {
        if (this.users[user] === username) {
            return true
        }
    }
    return false
}

export const Schedule = mongoose.model('Schedule', scheduleItem)

const schedule = new Schema({
    name: String,
    team: String,
    position: String,
    start: Number,
    end: Number,
    releasing: Boolean,
    dayId: Number,
    leadId: Number,
    id: Number,
})

export const schedulePositions = mongoose.model('schedules', schedule)

const scheduledays = new Schema({
    name: String,
    year: String,
    month: String,
    day: String,
    timezone: String,
    id: Number,
})

export const scheduleDays = mongoose.model('scheduledays', scheduledays)

const pitschedule = new Schema({
    name: String,
    position: String,
    start: {
        half: Boolean,
        time: Number,
    },
    end: {
        half: Boolean,
        time: Number,
    },
    dayId: Number,
    leadId: Number,
    id: Number,
})

export const pitSchedulePositions = mongoose.model('pitschedules', pitschedule)

const pitscheduledays = new Schema({
    name: String,
    id: Number,
})

export const pitScheduleDays = mongoose.model(
    'pitscheduledays',
    pitscheduledays
)

const reason = new Schema({
    name: String,
    leadId: Number,
    id: Number,
    day: String,
    start: Number,
    end: Number,
    reason: String,
})

export const releaseReason = mongoose.model('releases', reason)

const button = new Schema({
    id: Number,
    name: String,
    link: String,
    width: Number,
    order: Number,
    bMargin: Number,
    disabled: Boolean,
    team: Boolean,
})

export const buttonConfig = mongoose.model('buttons', button)

const pitscout2025 = new Schema({
    team: Number,
    event: String,
    scout: String,
    otherScouts: String,
    length: Number,
    width: Number,
    weight: Number,
    driveTrain: String,
    swerveType: String,
    otherDriveTrain: String,
    swerveRatio: String,
    motorType: String,
    otherMotorType: String,
    language: String,
    autoSoftware: String,
    autoLogger: String,
    cageClimbable: [],
    buddyClimb: Boolean,
    floorIntake: Boolean,
    firstCoralLocation: Object,
    autoStartingPos: [],
    controlPieces: Boolean,
    intakeAreas: [],
    scoreAreas: [],
    framePerimeter: Boolean,
    bargeNetPractice: Boolean,
    driverPractice: Boolean,
    needHelp: String,
    notes: String,
    imageLink: String,
})

export const pitdata2025 = mongoose.model('2025pitdata', pitscout2025)

const pitscout2024 = new Schema({
    team: Number,
    event: String,
    scout: String,
    otherScouts: String,
    length: Number,
    width: Number,
    bumperWidth: Number,
    height: Number,
    sizeUnit: String,
    weight: Number,
    weightUnit: String,
    speed: Number,
    speedUnit: String,
    driveTrain: String,
    otherDriveTrain: String,
    intakeType: String,
    otherIntake: String,
    shooterType: String,
    wheelType: String,
    otherShooter: String,
    speakerScore: Boolean,
    ampScore: Boolean,
    trapScore: Boolean,
    shootingDistance: Number,
    distanceUnit: String,
    climbingAbility: String,
    maxAutoScore: Number,
    autoStrategy: String,
    buddyClimb: Boolean,
    scorePreference: String,
    scoringAbility: String,
    ampUse: String,
    intakeLocation: String,
    notes: String,
    spotlight: String,
    autoSoftware: String,
})

export const pitdata2024 = mongoose.model('2024pitdata', pitscout2024)

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
    otherScouts: String,
})

export const pitdata2023 = mongoose.model('2023pitdata', pitscout2023)

const ticket = new Schema({
    user: String,
    match: String,
    amount: Number,
    alliance: String,
    timestamp: Number,
    resolved: Boolean,
})

export const ScambleTicket = mongoose.model('ticket', ticket)

const portfolio = new Schema({
    user: String,
    portfolio: {},
    times: {},
})

export const Portfolio = mongoose.model('portfolio', portfolio)

const teamSelections = new Schema({
    match: String,
    teams: [],
})

export const TeamSelections = mongoose.model('teamSelections', teamSelections)
