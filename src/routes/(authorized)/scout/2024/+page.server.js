import tba from "$lib/modules/tba";
import { ScoutData } from "$lib/server/models";
import credits from "$lib/server/user/credi";
import stats from "$lib/server/user/stats";
import { redirect } from "@sveltejs/kit";

export async function load({ locals, url }) {
    if(!locals.user) throw redirect(307, "/login");

    const events = await tba(`events/2023`);

    return{
        events,
        competition:locals.competition,
        scout:locals.user.username,
        host:url.host,
    }
}