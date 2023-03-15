import { MongoClient } from 'mongodb';
import { fail, redirect } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

// const client = new MongoClient(MONGODB);

export async function GET({ params }) {
    // await client.connect();
    // const jason = await client.db("main").collection("rawdata").findOne({ event:params.event });
    const jason = {
        name: "Jason",
        hairstyle: "bread",
        outfit: "none",
        event: "2023test"
    }
    return json(jason);
}