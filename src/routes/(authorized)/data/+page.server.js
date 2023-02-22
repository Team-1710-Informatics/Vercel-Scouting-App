import { ScoutData } from "$lib/models";

export async function load(){
    let data = JSON.parse(JSON.stringify(await ScoutData.find({event:"2023lswz"})));

    return {
        list: data
    }
}