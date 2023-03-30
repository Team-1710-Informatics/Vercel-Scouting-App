import { json } from "@sveltejs/kit";

export async function POST({ request }){
    request.headers.append("Origin", "https://team1710.com");

    let res = await fetch("https://team1710.com/scouting/files/upload.php", request);

    return json(res);
}