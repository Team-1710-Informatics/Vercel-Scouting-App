import { redirect } from '@sveltejs/kit'

export function load({ locals }) {
    if (locals.user.team != 1710) throw redirect(307, '/hub')
}
