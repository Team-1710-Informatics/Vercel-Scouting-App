import { redirect } from "@sveltejs/kit";

export function load({ cookies, locals }) {
    let predata;
    try{
        predata = JSON.parse(cookies.get("scout"))
    }catch{ throw redirect(307, "./pre"); }
    return {
        scout:predata
    }
}