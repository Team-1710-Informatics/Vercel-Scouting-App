import { ScoutData } from '$lib/server/models'

export async function load({ params }) {
    const entries = JSON.parse(
        JSON.stringify(await ScoutData.find({ event: params.event }))
    )

    let data = {
        event: params.event,
        entries: entries,
    }

    console.log(params.event)

    return { data }
}
