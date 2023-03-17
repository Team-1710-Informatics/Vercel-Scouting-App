import { ScoutData } from '$lib/server/models';

export async function load({ params }){
    const data = await ScoutData.find({ event:params.event });
    let entries = [];
    data.forEach(e=>{
        entries.push(e.toObject());
    });

    return { entries }
}