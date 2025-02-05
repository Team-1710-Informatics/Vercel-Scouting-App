import { ScoutData } from '$lib/server/models'
import { json } from '@sveltejs/kit'

/**
 * API Endpoint that returns team data from a specified match.
 * @param {string} event event that match is from.
 * @param {string} match specific match needed.
 * @returns scout data from match
 */

export async function GET({ params }) {
    const data = await ScoutData.find({
        event: params.event,
        match: params.match,
        team: params.team,
    })

    return json({ data })
}
