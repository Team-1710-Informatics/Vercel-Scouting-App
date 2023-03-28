<<<<<<< HEAD
import { X_TBA_AUTHKEY } from "$env/static/private";
=======
import tba from "$lib/modules/tba";
>>>>>>> open/main
import { ScoutData } from "$lib/server/models";
import credits from "$lib/server/user/credi";
import stats from "$lib/server/user/stats";
import { redirect } from "@sveltejs/kit";

<<<<<<< HEAD
export async function load({ locals, url, fetch }) {
    if(!locals.user) throw redirect(307, "/login");

    const res = await fetch(`https://thebluealliance.com/api/v3/events/2023`,{
        headers:{
            "X-TBA-Auth-Key":X_TBA_AUTHKEY
        }
    });
=======
export async function load({ locals, url }) {
    if(!locals.user) throw redirect(307, "/login");

    const res = await tba(`events/2023`);
>>>>>>> open/main

    const events = await res.json();

    return{
        events,
        competition:locals.competition,
        scout:locals.user.username,
        host:url.host
    }
}

export const actions = {
    default: async function({ request, locals }){
        const input = await request.formData();
        const data = JSON.parse(input.get("data"));

        if(locals.competition.key == data.event) await credits.transaction(locals.user.username, 100, `Scouted ${data.event}_qm${data.match}:${data.team}`);
        else if(data.event != "2023practice") await credits.transaction(locals.user.username, 20, `Scouted ${data.event}_qm${data.match}:${data.team} (extra)`);

        const db = new ScoutData(data);
        await db.save();

        console.log(data);

        if(data.event != "2023practice"){
            await stats.setStat(data.scout, "matches_scouted", (await stats.getStat(data.scout, "matches_scouted"))+1);
        }

        throw redirect(307, "/hub");
    }
}