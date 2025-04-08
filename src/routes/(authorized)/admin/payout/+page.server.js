import { User } from '$lib/server/models/index.js'
import credits from '$lib/server/user/credi.ts'
import tokens from '$lib/server/user/tokens.ts'

export const actions = {
    default: async ({ request })=>{
        const input = await request.formData();
        const data = JSON.parse(input.get("data"));

        // reason for transactions
        const reason = "Role payout";

        const medias = await User.find({"permissions": "media"});
        const pits = await User.find({"permissions": "pit"});
        const admins = await User.find({"permissions": "admin"});
        const drivers = await User.find({"permissions": "drive"});

        let alreadyPaid = []

        data.entries.forEach(entry => {
            const role = entry.role;
            const currency = entry.currency;
            const amount = entry.amount;

            let users;

            switch (role) {
                case "media":
                    users = medias;
                    break;
                case "pit":
                    users = pits;
                    break;
                case "admin":
                    users = admins;
                    break;
                case "drive":
                    users = drivers;
                    break;
            }

            users.forEach(user => {
                if (alreadyPaid.includes(user.username)) return
                alreadyPaid.push(user.username);
                if (currency === "credits") {
                    credits.transaction(user.username, amount, reason);
                } else if (currency === "tokens") {
                    tokens.transaction(user.username, amount, reason);
                }
            })

        })





    }
};