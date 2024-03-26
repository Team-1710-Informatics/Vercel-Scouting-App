import { pitSchedulePositions, User, pitScheduleDays } from "$lib/server/models";

export async function load({ locals }) {
    const users = await User.find();
    const schedulepositions = await pitSchedulePositions.find();
    const scheduledays = await pitScheduleDays.find();

    let selected = scheduledays[0].id;

    let leads = [];
    let scouts = [];

    schedulepositions.forEach(e=>{
        if (e.position == "lead") { 
            leads.push(e)
        }
        if (e.position == "scout") {
            scouts.push(e)
        }
    })

    return{
        users:JSON.stringify(users),
        scheduledays:JSON.stringify(scheduledays),
        selected:selected,
        leads:JSON.stringify(leads),
        scouts:JSON.stringify(scouts),
        schedulepositions:JSON.stringify(schedulepositions),
        user:locals.user.username,
        permissions:JSON.stringify(locals.user.permissions)
    }
}