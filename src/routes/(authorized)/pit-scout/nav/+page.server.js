import { X_TBA_AUTHKEY } from "$env/static/private";
import { pitdata2023 } from "$lib/server/models";

export async function load(){
    // const res = await fetch(`https://thebluealliance.com/api/v3/events/2023`,{
    //     headers:{
    //         "X-TBA-Auth-Key":X_TBA_AUTHKEY
    //     }
    // });

    // const teams = await res.json();

    // console.log(JSON.stringify(teams));

    let scouted = [];

    const entries = await pitdata2023.find();

    entries.forEach(e=>{
        scouted.push(e.team);
    })

    return {
        scouted
    }
}