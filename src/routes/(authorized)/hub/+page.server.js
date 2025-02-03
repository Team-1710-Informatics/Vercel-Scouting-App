import tba from '$lib/modules/tba'
import { DateTime } from 'luxon'
import { schedulePositions, User, buttonConfig } from '$lib/server/models'

export async function load({ locals }) {
    const scheduleData = await schedulePositions.find()
    const buttons = JSON.stringify(await buttonConfig.find())

    let leads = []
    let scouts = []
    let backups = []

    scheduleData.forEach((e) => {
        if (e.position == 'Lead Scout') {
            leads.push(e)
        }
        if (e.position == 'scout') {
            scouts.push(e)
        }
        if (e.position == 'Backup') {
            backups.push(e)
        }
    })

    const data = await tba(
        `team/frc${locals.user.team}/events/${new Date().getFullYear()}`
    )
    console.log('nyan', data)

    function timestamp(d, tz) {
        let array = d.split('-')
        let n = DateTime.local(+array[0], +array[1], +array[2], { zone: tz })
        return n.toMillis()
    }

    let events = []
    try {
        data.forEach(event=>{
            events.push({
                name: event.name,
                date: timestamp(event.start_date, event.timezone),
                end: timestamp(event.end_date, event.timezone)
            });
        });
    }
    catch (error){
        console.log('error', error)
    }
    console.log('meow', events)

    function isTimeInRange(startTime, endTime, targetTime) {
        const startDate = new Date(startTime)
        const endDate = new Date(endTime)
        const targetDate = new Date(targetTime)

        return targetDate >= startDate && targetDate <= endDate
    }
    let previewLead = { name: '', start: '', end: '' }
    let previewScouts = []
    let previewBackups = []
    leads.forEach((e) => {
        let targetTime = new Date()
        let startTime = new Date(e.start)
        let endTime = new Date(e.end)
        if (isTimeInRange(startTime, endTime, targetTime)) {
            previewLead = e
        }
    })
    scouts.forEach((e) => {
        if (
            e.day == previewLead.day &&
            e.start == previewLead.start &&
            e.end == previewLead.end
        ) {
            previewScouts.push(e)
        }
    })
    backups.forEach((e) => {
        if (
            e.day == previewLead.day &&
            e.start == previewLead.start &&
            e.end == previewLead.end
        ) {
            previewBackups.push(e)
        }
    })
    let p = JSON.stringify(previewLead)
    let s = JSON.stringify(previewScouts)
    let b = JSON.stringify(previewBackups)

    function isOneHourOrLessBefore(timestamp1, timestamp2) {
        // Convert the timestamps to Date objects
        const date1 = new Date(timestamp1)
        const date2 = new Date(timestamp2)

        // Calculate the time difference in milliseconds
        const timeDifference = date2 - date1

        // Check if the time difference is one hour or less and greater than 0
        const oneHourInMilliseconds = 60 * 60 * 1000 // 1 hour = 60 minutes * 60 seconds * 1000 milliseconds
        return timeDifference > 0 && timeDifference <= oneHourInMilliseconds
    }

    let upcomingLead = { name: '', start: '', end: '' }

    leads.forEach((e) => {
        let timestamp1 = new Date()
        let timestamp2 = new Date(e.start)
        if (isOneHourOrLessBefore(timestamp1, timestamp2)) {
            upcomingLead = e
        }
    })

    let upcomingScouts = []
    let upcomingBackups = []

    scouts.forEach((e) => {
        if (
            e.day == upcomingLead.day &&
            e.start == upcomingLead.start &&
            e.end == upcomingLead.end
        ) {
            upcomingScouts.push(e)
        }
    })
    backups.forEach((e) => {
        if (
            e.day == upcomingLead.day &&
            e.start == upcomingLead.start &&
            e.end == upcomingLead.end
        ) {
            upcomingBackups.push(e)
        }
    })

    let x = JSON.stringify(upcomingLead)
    let y = JSON.stringify(upcomingScouts)
    let z = JSON.stringify(upcomingBackups)

    const user = await User.find()

    let users = JSON.stringify(user)

    return {
        events: events,
        permissions: locals.user.permissions,
        user: locals.user.name.first,
        team: locals.user.team,
        previewLead: p,
        previewScouts: s,
        previewBackups: b,
        upcomingLead: x,
        upcomingScouts: y,
        upcomingBackups: z,
        user: locals.user,
        users: users,
        currentButtons: buttons,
    }
}
