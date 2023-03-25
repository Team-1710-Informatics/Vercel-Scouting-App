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

    const tickets = JSON.parse(JSON.stringify(await ScambleTicket.find({user:locals.user.username,resolved:false})));

    for(let i = 0; i < tickets.length; i++){
        tickets[i].payout = await payout(tickets[i]);
    }

    return{
        events,
        competition:locals.competition,
        user:locals.user.username,
        tickets
    }
}

export const actions = {
    bet: async function({request, locals}){
        const MIN = 100;
        function max(c){
            let o = c-MIN;
    
            if(c<MIN*1.5){
                o=c/3;
            }
    
            return Math.trunc(o);
        };

        const input = await request.formData();
        const wager = input.get("wager");
        const match = input.get("match");
        const alliance = input.get("alliance");

        const user = await User.findOne({username:locals.user.username});

        if(wager <= 0 || wager > max(user.credits) || wager != Math.trunc(wager)) return;

        if(await ScambleTicket.findOne({user:user.username, match})){
            console.log("Ticket exists, rejecting")
            const tickets = JSON.parse(JSON.stringify(await ScambleTicket.find({user:user.username,resolved:false})));
            return { tickets };
        }

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

        const tickets = JSON.parse(JSON.stringify(await ScambleTicket.find({user:user.username,resolved:false})));

        for(let i = 0; i < tickets.length; i++){
            tickets[i].payout = await payout(tickets[i]);
        }

        return { tickets };
    },

    resolve: async function({ request }){
        const input = await request.formData();
        const user = input.get("user");
        const match = input.get("match");

        const winner = input.get("winner");
        const time = input.get("time");

        const ticket = await ScambleTicket.findOne({user,match});

        if(ticket && !ticket.resolved){
            if(Math.trunc(ticket.timestamp/1000) > time || (time != null && winner==="")){
                await credits.transaction(user, ticket.amount, `Scamble refund`);
            }else if(ticket.alliance === winner){
                await credits.transaction(user, await payout(ticket), `Scamble winnings`);
            }
        }

        ticket.resolved = true;
        await ticket.save();

        const tickets = JSON.parse(JSON.stringify(await ScambleTicket.find({user,resolved:false})));

        for(let i = 0; i < tickets.length; i++){
            tickets[i].payout = await payout(tickets[i]);
        }

        return {tickets};
    }
}

async function payout(t){
    const tickets = await ScambleTicket.find({match:t.match});

    let sums={
        red:0,
        blue:0
    }

    let pot=0;

    for(let i=0;i<tickets.length;i++){
        const res = await results(tickets[i].match);
        if(Math.trunc(tickets[i].timestamp/1000) > res.actual_time && res.actual_time != null)
            continue;

        sums[tickets[i].alliance]+=tickets[i].amount;
        pot+=tickets[i].amount + Math.sqrt(tickets[i].amount)/0.2;
    };

    let portion = t.amount/sums[t.alliance];

    return Math.trunc(portion * pot);
}

async function results(key){
    const results = await fetch(`https://www.thebluealliance.com/api/v3/match/${key}/simple`,{
        headers:{
            "X-TBA-Auth-Key":X_TBA_AUTHKEY
        }
    });

    return (await results.json());
}