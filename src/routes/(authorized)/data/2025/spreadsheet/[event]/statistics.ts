import tba from '$lib/modules/tba'

function calculateAverageByTeamAndMatch(
    data: any[],
    team: number,
    scoreFunction: (matchData: any) => number
) {
    let matchScores: { [key: string]: number[] } = {}
    data.forEach((matchData) => {
        if (matchData.team != team) return
        let key = `${team}-${matchData.match}`
        if (!matchScores[key]) {
            matchScores[key] = []
        }
        matchScores[key].push(scoreFunction(matchData))
    })

    let totalScore = 0
    let count = 0
    Object.keys(matchScores).forEach((key) => {
        let scores = matchScores[key]

        scores.sort((a, b) => a - b)

        console.log('yip', scores)

        // Remove the lowest score
        if (scores.length > 1) {
            if (Math.max(...scores) - Math.min(...scores) > 7) {
                scores.shift()
            } else {
                // average all scores in scores variable
                scores = [scores.reduce((a, b) => a + b, 0) / scores.length]
            }
        }

        console.log(scores)

        if (scores.length > 0) {
            let avgScore = scores.reduce((a, b) => a + b, 0) / scores.length
            totalScore += avgScore
            count++
        }
    })

    return count > 0 ? totalScore / count : 0
}

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

        // Step 1: Create a map to store scores for each team and match number
        let matchScores: { [key: string]: number[] } = {}

        // Step 2: Populate the map with scores
        data.forEach((matchData) => {
            if (matchData.team != team) return
            let key = `${team}-${matchData.match}`
            if (!matchScores[key]) {
                matchScores[key] = []
            }
            matchScores[key].push(teamScore(matchData))
        })

        // Step 3: Calculate the average score for each team and match number
        Object.keys(matchScores).forEach((key) => {
            let scores = matchScores[key]
            let avgScore = scores.reduce((a, b) => a + b, 0) / scores.length
            score += avgScore
            count++
        })

        // Step 4: Return the overall average score
        return score / count
    },
    AverageScore(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return (
            calculateAverageByTeamAndMatch(data, team, teamScore).toFixed(1) +
            '±' +
            stdDev(data.map((e) => teamScore(e))).toFixed(0)
        )
    },
    AverageAutoCoral(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(data, team, (matchData) => {
            let score = 0
            matchData.actions.forEach((action: any) => {
                if (
                    action.phase == 'auto' &&
                    action.action == 'score' &&
                    action.location == 'reef'
                ) {
                    score++
                }
            })
            return score
        }).toFixed(1)
    },
    AverageCoral(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(data, team, (matchData) => {
            let score = 0
            matchData.actions.forEach((action: any) => {
                if (
                    action.action == 'score' &&
                    action.location == 'reef' &&
                    action.phase == 'teleOp'
                ) {
                    score++
                }
            })
            return score
        }).toFixed(1)
    },
    MaxScore(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return Math.max(...data.filter((e) => e.team === team).map(teamScore))
    },
    AutoMobilityRate(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(data, team, (matchData) =>
            matchData.untimed.exitAuto ? 1 : 0
        )
    },
    DriverSkill(team: number, data: any[]) {
        data = normalizeQualitativeDataByScout(data)
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(
            data,
            team,
            (matchData) => matchData.postgame?.driverSkill2 || 0
        )
    },
    SpeedRating(team: number, data: any[]) {
        data = normalizeQualitativeDataByScout(data)
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(
            data,
            team,
            (matchData) => matchData.postgame?.speed2 || 0
        )
    },
    AveragePiecesScored(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(
            data,
            team,
            (matchData) =>
                matchData.actions.filter((a: any) => a.action === 'score')
                    .length
        ).toFixed(1)
    },
    AverageAutoPoints(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(data, team, exclusiveAutoScore)
    },
    AverageTeleopPoints(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(
            data,
            team,
            (matchData) => teamScore(matchData) - exclusiveAutoScore(matchData)
        )
    },
    AverageClimbRate(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(data, team, (matchData) =>
            matchData.climb.type === 'shallow' ||
            matchData.climb.type === 'deep'
                ? 1
                : 0
        )
    },
    AverageGamePiecesScored(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(
            data,
            team,
            (matchData) =>
                matchData.actions.filter((a: any) => a.action === 'score')
                    .length
        )
    },
    AverageAlgaeScored(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(
            data,
            team,
            (matchData) =>
                matchData.actions.filter(
                    (a: any) =>
                        a.action === 'score' &&
                        (a.location === 'processor' || a.location === 'barge')
                ).length
        )
    },
    AverageClimbFailures(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(
            data,
            team,
            (matchData) => matchData.climb.fails || 0
        )
    },
    MostCommonClimb(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        let climbTypes: Array<'shallow' | 'deep' | 'none'> = data
            .filter((e) => e.team === team)
            .map(
                (matchData) =>
                    matchData.climb.type as 'shallow' | 'deep' | 'none'
            )
        let counts: { shallow: number; deep: number; none: number } = {
            shallow: 0,
            deep: 0,
            none: 0,
        }
        climbTypes.forEach((type) => counts[type]++)
        return Object.keys(counts).reduce((a, b) =>
            counts[a as 'shallow' | 'deep' | 'none'] >
            counts[b as 'shallow' | 'deep' | 'none']
                ? a
                : b
        )
    },
    AlgaeToCoralRatio(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(data, team, (matchData) => {
            let algae = 0,
                coral = 0
            matchData.actions.forEach((a: any) => {
                if (a.action === 'score') {
                    if (a.location === 'reef') {
                        coral++
                    } else {
                        algae++
                    }
                }
            })
            return coral === 0 ? 1 : algae / coral
        })
    },
    MaxAutoPoints(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return Math.max(
            ...data.filter((e) => e.team === team).map(exclusiveAutoScore)
        )
    },
    BreakdownRate(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(data, team, (matchData) =>
            matchData.postgame.strategy.includes('breakdown') ? 1 : 0
        )
    },
    Strategy(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        let strategies = data
            .filter((e) => e.team === team)
            .flatMap((matchData) => matchData.postgame.strategy)
        let counts = strategies.reduce((acc: any, strat: string) => {
            acc[strat] = (acc[strat] || 0) + 1
            return acc
        }, {})
        return Object.keys(counts).reduce((a, b) =>
            counts[a] > counts[b] ? a : b
        )
    },
    AverageL1Coral(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(
            data,
            team,
            (matchData) =>
                matchData.actions.filter(
                    (a: any) =>
                        a.action === 'score' &&
                        a.location === 'reef' &&
                        a.level === 1
                ).length
        )
    },
    AverageL2Coral(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(
            data,
            team,
            (matchData) =>
                matchData.actions.filter(
                    (a: any) =>
                        a.action === 'score' &&
                        a.location === 'reef' &&
                        a.level === 2
                ).length
        )
    },
    AverageL3Coral(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(
            data,
            team,
            (matchData) =>
                matchData.actions.filter(
                    (a: any) =>
                        a.action === 'score' &&
                        a.location === 'reef' &&
                        a.level === 3
                ).length
        )
    },
    AverageL4Coral(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(
            data,
            team,
            (matchData) =>
                matchData.actions.filter(
                    (a: any) =>
                        a.action === 'score' &&
                        a.location === 'reef' &&
                        a.level === 4
                ).length
        )
    },
    MostCommonCoralLevel(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        let levels = [0, 0, 0, 0]
        data.filter((e) => e.team === team).forEach((matchData) => {
            matchData.actions.forEach((a: any) => {
                if (a.action === 'score' && a.location === 'reef') {
                    levels[a.level - 1]++
                }
            })
        })
        return levels.indexOf(Math.max(...levels)) + 1
    },
    PercentageL4Coral(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(
            data,
            team,
            (matchData) =>
                matchData.actions.filter(
                    (a: any) =>
                        a.action === 'score' &&
                        a.location === 'reef' &&
                        a.level === 4
                ).length
        )
    },
    AverageProcessorScore(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(
            data,
            team,
            (matchData) =>
                matchData.actions.filter(
                    (a: any) =>
                        a.action === 'score' && a.location === 'processor'
                ).length * 6
        )
    },
    AverageBargeScore(team: number, data: any[]) {
        data = dropWorstScoringMatch(data, team)
        return calculateAverageByTeamAndMatch(
            data,
            team,
            (matchData) =>
                matchData.actions.filter(
                    (a: any) => a.action === 'score' && a.location === 'barge'
                ).length * 4
        )
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
