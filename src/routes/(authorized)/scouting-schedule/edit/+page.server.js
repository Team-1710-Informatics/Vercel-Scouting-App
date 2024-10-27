import { schedulePositions, User, scheduleDays } from "$lib/server/models";

export async function load() {
    const users = await User.find();
    const schedulepositions = await schedulePositions.find();
    const scheduledays = await scheduleDays.find();

    users.sort((a, b) => a.name.first.localeCompare(b.name.first));

    let selected = scheduledays[0].id;

    let leads = [];
    let scouts = [];
    let backups = [];

    schedulepositions.forEach(e=>{
        if (e.position == "lead") {
            leads.push(e)
        }
        if (e.position == "scout") {
            scouts.push(e)
        }
        if (e.position == "backup") {
            backups.push(e)
        }
    })

    return{
        users:JSON.stringify(users),
        scheduledays:JSON.stringify(scheduledays),
        selected:selected,
        leads:JSON.stringify(leads),
        scouts:JSON.stringify(scouts),
        backups:JSON.stringify(backups),
        schedulepositions:JSON.stringify(schedulepositions)
    }
}

export const actions = {
    default: async function({request}){
        const input = await request.formData();
        const scheduledays = await scheduleDays.find();
        const schedulepositions = await schedulePositions.find();

        const formDays = JSON.parse(input.get("days"));
        const formLeads = JSON.parse(input.get("leads"));
        const formScouts = JSON.parse(input.get("scouts"));
        const formBackups = JSON.parse(input.get("backups"));

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
        formBackups.forEach(e=>{
            newPositionIds.push(e.id);
        })
        for(let i = 0; i < formDays.length; i++){
            if(dayIds.includes(formDays[i].id) == true){
                await scheduleDays.updateOne(
                    {id: formDays[i].id},
                    formDays[i]
                );
            }
        }
        for(let i = 0; i < formLeads.length; i++){
            if(positionIds.includes(formLeads[i].id) == true){
                await schedulePositions.updateOne(
                    {id: formLeads[i].id},
                    formLeads[i]
                );
            }
        }
        for(let i = 0; i < formScouts.length; i++){
            if(positionIds.includes(formScouts[i].id) == true){
                await schedulePositions.updateOne(
                    {id: formScouts[i].id},
                    {
                        name: formScouts[i].name,
                        team: formScouts[i].team,
                        releasing: false,
                        position: formScouts[i].position,
                        leadId: formScouts[i].leadId,
                        id: formScouts[i].id
                    }
                );
            }
        }
        for(let i = 0; i < formBackups.length; i++){
            if(positionIds.includes(formBackups[i].id) == true){
                await schedulePositions.updateOne(
                    {id: formBackups[i].id},
                    formBackups[i]
                );
            }
        }

        for(let i = 0; i < formDays.length; i++){
            if(dayIds.includes(formDays[i].id) == false){
                const db = new scheduleDays(formDays[i]);
                await db.save();
            }
        }
        for(let i = 0; i < formLeads.length; i++){
            if(positionIds.includes(formLeads[i].id) == false){
                const db = new schedulePositions(formLeads[i]);
                await db.save();
            }
        }
        for(let i = 0; i < formScouts.length; i++){
            if(positionIds.includes(formScouts[i].id) == false){
                const db = new schedulePositions(formScouts[i]);
                await db.save();
            }
        }
        for(let i = 0; i < formBackups.length; i++){
            if(positionIds.includes(formBackups[i].id) == false){
                const db = new schedulePositions(formBackups[i]);
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
            await scheduleDays.deleteOne(
                {id: deleteDays[i]}
            );
        }
        for(let i = 0; i < deletePositions.length; i++){
            await schedulePositions.deleteOne(
                {id: deletePositions[i]}
            );
        }
    }
}