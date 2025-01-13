import { User } from '$lib/server/models/index.js'

export async function load({ locals }){

    let result = await User.find({});

    const members = [];
    result.forEach(m=>{
        members.push({
            username:m.username,
            name:m.name
        })
    })

    return {
        members:JSON.stringify(members)
    }
}

export const actions = {
    default: async ({ request })=>{
        const input = await request.formData();
        const data = JSON.parse(input.get("data"));
        const user = data.user;
        const permission = data.permission;

        if(typeof data.user != "string" || !(data.user && data.permission)) return;

        const dbuser = await User.findOne({username: user});

        let dbpermissions = dbuser.permissions
        dbpermissions.push(permission)

        await User.update({username: dbuser.username}, {permissions: dbpermissions})

        console.log(dbuser.permissions);

    }
};