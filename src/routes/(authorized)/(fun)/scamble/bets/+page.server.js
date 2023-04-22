import tba from "$lib/modules/tba";
import { ScambleTicket, User } from "$lib/server/models";
import credi from "$lib/server/user/credi";

export async function load({ locals }){
    const events = await tba("events/" + new Date().getFullYear());

    const last = (await ScambleTicket.find({user:locals.user.username}).limit(1).sort({$natural:-1}))[0];

    const tickets = await getTickets(locals.user.username);

    return {
        events,
        competition:locals.competition,
        user:locals.user.username,
        last:last?.match.split("_")[0],
        tickets
    }
}

export const actions = {
    bet: async function({request, locals}){
        const MIN = 10;
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
            const tickets = await getTickets(user.username);
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

        await credi.transaction(user.username, -wager, `Scamble: Place bet on ${match}`)
        await ticket.save();

        const tickets = await getTickets(user.username);

        return { tickets };
    },

    resolve: async function({ request }){
        const input = await request.formData();
        const user = input.get("user");
        const match = input.get("match");

        const winner = input.get("winner");
        const time = input.get("time");

        const ticket = await ScambleTicket.findOne({user,match});
        const others = await ScambleTicket.find({match:match});

        await punchTicket(ticket);

        if(ticket && !ticket.resolved){
            if(Math.trunc(ticket.timestamp/1000) > time || (time != null && winner==="")){
                await credi.transaction(user, ticket.amount, `Scamble refund for ${match}`);
            }else if(ticket.alliance === winner){
                await credi.transaction(user, ticket.payout, `Scamble winnings for ${match}`);
            }
        }

        ticket.resolved = true;
        await ticket.save();

        const tickets = await getTickets(user);

        return {tickets};
    }
}

async function getTickets(user){
    const tickets = JSON.parse(JSON.stringify(
        await ScambleTicket.find({user,resolved:false})));

    for(let i = 0; i < tickets.length; i++)   
        await punchTicket(tickets[i]);

    return tickets;
}

async function punchTicket(t){
    const all = await ScambleTicket.find({match:t.match});
    const res = await tba(`match/${t.match}/simple`);

    let sums = {red:0,blue:0,total:0}
    let matching = 0;

    for(let i=0;i<all.length;i++){
        //Filter out late bets
        if(
            Math.trunc(all[i].timestamp/1000) > res.actual_time
            && res.actual_time != null
        ) continue;

        // Count matching bets
        if(all[i].alliance===t.alliance) matching++;

        // Add a bonus for payout calculation
        let effective = all[i].amount
            + Math.sqrt(all[i].amount)*20;

        sums[all[i].alliance] += effective;
        sums.total += effective;
    }

    let effective = t.amount
        + Math.sqrt(t.amount)*20;

    let portion = effective/sums[t.alliance];

    t.payout = Math.trunc(portion * sums.total);
    t.portion = Math.round((effective/sums.total)*100);
    t.sameBetPercentageCredits = Math.round((sums[t.alliance]/sums.total)*100);
    t.sameBetPercentage = Math.round((matching/all.length)*100);
    t.others = all.length;
}

