import { buttonConfig } from "$lib/server/models";

export async function load(){
    const buttons = JSON.stringify(await buttonConfig.find());

    console.log(buttons);

    return {
        data:buttons
    }
}

export const actions = {
    default: async function({request}){
        const input = await request.formData();
        const buttons = await buttonConfig.find();

        const buttonData = JSON.parse(input.get("buttons"));

        let final = [];

        let ids = [];

        console.log("buttonData: " + JSON.stringify(buttonData));

        buttons.forEach(e=>(
            ids.push(e.id)
        ))

        let newIds = [];

        buttonData.forEach(e=>(
            final.push({id: e.id, name: e.name, link: e.link, width: e.width, order: e.order, bMargin: e.bMargin, disabled: e.disabled, team: e.team}),
            newIds.push(e.id)
        ))

        console.log("final: " + JSON.stringify(final));
        console.log("ids: " + JSON.stringify(ids));
        console.log("newIds: " + JSON.stringify(newIds));

        for(let i = 0; i < final.length; i++){
            if(ids.includes(final[i].id) == false){
                const db = new buttonConfig(final[i]);
                await db.save();
            }
        }

        for(let i = 0; i < final.length; i++){
            if(ids.includes(final[i].id) == true){
                await buttonConfig.updateOne(
                    {id: final[i].id},
                    final[i]
                );
            }
        }

        for(let i = 0; i < ids.length; i++){
            if(newIds.includes(ids[i]) == false){
                await buttonConfig.deleteOne(
                    {id: ids[i]}
                );
            }
        }
    }
}