import { ScoutData } from '$lib/server/models';

export async function load({ params }){
    const entries = JSON.parse(JSON.stringify(await ScoutData.find({ event:params.event })));
    
    entries.forEach(e=>{
        delete e.postgame;
    })

    return { entries }
}