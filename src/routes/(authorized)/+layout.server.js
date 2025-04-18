import { redirect } from '@sveltejs/kit'
import { dev } from '$app/environment'

export function load({ locals }) {
    if (dev) {
        return {
            user: {
                username: 'Bnenne',
                name: 'Ben',
                credits: 10000,
            },
        }
    } else if (!dev) {
        if (!locals.user) throw redirect(307, '/login')
        return {
            user: locals.user,
        }
    }
}
