import { ScoutData } from "$lib/server/models";
import { json } from "@sveltejs/kit";

export async function GET({ params }){
    const data = (await ScoutData.find(
        {event:params.event,match:params.match,team:params.team}
    ));

    return json({data});
}