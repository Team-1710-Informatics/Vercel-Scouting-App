import { MongoClient } from 'mongodb';
import { MONGODB } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import { invalidate } from '$app/navigation';

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
        case 's': data.success = "Success! You have been sent an email containing a verification code.";break;
        case 'l': data.alert = `Please verify your email with the code that was sent to ${user.email}`;break;
    }
    return data;
}

export const actions = {
    verify: async ({ request, params })=>{
        await client.connect();

        const input = await request.formData();
        const key = input.get("key");
        const user = await client.db("main").collection("users").findOne({ username:params.user });
        
        if(key == user?.flags?.verification_key){
            delete user.flags.verfication_key;
            await client.db("main").collection("users").updateOne({ username:params.user }, { $set:{ flags:user.flags } });
            throw redirect(307, '/login/n');
        }else{
            return fail(401, {
                key:key,
                error:"Invalid code!"
            });
        }
    }
}