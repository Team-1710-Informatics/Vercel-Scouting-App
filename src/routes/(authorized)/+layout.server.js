import { redirect } from '@sveltejs/kit';

export function load({ locals }){
    // if(!locals.user) throw redirect(307, '/login');
    return {
        user: {
            first: "Ben",
            last: "G",
            credits: 10000
        },
    };
    // return {
    //     user: locals.user,
    // };
}