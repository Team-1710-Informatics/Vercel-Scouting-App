import { X_TBA_AUTHKEY } from "$env/static/private";
import { json } from "@sveltejs/kit"

export async function GET({params, fetch}){
    const res = await fetch(`https://thebluealliance.com/api/v3/${params.route}`,{
        headers:{
            "X-TBA-Auth-Key":X_TBA_AUTHKEY
        }
    });

    return json(await res.json());
}