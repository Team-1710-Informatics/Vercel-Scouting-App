import { DoNotPickTeam } from '$lib/server/models/index.js'
import { json } from '@sveltejs/kit'

export async function GET({ params }) {

    const { team, event } = params;

    if (!team || !event) {
        return json({
            "success": false,
            "error": "Team and event parameters are required"
        }, { status: 400 });
    }

    let newTeam;
    try {
        newTeam = new DoNotPickTeam({
            team: team,
            event: event,
        });
        await newTeam.save();
    } catch (error) {
        console.log("add error: ", error)
        return json({
            "success": false,
            "error": String(error)
        })
    }

    return json({
        "success": true,
        "entry": newTeam,
    })
}
