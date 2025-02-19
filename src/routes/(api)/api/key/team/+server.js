import { ScoutData } from '$lib/server/models'
import { json } from '@sveltejs/kit'

export async function GET() {
    const jason = JSON.parse(JSON.stringify(await ScoutData.find()))
    let teams = []
    jason.forEach((e) => {
        if (teams.includes(e.team)) return
        teams.push(e.team)
    })
    return json(teams)
}
