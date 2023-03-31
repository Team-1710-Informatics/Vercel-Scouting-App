import { User } from "$lib/server/models";

export async function load({ locals }){
    const list = await User.find({team: locals.user.team}).sort({"credits":-1})//.limit(10);

    let final = [];
    list.forEach(item=>{
        final.push({
            user: item.name.first + " " + item.name.last,
            uname: item.username,
            stats:{
                credits: item.credits,
                bismuth: item.stats?.bismuth??0
            }
        });
    })

    return {
        user: locals.user.username,
        list: final
    }
}