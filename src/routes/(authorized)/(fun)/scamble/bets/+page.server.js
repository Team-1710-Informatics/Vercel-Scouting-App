import { X_TBA_AUTHKEY } from "$env/static/private";
import { ScambleTicket, User } from "$lib/server/models";
import credits from "$lib/server/user/credi";

export async function load({ locals }){
    const res = await fetch(`https://thebluealliance.com/api/v3/events/2023`,{
        headers:{
            "X-TBA-Auth-Key":X_TBA_AUTHKEY
        }
    });

    const events = await res.json();

    const tickets = JSON.parse(JSON.stringify(await ScambleTicket.find({user:locals.user.username})));

    return{
        events,
        competition:locals.competition,
        user:locals.user.username,
        tickets
    }
}

export const actions = {
    bet: async function({request, locals}){
        const input = await request.formData();
        const wager = input.get("wager");
        const match = input.get("match");
        const alliance = input.get("alliance");

        const user = await User.findOne({username:locals.user.username});

        if(wager <= 0 || wager > user.credits*0.25 || wager != Math.trunc(wager)) return;

        const ticket = new ScambleTicket({
            user:user.username,
            match,
            amount:wager,
            alliance,
            timestamp:Date.now(),
            resolved:false
        })

        await credits.transaction(user.username, -wager, `Scamble: Place bet on ${match}`)
        await ticket.save();

        const tickets = JSON.parse(JSON.stringify(await ScambleTicket.find({user:user.username})));

        return { tickets };
    }
}