import { json } from "@sveltejs/kit";

export async function POST({ request }){
    // request.headers.append("Origin", "https://team1710.com");

    // const req = await request.formData();
    // const file = request.get("upload");
    // const name = request.get("")

    const res = await fetch("https://team1710.com/scouting/files/upload.php", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: request.body
    })

    return json(res);
}