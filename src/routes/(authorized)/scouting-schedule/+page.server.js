import { schedulePositions } from "$lib/server/models";

export async function load({ locals }) {
    const data = await schedulePositions.find();

    let leads = [];
    let scouts = [];
    let backups = [];

    data.forEach(e => {
        if (e.position == 'Lead Scout'){
            leads.push(e);
        }
        if (e.position == 'scout'){
            scouts.push(e);
        }
        if (e.position == 'Backup'){
            backups.push(e);
        }
    })

    let day = [];

    leads.forEach(e => {
        day.push(e.day);
    })

    let uniqueDay = [...new Set(day)].sort();

    let days = JSON.stringify(uniqueDay);

    let shifts = [];
    let scout = [];
    let backup = [];

    for(let i = 0; i < uniqueDay.length; i++){
        leads.forEach(e => {
            if(e.day == uniqueDay[i])
            shifts.push({day: uniqueDay[i], start: e.start, end: e.end, name: e.name});
        })
        scouts.forEach(e => { 
            if(e.day == uniqueDay[i])
            scout.push({day: uniqueDay[i], start: e.start, end: e.end, name: e.name, team: e.team});
        })
        backups.forEach(e => { 
            if(e.day == uniqueDay[i])
            backup.push({day: uniqueDay[i], start: e.start, end: e.end, name: e.name});
        })
    }

    let shift = JSON.stringify(shifts);
    let s = JSON.stringify(scout);
    let b = JSON.stringify(backup);
    let user = JSON.stringify(locals.user);

    return {
        days:days,
        shifts:shift,
        scouts:s,
        backups:b,
        user: user
    }
}