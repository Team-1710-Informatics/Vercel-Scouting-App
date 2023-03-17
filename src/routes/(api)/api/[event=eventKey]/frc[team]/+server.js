import { ScoutData } from "$lib/server/models";
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    const jason = JSON.parse(JSON.stringify((await ScoutData.find({ event:params.event, team:+params.team }))));
    return json(jason);
}

export const _info = {
    url: "/{event key}/frc{team number}",
    desc: "Displays the team raw data for a given match in order of the lineup for that match.",
    ex: "/2023test/frc1710",
}