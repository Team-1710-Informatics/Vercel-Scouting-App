import { X_TBA_AUTHKEY } from "$env/static/private";

export async function load(){
    const res = await fetch(`https://thebluealliance.com/api/v3/events/2023`,{
        headers:{
            "X-TBA-Auth-Key":X_TBA_AUTHKEY
        }
    });

    const events = JSON.stringify(await res.json());
    return{
        events
    }
}