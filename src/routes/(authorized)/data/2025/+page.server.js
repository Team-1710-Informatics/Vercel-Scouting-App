import { pitdata2025, ScoutData } from '$lib/server/models/index.js'
import tba from '$lib/modules/tba.js'

export async function load({ params, locals }) {
    const data = JSON.parse(JSON.stringify(await ScoutData.find({})))
    const pitData = JSON.parse(
        JSON.stringify(await pitdata2025.findOne({ team: params.team }))
    )
    const teams = JSON.parse(JSON.stringify(await ScoutData.find()))

    let returnTeams = []
    teams.forEach((e) => {
        if (!returnTeams.includes(e.team)) returnTeams.push(e.team)
    })

    // get the event property of all the data entries and put all unique events into an array
    let events = []
    for (const e of data) {
        //     remove duplicate events
        if (!events.includes(e.event)) events.push(e.event)
    }

    let tbaEvents = []
    for (const e of events) {
        console.log(e)
        if (e != null && e !== '2025practice') {
            tbaEvents.push(await tba('event/' + e))
        }
        if (e === '2025practice') {
            tbaEvents.push({
                key: '2025practice',
                name: '2025practice',
                short_name: '2025practice',
            })
        }
    }

    console.log('events', tbaEvents)
    return {
        competition: locals?.competition,
        entries: data,
        teams: returnTeams,
        team: params.team,
        pitData: pitData == null ? 'none' : pitData,
        events: tbaEvents,
    }
}
