import { ScoutData } from '$lib/server/models'
import { json } from '@sveltejs/kit'
import { QUALITATIVE_DATA_KEY } from '$env/static/private'

export async function GET({ params }) {
    const jason = JSON.parse(
        JSON.stringify(
            await ScoutData.find({ event: params.event, team: +params.team })
        )
    )
    jason.forEach((e) => {
        delete e.postgame
    })
    return json(jason)
}
