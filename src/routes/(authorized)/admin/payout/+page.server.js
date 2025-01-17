import { User } from '$lib/server/models/index.js'
import credits from '$lib/server/user/credi.ts'

export const actions = {
    default: async ({ request })=>{
        const input = await request.formData();
        const data = JSON.parse(input.get("data"));

        console.log(data.selected)

        const reason = "role payout";

        let medias = [];

        if (data.selected.includes('media')) {
            console.log("media")
            medias = await User.find({"permissions": "media"});
            console.log(medias);
        }

        let pits = []

        if (data.selected.includes('pit')) {
            pits = await User.find({"permissions": "pit"});
        }

        let admins = [];

        if (data.selected.includes('admin')) {
            admins = await User.find({"permissions": "admin"});
        }

        let alreadyPaid = [];

        let payout = data.amount[data.selected.indexOf("media")]
        for (let i = 0; i < medias.length; i++){
            let user = medias[i];
            if (alreadyPaid.includes(user.username)) {
                return
            } else {
                alreadyPaid.push(user.username);
            }

            let creds = user.credits
            creds += payout;
            await credits.transaction(user.username, creds, reason);
        }

        payout = data.amount[data.selected.indexOf("pit")]
        for (let i = 0; i < pits.length; i++){
            let user = pits[i];
            if (alreadyPaid.includes(user.username)) {
                return
            } else {
                alreadyPaid.push(user.username);
            }

            let creds = user.credits
            creds += payout;
            await credits.transaction(user.username, creds, reason);
        }

        payout = data.amount[data.selected.indexOf("admin")]
        for (let i = 0; i < admins.length; i++){
            let user = admins[i];
            if (alreadyPaid.includes(user.username)) {
                return
            } else {
                alreadyPaid.push(user.username);
            }

            let creds = user.credits
            creds += payout;
            await credits.transaction(user.username, creds, reason);
        }

    }
};