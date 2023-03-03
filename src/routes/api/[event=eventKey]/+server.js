import { ScoutData } from "$lib/models";
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    const jason = JSON.parse(JSON.stringify((await ScoutData.find({ event:params.event }))));
    return json(jason);
}

const info = {
    url: "/{event}",
    desc: "Displays all data from an event for each team in all matches in order of submission time for all match scouting",
    ex: "/2023test"
}

export default info;