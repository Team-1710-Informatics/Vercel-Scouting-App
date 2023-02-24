import { ScoutData } from "$lib/models";
import { json } from '@sveltejs/kit';

const client = new MongoClient(MONGODB);

await client.connect();

export async function GET({ params }) {
    const jason = (await ScoutData.find({ event:params.event, team:+params.team }));
    return json(jason);
}