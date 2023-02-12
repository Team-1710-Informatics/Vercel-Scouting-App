import { MongoClient } from 'mongodb';
import { MONGODB } from '$env/static/private';

import { redirect } from "@sveltejs/kit";

import { X_TBA_AUTHKEY } from '$env/static/private';
import { DateTime } from 'luxon';

const client = new MongoClient(MONGODB);

export async function handle({ event, resolve }) {
    const token = event.cookies.get("session");

    if(!token || event.url.pathname == "/logout") return await resolve(event);

    await client.connect();

    const user = await client.db("main").collection("users").findOne({ token:token });

    if(token && !user) {await client.close(); throw redirect(307, "/logout");}

    let res = await fetch(`https://thebluealliance.com/api/v3/team/frc${user.team}/events/${new Date().getFullYear()}`, {
        headers: { "X-TBA-Auth-Key": X_TBA_AUTHKEY }
    });
    res = await res.json();
    let c = currComp(res);
    let n = nextComp(res);

    if (user) {
        event.locals.user = {
            username: user.username,
            name: user.name,
            email: user.email,
            team: user.team,
            stats: user.stats,
            preferences: user.preferences,
            permissions: user.permissions
        }

        event.locals.competition = c;
        event.locals.nextCompetition = n;
    }
    
    await client.close();
    return await resolve(event);
}

function nextComp(res) {
    let next = null;
    let now = Date.now();
    res.forEach(e=>{
        if(timestamp(e.start_date, e.timezone)>now){
            if(next == null) next = e;
            else if(timestamp(next.start_date, e.timezone)>timestamp(e.start_date, e.timezone)) next = e;
        }
    });

    return next;
}

function currComp(res){
    let curr = null;
    let now = Date.now();
    res.forEach(e=>{
        if(timestamp(e.start_date, e.timezone) <= now && timestamp(e.end_date, e.timezone)+86400000 > now)
            curr = e;
    });

    return curr;
}

function timestamp(d, tz){
    let array = d.split("-");
    let n = DateTime.local(+array[0], +array[1], +array[2], { zone: tz });
    return n.toMillis();
}