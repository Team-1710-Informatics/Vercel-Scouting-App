import { X_TBA_AUTHKEY } from '$env/static/private'
import { json } from '@sveltejs/kit'

/**
 * Handles GET requests to the specified route on The Blue Alliance API.
 *
 * @param {Object} context - The context object containing parameters and fetch function.
 * @param {Object} context.params - The parameters object containing the route.
 * @param {Function} context.fetch - The fetch function to make HTTP requests.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response from The Blue Alliance API.
 */
export async function GET({ params, fetch }) {
    const res = await fetch(
        `https://thebluealliance.com/api/v3/${params.route}`,
        {
            headers: {
                'X-TBA-Auth-Key': X_TBA_AUTHKEY,
            },
        }
    )

    return json(await res.json())
}
