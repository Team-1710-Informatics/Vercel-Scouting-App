import {
    schedulePositions,
    User,
    scheduleDays,
    releaseReason,
} from '$lib/server/models'

export async function load({ locals }) {
    const users = await User.find()
    const schedulepositions = await schedulePositions.find()
    const scheduledays = await scheduleDays.find()

    console.log(scheduledays)
    if (scheduledays.length === 0) {
        //     create empty schedule day
        const day = new scheduleDays({
            name: 'New Day',
            start: '00:00',
            end: '00:00',
        })
        await day.save()
    }

    let selected = scheduledays[0].id

    let leads = []
    let scouts = []
    let backups = []

    schedulepositions.forEach((e) => {
        if (e.position == 'lead') {
            leads.push(e)
        }
        if (e.position == 'scout') {
            scouts.push(e)
        }
        if (e.position == 'backup') {
            backups.push(e)
        }
    })

    return {
        users: JSON.stringify(users),
        scheduledays: JSON.stringify(scheduledays),
        selected: selected,
        leads: JSON.stringify(leads),
        scouts: JSON.stringify(scouts),
        backups: JSON.stringify(backups),
        schedulepositions: JSON.stringify(schedulepositions),
        user: locals.user.username,
        permissions: JSON.stringify(locals.user.permissions),
    }
}

export const actions = {
    release: async function ({ request }) {
        const input = await request.formData()
        const days = await scheduleDays.find()

        const reason = JSON.parse(input.get('reason'))
        const infoScout = JSON.parse(input.get('infoScout'))
        const infoLead = JSON.parse(input.get('infoLead'))

        let day = ''

        days.forEach((e) => {
            if (e.id == infoLead.dayId) {
                day = e.name
            }
        })

        const db = new releaseReason({
            name: infoScout.name,
            leadId: infoScout.leadId,
            day: day,
            start: infoLead.start,
            end: infoLead.end,
            id: infoScout.id,
            reason: reason,
        })
        await db.save()

        await schedulePositions.updateOne(
            {
                name: infoScout.name,
                team: infoScout.team,
                releasing: infoScout.releasing,
                position: infoScout.position,
                leadId: infoScout.leadId,
                id: infoScout.id,
            },
            {
                name: infoScout.name,
                team: infoScout.team,
                releasing: true,
                position: infoScout.position,
                leadId: infoScout.leadId,
                id: infoScout.id,
            }
        )
    },
    pickup: async function ({ request, locals }) {
        const input = await request.formData()

        const infoScout = JSON.parse(input.get('info'))

        await schedulePositions.updateOne(
            {
                name: infoScout.name,
                team: infoScout.team,
                releasing: infoScout.releasing,
                position: infoScout.position,
                leadId: infoScout.leadId,
                id: infoScout.id,
            },
            {
                name: locals.user.username,
                team: infoScout.team,
                releasing: false,
                position: infoScout.position,
                leadId: infoScout.leadId,
                id: infoScout.id,
            }
        )
        await releaseReason.deleteOne({
            name: infoScout.name,
            leadId: infoScout.leadId,
            id: infoScout.id,
        })
    },
}
