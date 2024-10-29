import { redirect } from '@sveltejs/kit'

export async function load({ locals }) {
    const permissions = locals.user.permissions

    let admin = false

    for (let i = 0; i < permissions.length; i++) {
        if (
            permissions[i] === 'admin' ||
            permissions[i] === 'coo' ||
            permissions[i] === 'drive'
        ) {
            admin = true
        }
    }

    if (admin === false) {
        throw redirect(301, './hub')
    }
}
