import { ScoutData } from '$lib/server/models'
import { pitdata2025 } from '$lib/server/models'

export async function load({ params }) {
    const entries = JSON.parse(
        JSON.stringify(await ScoutData.find({ event: params.event }))
    )

    const pitData = JSON.parse(
        JSON.stringify(await pitdata2025.find({ event: params.event }))
    )

    console.log(pitData)

    let data = {
        event: params.event,
        entries: entries,
        pitData: pitData,
    }

    console.log(params.event)

    return { data }
}
