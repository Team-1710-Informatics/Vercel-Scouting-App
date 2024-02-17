import tba from "$lib/modules/tba";
import { ScoutData } from "$lib/server/models";
import credits from "$lib/server/user/credi";
import stats from "$lib/server/user/stats";
import { redirect } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";

export async function load({ locals, url }) {
    if(!locals.user) throw redirect(307, "/login");

    const events = await tba(`events/2024`);
    // const events = [];

    return{
        events,
        competition:locals.competition,
        scout:locals.user.username,
        host:url.host,
    }
}

export const actions = {
    default: async function({ request, locals }){
        const input = await request.formData();
        const data = JSON.parse(input.get("data"));
        try {
            if (locals.competition?.key == data.event) {
                await credits.transaction(locals.user.username, 100, `Scouted ${data.event}_qm${data.match}:${data.team}`);
            } else if (data.event != "2024practice") {
                await credits.transaction(locals.user.username, 20, `Scouted ${data.event}_qm${data.match}:${data.team} (extra)`);
            } else if (data.event == "2024practice") {
                await credits.transaction(locals.user.username, 20, `Scouted ${data.event}_qm${data.match}:${data.team} (extra)`)
            }

            const db = new ScoutData(data);
            await db.save();

            console.log(data);

            if (data.event != "2024practice") {
                await stats.setStat(data.scout, "matches_scouted", (await stats.getStat(data.scout, "matches_scouted")) + 1);
            }
        } catch (error) {
            console.error("Error occurred during save:", error);
            const dataExport = JSON.stringify(data);
            return fail(400, {status:"offline", info:dataExport});
        }
        throw redirect(307, "/hub");
    }
}