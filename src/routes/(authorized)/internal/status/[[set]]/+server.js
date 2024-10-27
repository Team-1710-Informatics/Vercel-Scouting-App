import { User } from '$lib/server/models'
import { json } from '@sveltejs/kit'

export async function GET({ locals, params }) {
    const user = await User.findOne({ username: locals.user.username })

    let status = params?.set
    if (status) {
        user.status = status
        await user.save()
    } else status = user.status

    return json({ status })
}
