import { X_TBA_AUTHKEY } from '$env/static/private';
import { DateTime } from 'luxon';

export async function load({ locals, url }){
    const res = await fetch(`https://thebluealliance.com/api/v3/team/frc${locals.user.team}/events/${new Date().getFullYear()}`, {
        headers: {
            "X-TBA-Auth-Key": X_TBA_AUTHKEY
        }
    });

    function timestamp(d, tz){
        let array = d.split("-");
        let n = DateTime.local(+array[0], +array[1], +array[2], { zone: tz });
        return n.toMillis();
    }

    const data = await res.json();
    let events = [];
    data.forEach(event=>{
        events.push({
            name: event.name,
            date: timestamp(event.start_date, event.timezone),
            end: timestamp(event.end_date, event.timezone)
        });
    });

    return {
        events: events,
        permissions: locals.user.permissions,
        user: locals.user.name.first,
        team: locals.user.team
    };
}