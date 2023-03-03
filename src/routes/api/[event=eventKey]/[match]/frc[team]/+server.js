import { ScoutData } from "$lib/models";
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    const jason = JSON.parse(JSON.stringify((await ScoutData.find({ event:params.event, match:+params.match, team:+params.team }))));
    return json(jason);
}

const info = {
    url: "/{event key}/{match key}/frc{team number}",
    desc: "Displays the match statistics for a specified team",
    ex: "/2023test/8/frc1710",
}

export default info;