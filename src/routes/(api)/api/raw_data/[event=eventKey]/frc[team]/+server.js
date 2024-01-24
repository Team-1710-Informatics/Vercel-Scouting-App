import { ScoutData } from "$lib/server/models";
import { json } from '@sveltejs/kit';

// Gets match data for a specific team in a specific event
export async function GET({ params }) {
    const jason = JSON.stringify((await ScoutData.find({ event:params.event, team:+params.team })));
    jason.forEach(e=>{delete e.postgame;})
    return json(jason);
}

