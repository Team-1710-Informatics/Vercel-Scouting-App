import { MongoClient } from 'mongodb';
import { MONGODB } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';

const client = new MongoClient(MONGODB);

export async function load({ params }) {
    // Verify that account exists and is unverified
    await client.connect();

    const user = await client.db("main").collection("users").findOne({ username:params.user });

    if(!user?.flags?.verification_key) throw redirect(308, "/login");

    let elapsed = Math.floor(Date.now()/1000) - user.stats.joined;

    if(elapsed > 1800){
        await client.db("main").collection("users").deleteOne({ username:params.user });
        throw redirect(308, '/signup/verify-timeout');
    }

    // Evaluate context
    let data = {};
    switch(params?.context){
        case 's': data.form.success = "Success! You have been sent an email containing a verification code.";
        case 'l': data.form.alert = `Please verify your email with the code that was sent to ${user.email}`;
    }
    return data;
}