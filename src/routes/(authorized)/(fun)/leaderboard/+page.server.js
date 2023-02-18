import { User } from "$lib/models";

export async function load({ locals }){
    const list = await User.find().sort({credits:-1}).limit(10);

    let b = false;
    let final = [];
    list.forEach(item=>{
        if(item.username == locals.user.username) b = true;
        final.push({
            user: item.name.first + " " + item.name.last,
            credits: item.credits
        });
    })

    if(!b){
        const user = await User.find({username:locals.user.username});
        final.push({
            user: user.name.first + " " + user.name.last,
            credits: item.credits
        });
    }

    return {
        user: locals.user.name.first+" "+locals.user.name.last,
        list: final
    }
}