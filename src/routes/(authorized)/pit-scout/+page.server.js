import { X_TBA_AUTHKEY } from "$env/static/private";
import { pitdata2023 } from "$lib/server/models";
import credits from "$lib/server/user/credi";
import { redirect } from "@sveltejs/kit";

export async function load({ locals, fetch }){
    const res = await fetch(`https://thebluealliance.com/api/v3/events/2023`,{
        headers:{
            "X-TBA-Auth-Key":X_TBA_AUTHKEY
        }
    });

    const events = await res.json();

    return{
        events,
        competition:locals.competition,
        scout:locals.user.username
    }
}

export const actions = {
    default: async function({request,locals}){
        const input = await request.formData();

        let output = {}

        const items = ["event","team","intakeCube","intakeCone","shelfStation","chuteStation","floorStation","floor","placeHigh","placeMid","placeLow","mainStrategy","autoStrategy","averageScore","topSpeed","defenseCapability","defenseExperiance","chargeStationMain","chargeStationAuto","drivetrain","piecePreferance","framePerimeter","weight","thoughts","otherScouts"]

        items.forEach(item=>{
            output[item]=input.get(item)
        })

        output.scout = locals.user.username;

        const db = new pitdata2023(output);
        await db.save();

        await credits.transaction(output.scout, 200, `Pit scouted ${output.team}`);

        throw redirect(307, "nav");
    }
}
