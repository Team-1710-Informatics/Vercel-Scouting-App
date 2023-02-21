import { X_TBA_AUTHKEY } from "$env/static/private";

export async function load({ locals }) {
    if(!locals.user) throw redirect(307, "/login");

    const res = await fetch(`https://thebluealliance.com/api/v3/events/2023`,{
        headers:{
            "X-TBA-Auth-Key":X_TBA_AUTHKEY
        }
    });

    const events = await res.json();

    return{
        events,
        competition:locals.nextCompetition,
        scout:locals.user.username
    }
}