import { X_TBA_AUTHKEY } from "$env/static/private";
import { ScambleTicket, User } from "$lib/server/models";
import credits from "$lib/server/user/credi";

export async function load({ locals, fetch }){
    const res = await fetch(`https://thebluealliance.com/api/v3/events/2023`,{
        headers:{
            "X-TBA-Auth-Key":X_TBA_AUTHKEY
        }
    });

    const events = await res.json();

    const tickets = await getTickets(locals.user.username);

    let all = (await ScambleTicket.find({user:locals.user.username}));


    return{
        events,
        competition:locals.competition,
        user:locals.user.username,
        tickets,
        last:all?.[all.length-1].match.split("_")[0]
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

        if(ticket && !ticket.resolved){
            if(Math.trunc(ticket.timestamp/1000) > time || (time != null && winner==="")){
                await credits.transaction(user, ticket.amount, `Scamble refund for ${match}`);
            }else if(ticket.alliance === winner){
                await credits.transaction(user, (await payout(ticket))[0], `Scamble winnings for ${match}`);
            }
        }

        ticket.resolved = true;
        await ticket.save();

        const tickets = await getTickets(user);

        return {tickets};
    }
}

async function getTickets(user){
    const tickets = JSON.parse(JSON.stringify(await ScambleTicket.find({user,resolved:false})));

    for(let i = 0; i < tickets.length; i++){
        const others = await ScambleTicket.find({match:tickets[i].match});
        tickets[i].payout = (await payout(tickets[i],others))[0];
        tickets[i].portion = (await payout(tickets[i],others))[1];
        tickets[i].percent = await percentage(tickets[i],others);
        tickets[i].fixed = (await payout(tickets[i],others))[2];
        tickets[i].others = others.length;
    }

    return tickets;
}

async function percentage(t, tickets){
    let matching = 0;

    tickets.forEach(ticket=>{
        if(ticket.alliance === t.alliance) matching++;
    })

    return Math.round((matching/tickets.length)*100);
}

async function payout(t, tickets){
    //const tickets = await ScambleTicket.find({match:t.match});

    let sums={
        red:0,
        blue:0
    }

    let pot=0;

    for(let i=0;i<tickets.length;i++){
        const res = await results(tickets[i].match);
        if(Math.trunc(tickets[i].timestamp/1000) > res.actual_time && res.actual_time != null)
            continue;

        sums[tickets[i].alliance]+=tickets[i].amount + Math.sqrt(tickets[i].amount)/0.2;
        pot+=tickets[i].amount + Math.sqrt(tickets[i].amount)/0.2;
    };

    let portion = (t.amount+Math.sqrt(t.amount)/0.2)/sums[t.alliance];

    return [Math.trunc(portion * pot),Math.ceil((sums[t.alliance]/pot)*100),Math.round(((t.amount+Math.sqrt(t.amount)/0.2)/pot)*100)];
}

async function results(key){
    const results = await fetch(`https://www.thebluealliance.com/api/v3/match/${key}/simple`,{
        headers:{
            "X-TBA-Auth-Key":X_TBA_AUTHKEY
        }
    });

    let o = await results.json();

    if(key==="2023mose_sf3m1") o.winning_alliance = "red";

    return (o);
}