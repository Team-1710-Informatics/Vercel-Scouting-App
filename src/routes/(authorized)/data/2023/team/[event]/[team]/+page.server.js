import { pitdata2023 } from '$lib/server/models';

export async function load({ params }){
    const pit = JSON.parse(JSON.stringify(await pitdata2023.findOne({event:params.event, team:+params.team})));
    return { pit };
}