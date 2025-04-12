import { ScoutData } from '$lib/server/models'
import { pitdata2025 } from '$lib/server/models'
import tba from '$lib/modules/tba.js'
import { seedPredictor } from '$lib/server/models/seedPredictor.js'

export async function load({ params }) {
    const entries = JSON.parse(
        JSON.stringify(await ScoutData.find({ event: params.event }))
    )

    const pitData = JSON.parse(
        JSON.stringify(await pitdata2025.find({ event: params.event }))
    )

    const rankings = await seedPredictor(params.event);

    let data = {
        event: params.event,
        rankings: rankings,
        entries: entries,
        pitData: pitData,
    }

    return { data }
}

