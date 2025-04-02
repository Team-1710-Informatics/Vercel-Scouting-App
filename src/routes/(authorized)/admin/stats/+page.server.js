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

    let output = []
    for (const event of events) {
        let eventTeamSelections = await TeamSelections.find({
            $regex: event + '.*',
        })
        let matchCount = 0
        let totalScouts = 0

        matchCount = eventTeamSelections.length

        eventTeamSelections.forEach((match) => {
            match.teams.forEach((team) => {
                if (team.scout) totalScouts += team.scout.length
            })
        })

        console.log('Event: ' + event)
        console.log('Matches: ' + matchCount)
        console.log('Scouts: ' + totalScouts)
        let scoutingCoverage = totalScouts / (matchCount * 6)
        console.log(scoutingCoverage)

        output.push({
            event: event,
            matches: matchCount,
            scouts: totalScouts,
            coverage: scoutingCoverage,
        })
    }

    return { output }
}
