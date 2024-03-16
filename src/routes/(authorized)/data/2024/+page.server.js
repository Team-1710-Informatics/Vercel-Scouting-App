import tba from "$lib/modules/tba";

export async function load({locals}){
    const events = await tba(`events/2024`);

    events.push({
        short_name: "Practice",
        key: "2024practice"
    })

    return { events, competition:locals.competition?.key };
}