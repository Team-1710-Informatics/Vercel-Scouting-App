export default {
    TeamNumber(team: number, data: any[]) {
        return team
    },
    MatchesScouted(team: number, data: any[]) {
        return data.filter((e) => e.team === team).length
    },
    AverageScoreNumeric(team: number, data: any[]) {
        let count = 0
        let score = 0
        data = dropWorstScoringMatch(data, team)
        data.forEach((matchData) => {
            if (matchData.team != team) return
            score += teamScore(matchData)
            count++
        })
        return score / count
    },
    AverageScore(team: number, data: any[]) {
        let count = 0
        let score = 0
        data = dropWorstScoringMatch(data, team)
        data.forEach((matchData) => {
            if (matchData.team != team) return
            score += teamScore(matchData)
            count++
        })
        return (
            (score / count).toFixed(0) +
            '±' +
            stdDev(data.map((e) => teamScore(e))).toFixed(0)
        )
    },
    AverageAutoCoral(team: number, data: any[]) {
        let count = 0
        let score = 0
        data = dropWorstScoringMatch(data, team)
        data.forEach((matchData) => {
            if (matchData.team != team) return
            matchData.actions.forEach((action: any) => {
                if (
                    action.phase == 'auto' &&
                    action.action == 'score' &&
                    action.location == 'reef'
                ) {
                    score++
                }
            })
            count++
        })
        if (score == 0) return 0
        return (
            (score / count).toFixed(0) +
            '±' +
            stdDev(
                data.map(
                    (e) =>
                        e.actions.filter(
                            (a: any) =>
                                a.phase == 'auto' &&
                                a.action == 'score' &&
                                a.location == 'reef'
                        ).length
                )
            ).toFixed(0)
        )
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
        data = dropWorstScoringMatch(data, team)
        data.forEach((e) => {
            if (e.team != team) return
            if (e.untimed.exitAuto) mobileCount++
            count++
        })
        return mobileCount / count
    },
    DriverSkill(team: number, data: any[]) {
        let count = 0
        let total = 0
        data = normalizeQualitativeDataByScout(data)
        data = dropWorstScoringMatch(data, team)
        data.forEach((e) => {
            if (e.team != team) return
            if (e.postgame?.driverSkill) {
                count++
                total += e.postgame.driverSkill2
            }
        })
        return total / count
    },
    SpeedRating(team: number, data: any[]) {
        let count = 0
        let total = 0
        data = normalizeQualitativeDataByScout(data)
        data = dropWorstScoringMatch(data, team)
        data.forEach((e) => {
            if (e.team != team) return
            if (e.postgame?.speed) {
                count++
                total += e.postgame.speed2
            }
        })
        return total / count
    },
    AveragePiecesScored(team: number, data: any[]) {
        let matches = 0
        let count = 0
        data = dropWorstScoringMatch(data, team)
        data.forEach((e) => {
            if (e.team != team) return
            matches++
            e.actions.forEach((a: any) => {
                if (a.action === 'score') {
                    count++
                }
            })
        })
        return (
            (count / matches).toFixed(0) +
            '±' +
            stdDev(
                data.map(
                    (e) =>
                        e.actions.filter((a: any) => a.action === 'score')
                            .length
                )
            ).toFixed(0)
        )
    },
    AverageAutoPoints(team: number, data: any[]) {
        let count = 0
        let score = 0
        data = dropWorstScoringMatch(data, team)
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
        data = dropWorstScoringMatch(data, team)
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
        let none = 0
        data.forEach((e) => {
            if (e.team != team) return
            if (e.climb.type === 'shallow') shallow++
            if (e.climb.type === 'deep') deep++
            if (e.climb.type === 'none') none++
        })
        if (shallow > deep && shallow > none) return 'shallow'
        if (deep > shallow && deep > none) return 'deep'
        return 'none'
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
        if (isNaN(algae / coral)) return 0
        if (coral == 0) return 1
        return algae / coral
    },
    MaxAutoPoints(team: number, data: any[]) {
        let scores: number[] = []
        data = dropWorstScoringMatch(data, team)
        data.forEach((e) => {
            if (e.team != team) return
            scores.push(exclusiveAutoScore(e))
        })
        return Math.max(...scores)
    },
    BreakdownRate(team: number, data: any[]): number {
        let count = 0
        let breakdownCount = 0
        data = dropWorstScoringMatch(data, team)
        data.forEach((e) => {
            if (e.team != team) return
            if (e.postgame.strategy.includes('breakdown')) breakdownCount++
            count++
        })
        return breakdownCount / count
    },
    Strategy(team: number, data: any[]) {
        let stratIndex = 0
        let allStrat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let result = ''
        data = dropWorstScoringMatch(data, team)
        data.forEach((e) => {
            if (e.team != team) return
            e.postgame.strategy.forEach((a: any) => {
                switch (a) {
                    case 'cycle':
                        allStrat[0]++
                        break
                    case 'coral':
                        allStrat[1]++
                        break
                    case 'algae':
                        allStrat[2]++
                        break
                    case 'feeder':
                        allStrat[3]++
                        break
                    case 'pickup':
                        allStrat[4]++
                        break
                    case 'defense':
                        allStrat[5]++
                        break
                    case 'moral':
                        allStrat[6]++
                        break
                    case 'breakdown':
                        allStrat[7]++
                        break
                    case 'noShow':
                        allStrat[8]++
                        break
                }
            })
        })
        stratIndex = allStrat.indexOf(Math.max(...allStrat))
        if (stratIndex == 0) result = 'hybrid'
        if (stratIndex == 1) result = 'coral'
        if (stratIndex == 2) result = 'algae'
        if (stratIndex == 3) result = 'feeder'
        if (stratIndex == 4) result = 'pickup'
        if (stratIndex == 5) result = 'defense'
        if (stratIndex == 6) result = 'moral support'
        if (stratIndex == 7) result = 'breakdown'
        if (stratIndex == 8) result = 'no show'
        return result
    },
    AverageL1Coral(team: number, data: any[]) {
        let count = 0
        let score = 0
        data = dropWorstScoringMatch(data, team)
        data.forEach((e) => {
            if (e.team != team) return
            e.actions.forEach((a: any) => {
                if (
                    a.action === 'score' &&
                    a.location === 'reef' &&
                    a.level === 1
                )
                    score++
            })
            count++
        })
        return score / count
    },
    AverageL2Coral(team: number, data: any[]) {
        let count = 0
        let score = 0
        data = dropWorstScoringMatch(data, team)
        data.forEach((e) => {
            if (e.team != team) return
            e.actions.forEach((a: any) => {
                if (
                    a.action === 'score' &&
                    a.location === 'reef' &&
                    a.level === 2
                )
                    score++
            })
            count++
        })
        return score / count
    },
    AverageL3Coral(team: number, data: any[]) {
        let count = 0
        let score = 0
        data = dropWorstScoringMatch(data, team)
        data.forEach((e) => {
            if (e.team != team) return
            e.actions.forEach((a: any) => {
                if (
                    a.action === 'score' &&
                    a.location === 'reef' &&
                    a.level === 3
                )
                    score++
            })
            count++
        })
        return score / count
    },
    AverageL4Coral(team: number, data: any[]) {
        let count = 0
        let score = 0
        data = dropWorstScoringMatch(data, team)
        data.forEach((e) => {
            if (e.team != team) return
            e.actions.forEach((a: any) => {
                if (
                    a.action === 'score' &&
                    a.location === 'reef' &&
                    a.level === 4
                )
                    score++
            })
            count++
        })
        return score / count
    },
    MostCommonCoralLevel(team: number, data: any[]) {
        let levels = [0, 0, 0, 0]
        data.forEach((e) => {
            if (e.team != team) return
            e.actions.forEach((a: any) => {
                if (a.action === 'score' && a.location === 'reef') {
                    levels[a.level - 1]++
                }
            })
        })
        return levels.indexOf(Math.max(...levels)) + 1
    },
    PercentageL4Coral(team: number, data: any[]) {
        let count = 0
        let score = 0
        data = dropWorstScoringMatch(data, team)
        data.forEach((e) => {
            if (e.team != team) return
            e.actions.forEach((a: any) => {
                if (
                    a.action === 'score' &&
                    a.location === 'reef' &&
                    a.level === 4
                )
                    score++
            })
            count++
        })
        return score / count
    },
    AverageProcessorScore(team: number, data: any[]) {
        let count = 0
        let score = 0
        data = dropWorstScoringMatch(data, team)
        data.forEach((e) => {
            if (e.team != team) return
            e.actions.forEach((a: any) => {
                if (a.action === 'score' && a.location === 'processor')
                    score += 6
            })
            count++
        })
        return score / count
    },
    AverageBargeScore(team: number, data: any[]) {
        let count = 0
        let score = 0
        data = dropWorstScoringMatch(data, team)
        data.forEach((e) => {
            if (e.team != team) return
            e.actions.forEach((a: any) => {
                if (a.action === 'score' && a.location === 'barge') score += 4
            })
            count++
        })
        return score / count
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

function normalizeQualitativeDataByScout(data: any[]) {
    console.log(data[0].postgame.rating)
    let scouts = Array.from(new Set(data.map((match) => match.scout)))

    let i = 0
    console.log(data[0].postgame.rating)
    scouts.forEach((scout) => {
        let scoutData = data.filter((match) => match.scout === scout)
        if (i === 0) console.log(scoutData)
        i++

        let ratingSum = 0,
            driverSkillSum = 0,
            speedSum = 0
        scoutData.forEach((match) => {
            // Check for null or undefined values and set them to 5
            if (match.postgame.rating == 0) match.postgame.rating = 1
            if (match.postgame.driverSkill == 0) match.postgame.driverSkill = 1
            if (match.postgame.speed == 0) match.postgame.speed = 1

            ratingSum += match.postgame.rating
            driverSkillSum += match.postgame.driverSkill
            speedSum += match.postgame.speed
        })

        let ratingMean = ratingSum / scoutData.length
        let driverSkillMean = driverSkillSum / scoutData.length
        let speedMean = speedSum / scoutData.length

        let ratingStdDev = Math.sqrt(
            scoutData.reduce(
                (acc, match) =>
                    acc +
                    Math.pow((match.postgame.rating || 0) - ratingMean, 2),
                0
            ) / scoutData.length
        )
        let driverSkillStdDev = Math.sqrt(
            scoutData.reduce(
                (acc, match) =>
                    acc +
                    Math.pow(
                        (match.postgame.driverSkill || 0) - driverSkillMean,
                        2
                    ),
                0
            ) / scoutData.length
        )
        let speedStdDev = Math.sqrt(
            scoutData.reduce(
                (acc, match) =>
                    acc + Math.pow((match.postgame.speed || 0) - speedMean, 2),
                0
            ) / scoutData.length
        )

        scoutData.forEach((match) => {
            match.postgame.rating2 =
                (match.postgame.rating - ratingMean) / ratingStdDev
            match.postgame.driverSkill2 =
                (match.postgame.driverSkill - driverSkillMean) /
                driverSkillStdDev
            match.postgame.speed2 =
                (match.postgame.speed - speedMean) / speedStdDev
        })
    })

    let allValues = data.flatMap((match) => [
        match.postgame.rating2,
        match.postgame.driverSkill2,
        match.postgame.speed2,
    ])

    console.log('YES', allValues)

    let min = Math.min(...allValues.filter((num) => !Number.isNaN(num)))
    let max = Math.max(...allValues.filter((num) => !Number.isNaN(num)))

    data.forEach((match) => {
        match.postgame.rating2 = scaleToRange(
            match.postgame.rating2,
            min,
            max,
            0,
            10
        )
        match.postgame.driverSkill2 = scaleToRange(
            match.postgame.driverSkill2,
            min,
            max,
            0,
            10
        )
        match.postgame.speed2 = scaleToRange(
            match.postgame.speed2,
            min,
            max,
            0,
            10
        )
    })
    return data
}

function scaleToRange(
    value: number,
    min: number,
    max: number,
    newMin: number,
    newMax: number
) {
    return ((value - min) / (max - min)) * (newMax - newMin) + newMin
}

function dropWorstScoringMatch(matchData: any[], team: number) {
    let teamMatches = matchData.filter((match) => match.team === team)

    if (teamMatches.length <= 3) {
        return teamMatches
    }

    let scores = teamMatches.map((match) => ({
        match,
        score: teamScore(match),
    }))

    let minScoreMatch = scores.reduce((min, current) =>
        current.score < min.score ? current : min
    )

    return teamMatches.filter((match) => match !== minScoreMatch.match)
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
