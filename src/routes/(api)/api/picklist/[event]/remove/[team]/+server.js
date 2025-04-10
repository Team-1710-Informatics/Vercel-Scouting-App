import { DoNotPickTeam } from '$lib/server/models/index.js'
import { json } from '@sveltejs/kit'

export async function GET({ params }) {

    try {
        await DoNotPickTeam.deleteMany({ event: params.event, team: params.team })
    } catch (error) {
        return json({
            "success": false,
            "error": error.message
        })
    }

    return json({
        "success": true
    })
}
