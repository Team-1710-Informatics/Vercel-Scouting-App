import { MongoClient } from 'mongodb';
import { MONGODB } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

const client = new MongoClient(MONGODB);

export async function load ({ cookies }) {
    await client.connect();

    await client.db("main").collection("users").updateOne({ token:cookies.get("session") }, { $unset:{ token:"" } });

    cookies.set('session', '', {
        path: '/',
        expires: new Date(0),
    });

    throw redirect(302, '/login');
}