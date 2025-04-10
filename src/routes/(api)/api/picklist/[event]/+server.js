import { DoNotPickTeam } from '$lib/server/models/index.js'
import { json } from '@sveltejs/kit'

export async function GET({ params }) {
    const jason = JSON.parse(
        JSON.stringify(await DoNotPickTeam.find({ event: params.event }))
    )

    jason.filter(jason => jason.event === params.event);

    return json(jason)
}
