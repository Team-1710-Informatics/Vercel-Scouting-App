import { redirect } from '@sveltejs/kit'

export function load({ locals }) {
    const permissions = locals.user.permissions

    let admin = false

    permissions.forEach((perm) => {
        if (perm == 'admin') admin = true
    })

    if (!admin) throw redirect(301, '/hub')
}
