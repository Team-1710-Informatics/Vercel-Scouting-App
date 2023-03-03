import { User } from "$lib/models";

export async function load({ locals }){
    const list = await User.find({team: locals.user.team}).sort({credits:-1})//.limit(10);

    let final = [];
    list.forEach(item=>{
        final.push({
            user: item.name.first + " " + item.name.last,
            uname: item.username,
            credits: item.credits
        });
    })

    return {
        user: locals.user.username,
        list: final
    }
}