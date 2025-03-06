export default {
    TeamNumber(team: number, data: any[]) {
        return team
    },
    AverageScore(team: number, data: any[]) {
        let count = 0
        let score = 0
        data.forEach((matchData) => {
            if (matchData.team != team) return
            score += teamScore(matchData)
            count++
        })
        return score / count
    },
    MaxScore(team: number, data: any[]) {
        let scores: number[] = []
        data.forEach((matchData) => {
            if (matchData.team != team) return
            scores.push(teamScore(matchData))
        })
        return Math.max(...scores)
    },
    AutoMobilityRate(team: number, data: any[]) {
        let count = 0
        let mobileCount = 0
        data.forEach((e) => {
            if (e.team != team) return
            try {
                if (e.untimed.exitAuto) mobileCount++
            } catch (e) {}
            count++
        })
        return mobileCount / count
    },
    DriverSkill(team: number, data: any[]) {
        let count = 0
        let total = 0
        data.forEach((e) => {
            if (e.team != team) return
            if (e.postgame?.driverSkill) {
                count++
                total += e.postgame.driverSkill
            }
        })
        return total / count
    },
    AveragePiecesScored(team: number, data: any[]) {
        let matches = 0
        let count = 0
        data.forEach((e) => {
            if (e.team != team) return
            matches++
            e.actions.forEach((a: any) => {
                if (a.action === 'score') {
                    count++
                }
            })
        })
        return count / matches
    },
    AverageAutoPoints(team: number, data: any[]) {
        let count = 0
        let score = 0
        data.forEach((e) => {
            if (e.team != team) return
            score += exclusiveAutoScore(e)
            count++
        })
        return score / count
    },
    AverageTeleopPoints(team: number, data: any[]) {
        let count = 0
        let score = 0
        data.forEach((e) => {
            if (e.team != team) return
            score += teamScore(e) - exclusiveAutoScore(e)
            count++
        })
        return score / count
    },
    AverageClimbRate(team: number, data: any[]) {
        let count = 0
        let climbCount = 0
        data.forEach((e) => {
            if (e.team != team) return
            if (e.climb.type === 'shallow' || e.climb.type === 'deep')
                climbCount++
            count++
        })
        return climbCount / count
    },
    AverageClimbFailures(team: number, data: any[]) {
        let count = 0
        let failCount = 0
        data.forEach((e) => {
            if (e.team != team) return
            if (e.climb.fails) failCount += e.climb.fails
            count++
        })
        return failCount / count
    },
    MostCommonClimb(team: number, data: any[]) {
        let shallow = 0
        let deep = 0
        data.forEach((e) => {
            if (e.team != team) return
            if (e.climb.type === 'shallow') shallow++
            if (e.climb.type === 'deep') deep++
        })
        return shallow > deep ? 'shallow' : 'deep'
    },
    AlgaeToCoralRatio(team: number, data: any[]) {
        let count = 0
        let algae = 0
        let coral = 0
        data.forEach((e) => {
            if (e.team != team) return
            e.actions.forEach((a: any) => {
                if (a.action === 'score') {
                    if (a.location === 'reef') {
                        coral++
                    } else {
                        algae++
                    }
                }
            })
            count++
        })
        return algae / coral
    },
}

let autoScoreValues = [3, 4, 6, 7]

let teleopScoreValues = [2, 3, 4, 5]

function teamScore(matchData: any) {
    let count = 0

    matchData.actions.forEach((action: any) => {
        if (action.phase == 'auto') {
            if (action.action == 'score') {
                if (action.location == 'reef') {
                    count += autoScoreValues[action.level - 1]
                } else {
                    if (action.location == 'barge') {
                        count += 4
                    } else if (action.location == 'processor') {
                        count += 6
                    }
                }
            }
        } else if (action.phase == 'teleOp') {
            if (action.action == 'score') {
                if (action.location == 'reef') {
                    count += teleopScoreValues[action.level - 1]
                } else {
                    if (action.location == 'barge') {
                        count += 4
                    } else if (action.location == 'processor') {
                        count += 6
                    }
                }
            }
        }
    })

    if (matchData.climb != null) {
        if (matchData.climb === 'deep') {
            count += 12
        } else if (matchData.climb === 'shallow') {
            count += 6
        }
    }

    try {
        if (matchData.untimed.parkMatch === true) {
            count += 2
        }
    } catch (e) {}

    try {
        if (matchData.untimed.exitAuto === true) {
            count += 3
        }
    } catch (e) {}

    return count
}

function exclusiveAutoScore(matchData: any) {
    let count = 0

    matchData.actions.forEach((action: any) => {
        if (action.phase == 'auto') {
            if (action.action == 'score') {
                if (action.location == 'reef') {
                    count += autoScoreValues[action.level - 1]
                } else {
                    if (action.location == 'barge') {
                        count += 4
                    } else if (action.location == 'processor') {
                        count += 6
                    }
                }
            }
        }
    })

    try {
        if (matchData.untimed.exitAuto === true) {
            count += 3
        }
    } catch (e) {}

    return count
}

function stdDev(arr: any) {
    let mean =
        arr.reduce((acc: any, curr: any) => {
            return acc + curr
        }, 0) / arr.length

    arr = arr.map((k: any) => {
        return (k - mean) ** 2
    })

    let sum = arr.reduce((acc: any, curr: any) => acc + curr, 0)

    let variance = sum / arr.length

    return Math.sqrt(sum / arr.length)
}
