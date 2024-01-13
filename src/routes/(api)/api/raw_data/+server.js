import { ScoutData } from "$lib/server/models";
import { json } from '@sveltejs/kit';

export async function GET() {
    const jason = JSON.parse(JSON.stringify((await ScoutData.find({}))));
    jason.forEach(e=>{delete e.postgame;})
    return json(jason);
}

