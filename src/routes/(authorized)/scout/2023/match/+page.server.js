import { redirect } from "@sveltejs/kit";

export function load({ cookies }){
    const predata = JSON.parse(cookies.get("scout"))
    
    return {
        predata
    }
}

export const actions = {
    default: async ({ cookies, request })=>{
        const input = await request.formData();
        const game = JSON.parse(input.get("data"));

        let previous = JSON.parse(cookies.get("scout"));

        previous.game = game;
        console.log(previous);

        cookies.set("scout", JSON.stringify(previous), {
            path: '/',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24
        });

        throw redirect(307, "./post");
    }
}