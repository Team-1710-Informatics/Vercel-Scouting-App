// import teamselections model from models
import { TeamSelections } from '$lib/server/models'
import { redirect } from '@sveltejs/kit'

export async function load({ locals }) {
    // get all events
    let events = []
    let result = await TeamSelections.find({})

    result.forEach((event) => {
        events.push(event.match.split('_')[0])
    })

    events = [...new Set(events)]

    let scouts = []
    let output = []
    for (const event of events) {
        let eventTeamSelections = await TeamSelections.find({
            match: { $regex: event + '*' },
        })
        console.log('Event #: ' + eventTeamSelections.length)
        let matchCount = 0
        let totalScouts = 0
        let missingScouts = 0
        let bonus = 0

        matchCount = eventTeamSelections.length

        eventTeamSelections.forEach((match) => {
            let fill = 0
            match.teams.forEach((team) => {
                if (team.scout) {
                    totalScouts += team.scout.length
                    fill++
                    if (fill === 6) bonus++
                    scouts.push(team.scout)
                } else missingScouts++
            })
        })

        console.log('Event: ' + event)
        console.log('Matches: ' + matchCount)
        console.log('Scouts: ' + totalScouts)
        let scoutingCoverage = totalScouts / (matchCount * 6)
        console.log(scoutingCoverage)

        scouts = scouts.flat()
        scouts = [...new Set(scouts)]

        output.push({
            event: event,
            matches: matchCount,
            uniqueScouts: scouts.length,
            missingScouts: missingScouts,
            scouts: totalScouts,
            coverage: scoutingCoverage,
            bonus: bonus,
        })

        matchCount = 0
        totalScouts = 0
        scouts = []
    }

    return { event: output }
}
