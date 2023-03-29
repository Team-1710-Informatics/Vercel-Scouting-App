import { X_TBA_AUTHKEY } from '$env/static/private';
import { error } from '@sveltejs/kit';

export const actions = {
    default: async function({request}){
        const req = await request.formData();
        const team = req.get("team");

        const res = await fetch(`https://thebluealliance.com/api/v3/team/frc${team}`, {
            headers: {
                "X-TBA-Auth-Key": X_TBA_AUTHKEY
            }
        });

        if(res.error) throw error(420, 'error with form, team doesnt exist or other error');
        
    }
}


