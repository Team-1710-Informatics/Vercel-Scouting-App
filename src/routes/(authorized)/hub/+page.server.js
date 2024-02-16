import tba from '$lib/modules/tba';
import { DateTime } from 'luxon';
import { schedulePositions } from "$lib/server/models";

export async function load({ locals }){
    const scheduleData = await schedulePositions.find();

    let leads = [];
    let scouts = [];
    let backups = [];

    scheduleData.forEach(e => {
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

    const data = await tba(`team/frc${locals.user.team}/events/${new Date().getFullYear()}`);

    function timestamp(d, tz){
        let array = d.split("-");
        let n = DateTime.local(+array[0], +array[1], +array[2], { zone: tz });
        return n.toMillis();
    }

    let events = [];
    data.forEach(event=>{
        events.push({
            name: event.name,
            date: timestamp(event.start_date, event.timezone),
            end: timestamp(event.end_date, event.timezone)
        });
    });
    function isTimeInRange(startTime, endTime, targetTime) {
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);
        const targetDate = new Date(targetTime);
      
        return targetDate >= startDate && targetDate <= endDate;
    }
    let previewLead = {name: '', start: '', end: ''};
    let previewScouts = [];
    let previewBackups = [];
    leads.forEach(e => {
        let targetTime = new Date('2024-03-13T14:30:00.000Z');
        let startTime = new Date(e.start);
        let endTime = new Date(e.end);
        if(isTimeInRange(startTime, endTime, targetTime)){
            previewLead = e;
        }
    })
    scouts.forEach(e => {
        if(e.day == previewLead.day && e.start == previewLead.start && e.end == previewLead.end){
            previewScouts.push(e);
        }
    })
     backups.forEach(e => {
        if(e.day == previewLead.day && e.start == previewLead.start && e.end == previewLead.end){
            previewBackups.push(e);
        }
    })
    let p = JSON.stringify(previewLead);
    let s = JSON.stringify(previewScouts);
    let b = JSON.stringify(previewBackups);
    return {
        events: events,
        permissions: locals.user.permissions,
        user: locals.user.name.first,
        team: locals.user.team,
        previewLead: p,
        previewScouts: s,
        previewBackups: b
    };
}