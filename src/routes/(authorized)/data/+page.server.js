import { ScoutData } from "$lib/server/models";

export async function load(){
    let data = JSON.parse(JSON.stringify(await ScoutData.find({event:"2023lswz"})));

    return {
        list: data
    }
}