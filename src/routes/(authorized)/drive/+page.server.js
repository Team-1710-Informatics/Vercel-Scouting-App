import { redirect } from '@sveltejs/kit'

export async function load({ locals }) {
    const permissions = locals.user.permissions
    console.log(permissions)

    let admin = false

    permissions.forEach((perm) => {
        if (perm === 'admin' || perm === 'coo' || perm === 'drive') admin = true
    })

    if (admin === false) console.log(permissions)
    throw redirect(301, './hub')
}
