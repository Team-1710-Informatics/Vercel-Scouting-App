import { X_TBA_AUTHKEY } from "$env/static/private";
import { pitdata2023, User } from "$lib/server/models";
import credits from "$lib/server/user/credi";
import { redirect } from "@sveltejs/kit";

export async function load({ locals, fetch, params }){
    const res = await fetch(`https://thebluealliance.com/api/v3/events/2023`,{
        headers:{
            "X-TBA-Auth-Key":X_TBA_AUTHKEY
        }
    });

    const events = await res.json();

    let result = JSON.parse(JSON.stringify(await User.find({ team:locals.user.team })));

    const members = [];
    result.forEach(m=>{
        members.push({
            username:m.username,
            name:m.name
        })
    })

    return{
        events,
        competition:locals.competition,
        scout:locals.user.username,
        team:params?.team,
        members
    }
}

export const actions = {
    default: async function({request,locals}){
        const input = await request.formData();

        let output = {}

        const items = ["event","team","intakeCube","intakeCone","shelfStation","chuteStation","floorStation","floor","placeHigh","placeMid","placeLow","mainStrategy","autoStrategy","averageScore","defenseCapability","defenseExperience","chargeStationMain","chargeStationAuto","piecePreferance",,"drivetrain","topSpeed","framePerimeter","weight","thoughts","otherScouts"]

        items.forEach(item=>{
            output[item]=input.get(item)
        })

        output.scout = locals.user.username;

        if(!pitdata2023.findOne({team:+output["team"], event:output["event"]})){
            const db = new pitdata2023(output);
            await db.save();

            await credits.transaction(output.scout, 350, `Pit scouted ${output.team}`);

            if(output.otherScouts != "none")
                await credits.transaction(output.otherScouts, 350, `Co-pit scouted ${output.team}`);
        }

        throw redirect(307, "/pit-scout/nav");
    }
}
