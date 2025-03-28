import { User } from '$lib/server/models'
import { json } from '@sveltejs/kit'

/**
 * API endpoint that returns a given user's token balance
 * @param {string} username user being accessed
 * @returns amount of tokens in user's balance
 */

export async function GET({ params }) {
    const user = await User.findOne({ username: params.user })

    if (!user) return json(null)

    return json(user.tokens)
}