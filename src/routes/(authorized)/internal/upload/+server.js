import {json} from "@sveltejs/kit";

export async function POST({request}){
    return json(await fetch("https://team1710.com/scouting/files/upload.php", request));
}