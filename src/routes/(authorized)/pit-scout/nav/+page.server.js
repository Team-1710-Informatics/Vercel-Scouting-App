import { X_TBA_AUTHKEY } from "$env/static/private";
import tba from "$lib/modules/tba";
import { pitdata2024 } from "$lib/server/models";

export async function load({ locals, fetch }){
    // const res = await fetch(`https://thebluealliance.com/api/v3/events/2024`,{
    //     headers:{
    //         "X-TBA-Auth-Key":X_TBA_AUTHKEY
    //     }
    // });

    // const teams = await res.json();

    // console.log(JSON.stringify(teams));

    console.log(fetch);
    console.log(locals);

    let scouted = [];

    const entries = await pitdata2024.find();

    entries.forEach(e=>{
        scouted.push({team:e.team,event:e.event});
    })

    const events = (await fetch(`https://thebluealliance.com/api/v3/events/2024`,{
        headers:{
            "X-TBA-Auth-Key":X_TBA_AUTHKEY
        }
    })).json();

    return {
        scouted,
        current:locals.competition,
        events
    }
}