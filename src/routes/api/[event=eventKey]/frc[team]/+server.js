import { ScoutData } from "$lib/models";
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    const jason = JSON.parse(JSON.stringify((await ScoutData.find({ event:params.event, team:+params.team }))));
    return json(jason);
}

const info = {
    url: "/{match key}/frc{team}",
    desc: "Displays the team statistics for a given match in order of the lineup for that match",
}

export default info;