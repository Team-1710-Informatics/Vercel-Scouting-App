import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
    return {
        competition:locals.competition,
        nextCompetition:locals.nextCompetition
    }
}

export const actions = {
    //@ts-ignore
    default: async ({request, cookies, locals})=>{
        const input = await request.formData();
        const data = JSON.parse(input.get("data"));

        const out = {
            event:data.event,
            match:data.match,
            alliance:data.alliance,
            team:data.team,
            scout:locals.user.username,
            pregame:{
                start:data.start,
                preload:data.preload
            }
        }

        cookies.set('scout', JSON.stringify(out), {
            path: '/',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24
        });

        throw redirect(307, "./match");
    }
}