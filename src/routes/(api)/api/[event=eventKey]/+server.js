import { ScoutData } from '$lib/server/models'
import { json } from '@sveltejs/kit'
import { QUALITATIVE_DATA_KEY } from '$env/static/private'

export async function GET({ params, request }) {
    const authHeader = request.headers.get('qualitative_auth')
    const skipPostgameDeletion = authHeader === QUALITATIVE_DATA_KEY

    const jason = JSON.parse(
        JSON.stringify(await ScoutData.find({ event: params.event }))
    )

    if (!skipPostgameDeletion) {
        jason.forEach((e) => {
            delete e.postgame
        })
    }
    return json(jason)
}
