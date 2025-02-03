import { User } from '$lib/server/models'
import { json } from '@sveltejs/kit'

/**
 * API endpoint that returns a given user's credit balance
 * @param {string} username user being accessed
 * @returns amount of credits in user's balance
 */

export async function GET({ params }) {
    const user = await User.findOne({ username: params.user })

    if (!user) return json(null)

    return json(user.credits)
}
