import { ScoutData } from "$lib/models";
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    const jason = JSON.stringify((await ScoutData.find({ event:params.event, match:+params.match, team:+params.team })));
    return json(jason);
}

export const _info = {
    url: "/{event key}/{match key}/frc{team number}",
    desc: "Displays the raw match data for a specified team.",
    ex: "/2023test/8/frc1710",
}