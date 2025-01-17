import { ScoutData } from '$lib/server/models'
import { json } from '@sveltejs/kit'

export async function GET({ params }) {
    const jason = JSON.stringify(
        await ScoutData.find({
            event: params.event,
            match: +params.match,
            team: +params.team,
        })
    )
    jason.forEach((e) => {
        delete e.postgame
    })
    return json(jason)
}
