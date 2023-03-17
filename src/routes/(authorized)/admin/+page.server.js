import { MongoClient } from "mongodb";
import { MONGODB } from "$env/static/private";
import credits from "$lib/server/user/credi";
import { User } from "$lib/server/models";

const client = new MongoClient(MONGODB);

export async function load({ locals }){
    await client.connect();

    let result = await client.db("main").collection("users").find({ team:locals.user.team });
    result = await result.toArray();

    const members = [];
    result.forEach(m=>{
        members.push({
            username:m.username,
            name:m.name
        })
    })

    const scouting = JSON.parse(JSON.stringify(await User.find({status:"scouting"})));

    return {
        members:JSON.stringify(members),
        scouting
    }
}

export const actions = {
    default: async ({ request })=>{
        const input = await request.formData();
        const data = JSON.parse(input.get("data"));

        if(typeof data.amount != "number" || (!data.amount && data.amount !== 0)) return;

        await credits.transaction(data.user, data.amount, data.reason);
    }
};