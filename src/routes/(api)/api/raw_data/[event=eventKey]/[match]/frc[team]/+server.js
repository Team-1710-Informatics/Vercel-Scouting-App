import { ScoutData } from "$lib/server/models";
import { json } from '@sveltejs/kit';

// Gets the match data from a match key and a team
export async function GET({ params }) {
    const jason = JSON.stringify((await ScoutData.find({ event:params.event, match:+params.match, team:+params.team })));
    jason.forEach(e=>{delete e.postgame;})
    return json(jason);
}

