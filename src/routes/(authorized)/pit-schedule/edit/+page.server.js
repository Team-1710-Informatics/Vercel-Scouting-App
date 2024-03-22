import { pitSchedulePositions, User, pitScheduleDays } from "$lib/server/models";

export async function load() {
    const users = await User.find();
    const schedulepositions = await pitSchedulePositions.find();
    const scheduledays = await pitScheduleDays.find();

    users.sort((a, b) => a.name.first.localeCompare(b.name.first));

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
        schedulepositions:JSON.stringify(schedulepositions)
    }
}

export const actions = {
    default: async function({request}){
        const input = await request.formData();
        const scheduledays = await pitScheduleDays.find();
        const schedulepositions = await pitSchedulePositions.find();

        const formDays = JSON.parse(input.get("days"));
        const formLeads = JSON.parse(input.get("leads"));
        const formScouts = JSON.parse(input.get("scouts"));

        let dayIds = [];
        let positionIds = [];

        let newDayIds = [];
        let newPositionIds = [];

        scheduledays.forEach(e=>{
            dayIds.push(e.id);
        })
        schedulepositions.forEach(e=>{
            positionIds.push(e.id);
        })

        formDays.forEach(e=>{
            newDayIds.push(e.id);
        })
        formLeads.forEach(e=>{
            newPositionIds.push(e.id);
        })
        formScouts.forEach(e=>{
            newPositionIds.push(e.id);
        })
        for(let i = 0; i < formDays.length; i++){
            if(dayIds.includes(formDays[i].id) == true){
                await pitScheduleDays.updateOne(
                    {id: formDays[i].id},
                    formDays[i]
                );
            }
        }
        for(let i = 0; i < formLeads.length; i++){
            if(positionIds.includes(formLeads[i].id) == true){
                await pitSchedulePositions.updateOne(
                    {id: formLeads[i].id},
                    formLeads[i]
                );
            }
        }
        for(let i = 0; i < formScouts.length; i++){
            if(positionIds.includes(formScouts[i].id) == true){
                await pitSchedulePositions.updateOne(
                    {id: formScouts[i].id},
                    formScouts[i]
                );
            }
        }

        for(let i = 0; i < formDays.length; i++){
            if(dayIds.includes(formDays[i].id) == false){
                const db = new pitScheduleDays(formDays[i]);
                await db.save();
            }
        }
        for(let i = 0; i < formLeads.length; i++){
            if(positionIds.includes(formLeads[i].id) == false){
                const db = new pitSchedulePositions(formLeads[i]);
                await db.save();
            }
        }
        for(let i = 0; i < formScouts.length; i++){
            if(positionIds.includes(formScouts[i].id) == false){
                const db = new pitSchedulePositions(formScouts[i]);
                await db.save();
            }
        }
        
        let deleteDays = [];
        let deletePositions = [];

        dayIds.forEach(e=>{
            if(newDayIds.includes(e) == false){
                deleteDays.push(e);
            }
        })
        positionIds.forEach(e=>{
            if(newPositionIds.includes(e) == false){
                deletePositions.push(e);
            }
        })

        for(let i = 0; i < deleteDays.length; i++){
            await pitScheduleDays.deleteOne(
                {id: deleteDays[i]}
            );
        }
        for(let i = 0; i < deletePositions.length; i++){
            await pitSchedulePositions.deleteOne(
                {id: deletePositions[i]}
            );
        }
    }
}