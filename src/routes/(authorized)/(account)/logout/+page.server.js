import { MongoClient } from 'mongodb';
import { MONGODB } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

const client = new MongoClient(MONGODB);

export async function load ({ cookies }) {
    await client.connect();
    const token = cookies.get("session");
    if(token){
        cookies.set('session', '', {
            path: '/',
            expires: new Date(0),
        });
    }
    if(await client.db("main").collection("users").findOne({ token:token }))
        await client.db("main").collection("users").updateOne({ token:token }, { $unset:{ token:"" } });

    await client.close();
    throw redirect(302, '/login');
}