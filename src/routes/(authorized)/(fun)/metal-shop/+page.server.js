import { User } from '$lib/server/models';
import credi from '$lib/server/user/credi'

export async function load({locals}){
    const user = await User.findOne({username:locals.user.username});

    return{
        user:locals.user.username,
        bismuth:(user.stats?.bismuth??0),
        tungsten:(user.stats?.tungsten??0),
        tourmaline:(user.stats?.tourmaline??0),
        welmanite:(user.stats?.welmanite??0)
    }
}

export const actions = {
    async metalAdd({locals, request}){
        const input = await request.formData();

        await credi.transaction(locals.user.username, -input.get("cost"), `Purchased ${input.get("type")}`);
    
        const user = await User.findOne({username:locals.user.username});

        let addition = {};
        addition[input.get("type")] = (user.stats?.[input.get("type")]??0)+1;

        user.stats = {
            ...user.stats,
            ...addition
        };

        await user.save();

        return user.stats;
    },
    async metalUpgrade({locals, request}){
        let input = await request.formData();
        const user = await User.findOne({username:locals.user.username});
        
        let upgrader = input.get("upgrader"); //what it costs
        let newMetal = (user?.[upgrader]??0); //amount of the cost they have (if cost bismuth, amount of bismuth they have)

        let addition = {};
        addition[upgrader] = (user.stats?.[input.get("upgrader")]??0)-4;
        addition[input.get("type")] = (user.stats?.[input.get("type")]??0)+1;

        user.stats = {
            ...user.stats,
            ...addition
        };
        await user.save();

        return user.stats;
    },
    // async tungstenAdd({locals}){
    //     await credi.transaction(locals.user.username, -4000, "Purchased Tungsten");

    //     const user = await User.findOne({username:locals.user.username});

    //     user.stats = {
    //         ...user.stats,
    //         tungsten:(user.stats?.tungsten??0)+1
    //     };
    //     await user.save();

    //     return {
    //         tungsten:user.stats.tungsten
    //     }
    // },
    // async tourmalineAdd({locals}){
    //     await credi.transaction(locals.user.username, -16000, "Purchased Tourmaline");

    //     const user = await User.findOne({username:locals.user.username});

    //     user.stats = {
    //         ...user.stats,
    //         tourmaline:(user.stats?.tourmaline??0)+1
    //     };
    //     await user.save();

    //     return {
    //         tourmaline:user.stats.tourmaline
    //     }
    // },
    // async welmaniteAdd({locals}){
    //     await credi.transaction(locals.user.username, -64000, "Purchased Welmanite");

    //     const user = await User.findOne({username:locals.user.username});

    //     user.stats = {
    //         ...user.stats,
    //         welmanite:(user.stats?.welmanite??0)+1
    //     };
    //     await user.save();

    //     return {
    //         welmanite:user.stats.welmanite
    //     }
    // },
    
    // async tourmalineUpgrade({locals}){
    //     await credi.transaction(locals.user.username, -64000, "Purchased Welmanite");

    //     const user = await User.findOne({username:locals.user.username});

    //     user.stats = {
    //         ...user.stats,
    //         welmanite:(user.stats?.welmanite??0)+1
    //     };
    //     await user.save();

    //     return {
    //         welmanite:user.stats.welmanite
    //     }
    // },
    // async welmaniteUpgrade({locals}){
    //     await credi.transaction(locals.user.username, -64000, "Purchased Welmanite");

    //     const user = await User.findOne({username:locals.user.username});

    //     user.stats = {
    //         ...user.stats,
    //         welmanite:(user.stats?.welmanite??0)+1
    //     };
    //     await user.save();

    //     return {
    //         welmanite:user.stats.welmanite
    //     }
    // }
}