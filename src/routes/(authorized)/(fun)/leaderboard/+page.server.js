import { User } from "$lib/models";

export async function load({ locals }){
    const list = await User.find().sort({credits:-1}).limit(10);

    let final = [];
    list.forEach(item=>{
        final.push({
            user: item.name.first + " " + item.name.last,
            credits: item.credits
        });
    })

    return {
        user: locals.user.username,
        list: final
    }
}