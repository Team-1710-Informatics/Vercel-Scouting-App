import tba from '$lib/modules/tba'
import { ScoutData } from '$lib/server/models/index.js'

export async function load({ locals }) {
    let finalEvents = []
    const data = await ScoutData.find({ event: { $regex: /^2024/ } })

    const events = await tba(`events/2024`)

    for (let i = 0; i < events.length; i++) {
        let included = false
        data.forEach((a) => {
            if (events[i].key == a.event) included = true
        })
        if (included) finalEvents.push(events[i])
    }

    finalEvents.push({
        short_name: 'Practice',
        key: '2024practice',
    })

    return { events: finalEvents, competition: locals.competition?.key }
}
