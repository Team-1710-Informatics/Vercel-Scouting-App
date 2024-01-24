import { ScoutData } from "$lib/server/models";
import { json } from '@sveltejs/kit';

// Gets match data across all events for a specific team
export async function GET({ params }) {
    let jason = JSON.parse(JSON.stringify((await ScoutData.find({ team:params.team }))));
    jason.forEach(e=>{delete e.postgame;})
    return json(jason);
}

