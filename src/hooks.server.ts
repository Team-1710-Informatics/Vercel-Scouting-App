import { MONGODB_MAIN, MONGODB_COMMUNITY } from '$env/static/private';

import mongoose from 'mongoose';
import { User } from '$lib/server/models';
import { dev } from '$app/environment';

import { redirect, type Handle } from "@sveltejs/kit";

// @ts-ignore
import { DateTime } from 'luxon';
import tba from '$lib/modules/tba';
try {
	if (dev) await mongoose.connect(MONGODB_COMMUNITY);
	else if (!dev) await mongoose.connect(MONGODB_MAIN);
	console.log("Connected to MongoDB");
} catch (error) {
	console.log("Error connecting to MongoDB:", error);
}

// if(dev) await mongoose.connect(MONGODB_COMMUNITY);
// else if(!dev) await mongoose.connect(MONGODB_MAIN);

export const handle = (async function({ event, resolve }) {
    const token = event.cookies.get("session");

    if(!token || event.url.pathname == "/logout") return await resolve(event);

    const user = JSON.parse(JSON.stringify(await User.findOne({ token:token })));

    if(token && !user) {
        throw redirect(307, "/logout");
    }

    let res = await tba(`team/frc${user.team}/events/${new Date().getFullYear()}`);
    let c, n;
    if(!dev){
        c = currComp(res);
        n = nextComp(res);
    }

    event.locals.user = {
        username: user.username,
        name: user.name,
        email: user.email,
        team: user.team,
        stats: user.stats,
        preferences: user.preferences,
        permissions: user.permissions
    }
    if(!dev){
        event.locals.competition = c;
        event.locals.nextCompetition = n;
    }
    
    let response = await resolve(event);
    response.headers.append('Access-Control-Allow-Origin', `https://team1710.com`);
    return response;
}) satisfies Handle;

function nextComp(res:any) {
    let next:any = null;
    let now = Date.now();
    res.forEach((e:any)=>{
        if(timestamp(e.start_date, e.timezone)>now){
            if(next == null) next = e;
            else if(timestamp(next.start_date, e.timezone)>timestamp(e.start_date, e.timezone)) next = e;
        }
    });

    return next;
}

function currComp(res:any){
    let curr:any = null;
    let now = Date.now();
    res.forEach((e:any)=>{
        if(timestamp(e.start_date, e.timezone) <= now && timestamp(e.end_date, e.timezone)+86400000 > now)
            curr = e;
    });

    return curr;
}

function timestamp(d:any, tz:any){
    let array = d.split("-");
    let n = DateTime.local(+array[0], +array[1], +array[2], { zone: tz });
    return n.toMillis();
}
