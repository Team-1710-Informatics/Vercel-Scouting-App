import { User } from "$lib/server/models";

export default {
    async getStat(username, stat){
        const u = await User.findOne({username:username});
        return u.stats?.[stat];
    },

    async setStat(username, stat, value){
        const u = await User.findOne({username:username});
        u.stats[stat] = value;
        await User.updateOne({username}, {stats:u.stats});
    }
}