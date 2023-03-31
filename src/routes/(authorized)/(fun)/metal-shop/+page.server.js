import { User } from '$lib/server/models';
import credi from '$lib/server/user/credi'

export async function load({locals}){
    const user = await User.findOne({username:locals.user.username});

    return{
        user:locals.user.username,
        bismuth:(user.stats?.bismuth??0)
    }
}

export const actions = {
    async default({locals}){
        await credi.transaction(locals.user.username, -1000, "Purchased Bismuth");

        const user = await User.findOne({username:locals.user.username});

        user.stats = {
            ...user.stats,
            bismuth:(user.stats?.bismuth??0)+1
        };
        await user.save();

        return {
            bismuth:user.stats.bismuth
        }
    }
}