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
}

let autoScoreValues = [3, 4, 6, 7]

let teleopScoreValues = [2, 3, 4, 5]

function teamScore(matchData: any) {
    let count = 0

    matchData.actions.forEach((action: any) => {
        if (action.phase == 'auto') {
            if (action.action == 'score') {
                if (action.location == 'reef') {
                    count += autoScoreValues[action.level]
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
                    count += teleopScoreValues[action.level]
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
