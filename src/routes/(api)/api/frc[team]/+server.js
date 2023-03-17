import { ScoutData } from "$lib/server/models";
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    const jason = JSON.parse(JSON.stringify((await ScoutData.find({ team:params.team }))));
    return json(jason);
}

export const _info = {
    url: "/frc{team number}",
    desc: "Displays all raw data from a team for all events and matches played",
    ex: "/frc1710"
}