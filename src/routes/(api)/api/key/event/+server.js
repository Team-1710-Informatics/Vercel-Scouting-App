import { ScoutData } from '$lib/server/models'
import { json } from '@sveltejs/kit'

export async function GET() {
    const jason = JSON.parse(JSON.stringify(await ScoutData.find()))
    let events = []
    jason.forEach((e) => {
        if (events.includes(e.event)) return
        events.push(e.event)
    })
    return json(events)
}
