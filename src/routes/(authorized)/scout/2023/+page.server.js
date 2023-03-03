import { X_TBA_AUTHKEY } from "$env/static/private";
import { ScoutData } from "$lib/models";
import credits from "$lib/server/credits";
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
    default: async function({ request, locals }){
        const input = await request.formData();
        const data = JSON.parse(input.get("data"));

        if(locals.competition == data.event) await credits.transaction(locals.user.username, 100, `Scouted ${data.event}qm${data.match}:${data.team}`);
        else await credits.transaction(locals.user.username, 20, `Scouted ${data.event}qm${data.match}:${data.team} (extra)`);

        const db = new ScoutData(data);
        await db.save();

        console.log(data)

        throw redirect(307, "/hub");
    }
}