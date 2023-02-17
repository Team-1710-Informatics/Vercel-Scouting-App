import { redirect } from "@sveltejs/kit";

export function load({ cookies }) {
    let predata;
    try{
        predata = JSON.parse(cookies.get("scout"))
    }catch{ throw redirect(307, "./pre"); }
    return {
        scout:predata
    }
}

export const actions = {
    default: async ({ request, cookies })=>{
        const input = await request.formData();
        const data = JSON.parse(input.get("data"));

        let entry = {...JSON.parse(cookies.get("scout")), postgame:data};
        console.log(JSON.stringify(entry));

        cookies.set('scout', '', {
            path: '/',
            expires: new Date(0)
        })
    }
}