import { ScoutData } from '$lib/server/models/index.js'
import { pitdata2024 } from '$lib/server/models/index.js'

export async function load({ params, locals }) {
    const data = JSON.parse(
        JSON.stringify(await ScoutData.find({ team: params.team }))
    )
    const pitData = JSON.parse(
        JSON.stringify(await pitdata2024.findOne({ team: params.team }))
    )
    const teams = JSON.parse(JSON.stringify(await ScoutData.find()))

    let returnTeams = []
    teams.forEach((e) => {
        if (!returnTeams.includes(e.team)) returnTeams.push(e.team)
    })
    return {
        competition: locals?.competition,
        entries: data,
        teams: returnTeams,
        team: params.team,
        pitData: pitData == null ? 'none' : pitData,
    }
}
