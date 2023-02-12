import { MongoClient } from "mongodb";
import { MONGODB } from "$env/static/private";
import crypto from "node:crypto";
import { fail, redirect } from "@sveltejs/kit";

const client = new MongoClient(MONGODB);

export async function load({ params }) {
    await client.connect();

    const key = params.key;

    const user = await client.db("main").collection("users").findOne({ "flags.reset":key });
    await client.close();

    if(!user) {
        throw redirect(307, '/login');
    }
}

export const actions = {
    reset: async ({ request, params }) => {
        await client.connect();
        const key = params.key;
        const input = await request.formData();
        const data = { pass1:input.get("pass1"), pass2:input.get("pass2") };

        if(data.pass1 != data.pass2){
            data.error = "Passwords do not match!";
            await client.close();
            return fail(400, data);
        }

        if(data.pass1.length < 8){
            data.error = "Password must be at least 8 characters in length";
            await client.close();
            return fail(400, data);
        }

        let salt = randstr(30);
        let hash = salt + data.pass1;
        for(let i = 0; i < 1145; i++) hash = crypto.createHash("sha512").update(hash).digest('hex');

        await client.db("main").collection("users").updateOne({ "flags.reset":key }, {
            $set:{ password:{hash:hash,salt:salt} },
            $unset:{"flags.reset":""}
        });

        await client.close();
        throw redirect(307, "/login/r");
    }
}

function randstr(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

