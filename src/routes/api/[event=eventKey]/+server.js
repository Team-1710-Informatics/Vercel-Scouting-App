import { MongoClient } from 'mongodb';
import { MONGODB } from "$env/static/private";
import { json } from '@sveltejs/kit';

const client = new MongoClient(MONGODB);

export async function GET({ params }) {
    await client.connect();
    const jason = await client.db("main").collection("2023entries").find({ event:params.event }).toArray();
    await client.close();
    return json(jason);
}