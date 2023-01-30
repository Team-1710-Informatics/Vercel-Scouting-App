import { MongoClient } from 'mongodb';
import { MONGODB } from '$env/static/private';

const client = new MongoClient(MONGODB);

export async function handle({ event, resolve }) {
    await client.connect();

    const token = event.cookies.get("session");
    
    if(!token) return await resolve(event);

    const user = await client.db("main").collection("users").findOne({ token:token });

    if (user) {
        event.locals.user = {
            username: user.username,
            name: user.name,
            email: user.email,
            team: user.team,
            stats: user.stats
        }
    }

    return await resolve(event);
}