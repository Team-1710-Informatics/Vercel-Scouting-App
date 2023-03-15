import { redirect } from "@sveltejs/kit";

export function load({ cookies }){
    let predata;
    try{
        predata = JSON.parse(cookies.get("scout"))
    }catch{ throw redirect(307, "./pre"); }
    
    return {
        predata
    }
}

export const actions = {
    default: async ({ cookies, request })=>{
        const input = await request.formData();
        const game = JSON.parse(input.get("data"));

        let previous = JSON.parse(cookies.get("scout"));

        cookies.set("scout", JSON.stringify({...previous,game:game}), {
            path: '/',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24
        });

        throw redirect(307, "./post");
    }
}