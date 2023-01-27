import { MongoClient } from 'mongodb';
import { MONGODB } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import crypto from 'node:crypto';

const client = new MongoClient(MONGODB);

export const actions = {
    login: async ({ request }) => {
        //Receive data from form
        const input = await request.formData();
        const data = {};
        ["username", "password"].forEach((item) => {data[item] = input.get(item);});

        //Server-side validation that data was entered
        ["username", "password"].forEach((item) => {
            if (data[item] === '') data.error = `${item[0].toUpperCase() + item.substring(1)} is required!`;
        });
        if(data?.error) {
            return fail(400, data);
        }

        //Connect to DB and find user
        await client.connect();
        const match = detectEmail(data.username) ? { email:data.username } : { username:data.username };
        const user = await client.db("main").collection("users").findOne(match);

        //Throw error if user does not exist
        if(user == null){
            data.error = "Invalid username or password!";
            return fail(401, data);
        }

        //Hash password and compare
        let hash = user.password.salt + data.password;
        for(let i = 0; i < 1145; i++) hash = crypto.createHash('sha512').update(hash).digest("hex");

        if(hash != user.password.hash){
            data.error = "Invalid username or password!";
            return fail(401, data);
        }
        data.success="Works";
        return data;
    }
}

function detectEmail(str) {return /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(str);}