import { User } from '$lib/server/models'
import { json } from '@sveltejs/kit'

export async function GET({ params }) {
    const user = await User.findOne({ username: params.user })

    if (!user) return json(null)

    return json(user.credits)
}
