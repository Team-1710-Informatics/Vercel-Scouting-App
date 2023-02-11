export function load({ locals }) {
    console.log(locals.competition);
    return {
        competition:locals.competition
    }
}

export const actions = {
    //@ts-ignore
    default: async ({request, cookies, locals})=>{
        const input = await request.formData();
        const data = JSON.parse(input.get("data"));

        // cookies.set('scout', JSON.stringify("out"), {
        //     path: '/',
        //     sameSite: 'strict',
        //     maxAge: 60 * 60 * 24
        // });
    }
}