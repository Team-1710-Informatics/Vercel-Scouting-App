import { ScoutData } from "$lib/models";
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    const jason = JSON.parse(JSON.stringify((await ScoutData.find({ event:params.event, match:+params.match }))));
    return json(jason);
}

export const _info = {
    url: "/{event key}/{match key}",
    desc: "Displays the raw match data in order of the scout submission.",
    ex: "/2023test/8",
}