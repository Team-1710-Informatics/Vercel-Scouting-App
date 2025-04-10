import { DoNotPickTeam } from '$lib/server/models/index.js'
import { json } from '@sveltejs/kit'

export async function GET({ params }) {

    const newTeam = new DoNotPickTeam({
        team: params.team,
        event: params.event,
    });

    await newTeam.save();

    return json({
        "success": true,
        "entry": newTeam,
    })
}
