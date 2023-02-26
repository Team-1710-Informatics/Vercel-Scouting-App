import { ScoutData } from "$lib/models";
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    const jason = JSON.parse(JSON.stringify((await ScoutData.find({ event:params.event, match:+params.match }))));
    return json(jason);
}

const info = {
    url: "/{match key}",
    desc: "Displays the match statistics in order of the lineup"
}

export default info;