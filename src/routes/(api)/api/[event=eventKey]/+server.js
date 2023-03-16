import { ScoutData } from "$lib/models";
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    const jason = JSON.parse(JSON.stringify((await ScoutData.find({ event:params.event }))));
    return json(jason);
}

export const _info = {
    url: "/{event key}",
    desc: "Displays the raw data for a given match.",
    ex: "/2023test",
}