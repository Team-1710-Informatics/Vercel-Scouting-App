import { ScoutData } from "$lib/models";

export async function load(){
    const list = await ScoutData.find({event:"2023practice"});
    let final = [];

    list.forEach(item=>{
        final.push({
            team:item.team,
            match:item.match,
            score:item.getIndividualScore(),
            rating:item.postgame.rating
        });
    })

    return {
        list:final
    }
}