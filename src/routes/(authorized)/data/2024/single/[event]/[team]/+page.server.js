import { ScoutData } from '$lib/server/models/index.js'
import { pitdata2024 } from '$lib/server/models/index.js'

export async function load({ params, locals }) {
    const data = JSON.parse(
        JSON.stringify(
            await ScoutData.find({ team: params.team, event: params.event })
        )
    )
    const pitData = JSON.parse(
        JSON.stringify(
            await pitdata2024.findOne({
                team: params.team,
                event: params.event,
            })
        )
    )
    const teams = JSON.parse(JSON.stringify(await ScoutData.find()))

    let returnTeams = []
    teams.forEach((e) => {
        if (!returnTeams.includes(e.team) && e.event == params.event)
            returnTeams.push(e.team)
    })

    returnTeams.sort((a, b) => a - b)

    return {
        competition: locals?.competition,
        entries: data,
        teams: returnTeams,
        team: params.team,
        pitData: pitData == null ? 'none' : pitData,
    }
}
