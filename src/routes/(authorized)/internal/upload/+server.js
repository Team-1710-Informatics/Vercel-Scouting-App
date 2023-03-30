import {json} from "@sveltejs/kit";

export async function POST({request, fetch}){
    request.headers.append('Access-Control-Allow-Origin', `https://team1710.com`);
    return json(await fetch("https://team1710.com/scouting/files/upload.php", {
        headers:request.headers
    }));
}