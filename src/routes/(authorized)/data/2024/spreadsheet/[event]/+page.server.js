import { ScoutData2024 } from '$lib/server/models'

export async function load({ params }) {
    const entries = JSON.parse(
        JSON.stringify(await ScoutData2024.find({ event: params.event }))
    )

    // entries.forEach(e=>{
    //     delete e.postgame;
    // })

    return { entries }
}
