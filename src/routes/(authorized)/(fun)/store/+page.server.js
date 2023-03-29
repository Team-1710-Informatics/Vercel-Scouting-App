import { StoreItem } from "$lib/server/models";


export async function load(){
    const items = JSON.parse(JSON.stringify(await StoreItem.find()));
    return({items});
}