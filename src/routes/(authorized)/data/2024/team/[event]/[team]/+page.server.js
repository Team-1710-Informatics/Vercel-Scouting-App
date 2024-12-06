import { pitdata2024 } from '$lib/server/models';

export async function load({ params }){
    const pit = JSON.parse(JSON.stringify(await pitdata2024.findOne({event:params.event, team:+params.team})));

    delete pit.otherScouts;
    delete pit._id;
    delete pit.__v;

    return { pit };
}