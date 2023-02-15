import { MongoClient } from 'mongodb';
import { MONGODB, EMAIL, EMAIL_HOST, EMAIL_PASSWORD } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import crypto from 'node:crypto';
import nodemailer from 'nodemailer';

const client = new MongoClient(MONGODB);

export function load({ params }) {
    let data = {};
    switch(params?.context){
        case 'n': data.success = "Your account has been successfully created! Log in to get started.";break;
        case 'r': data.success = "Your password has been reset.";break;
    }
    return data;
}

export const actions = {
    login: async ({ request, cookies }) => {
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
            await client.close();
            return fail(401, data);
        }

        //Password migration
        if(user.password.hash == "unset"){
            const key = crypto.randomUUID();
            const state = await email(user.email, key);
            if(!state) {
                data.error = "Something went wrong!";
                await client.close();
                return data;
            }else{
                client.db("main").collection("users").updateOne({email:user.email}, {$set:{"flags.reset":key}});
                data.alert = `Due to a change in infrastructure you will need to set a new password. We have sent an email containing instructions to ${user.email}.`;
                await client.close();
                return data;
            }
        }

        //Hash password and compare
        let hash = user.password.salt + data.password;
        for(let i = 0; i < 1145; i++) hash = crypto.createHash('sha512').update(hash).digest("hex");

        if(hash != user.password.hash){
            data.error = "Invalid username or password!";
            await client.close();
            return fail(401, data);
        }

        //Redirect unverified accounts
        if(user.flags?.verification_key) { await client.close(); throw redirect(307, `/verify/${user.username}/l`); }

        //Establish session
        let token = crypto.randomUUID();
        await client.db("main").collection("users").updateOne({ username:user.username }, { $set:{ token:token } });

        cookies.set('session', token, {
            path: '/',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24
        });

        await client.close();
        throw redirect(302, '/hub');
    }
}

function detectEmail(str) {return /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(str);}

async function email(email, key){
    let transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: 465,
        secure: true, // true for 465, false for other ports
        tls: {
            rejectUnauthorized: true
        },
        auth: {
            user: EMAIL,
            pass: EMAIL_PASSWORD
        }
    });

    let state = new Promise((resolve, reject) =>{
        transporter.verify(async function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
                
                transporter.sendMail({
                    from: `"Team 1710 Scouting" <${EMAIL}>`,
                    to: `${email}`,
                    subject: "Scouting Password Reset",
                    text: `You may reset your scouting password at https://team1710scouting.vercel.app/pw-reset/${key}.\n\nIf this was not you, please ignore this email.`,
                }).then((res)=>{
                    console.log(res);
                    resolve(true);
                }).catch((err)=>{
                    console.error(err);
                    reject(false);
                });
            }
        });
    });

    return state;
}