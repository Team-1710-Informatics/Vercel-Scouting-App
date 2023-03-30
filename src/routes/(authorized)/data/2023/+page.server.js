import tba from "$lib/modules/tba";

export async function load({locals}){
    const events = await tba(`events/2023`);

    events.push({
        short_name: "Practice"
        key: "2023practice"
    })

    return { events, competition:locals.competition?.key };
}