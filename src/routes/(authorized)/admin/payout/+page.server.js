import { User } from '$lib/server/models/index.js'

//edit amount paid
const payout = 2400;

export const actions = {
    default: async ({ request })=>{
        const input = await request.formData();
        const data = JSON.parse(input.get("data"));

        const medias = await User.find({"permissions": "media"});
        const pits = await User.find({"permissions": "pit"});

        for (let i = 0; i < medias.length; i++){
            let user = medias[i];
            let creds = user.credits
            creds += payout;
            User.updateOne({"username": user.username}, {$set: {"credits": creds}});
        }

    }
};