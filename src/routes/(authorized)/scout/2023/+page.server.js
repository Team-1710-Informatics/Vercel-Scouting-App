import { X_TBA_AUTHKEY } from "$env/static/private";
import { ScoutData } from "$lib/models";
import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
    if(!locals.user) throw redirect(307, "/login");

    const res = await fetch(`https://thebluealliance.com/api/v3/events/2023`,{
        headers:{
            "X-TBA-Auth-Key":X_TBA_AUTHKEY
        }
    });

    const events = await res.json();

    return{
        events,
        competition:locals.competition,
        scout:locals.user.username
    }
}

export const actions = {
    default: async function({ request }){
        const input = await request.formData();
        const data = JSON.parse(input.get("data"));

        const db = new ScoutData(data);
        await db.save();

        console.log(data)

        throw redirect(307, "/hub");
    }
}