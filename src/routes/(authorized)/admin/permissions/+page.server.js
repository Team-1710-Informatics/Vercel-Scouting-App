import { User } from '$lib/server/models/index.js'

export async function load({ locals }) {
    let result = await User.find({})

    const members = []
    result.forEach((m) => {
        members.push({
            username: m.username,
            name: m.name,
            permissions: m.permissions,
        })
    })

    return {
        members: JSON.stringify(members),
    }
}

export const actions = {
    default: async ({ request }) => {
        const input = await request.formData()
        const data = JSON.parse(input.get('data'))
        const user = data.username
        const permission = data.permission

        // if none selected, don't run code
        if (user === 'no user selected') return

        // get user from db
        const dbuser = await User.findOne({ username: user })

        let dbpermissions = dbuser.permissions

        // if were removing a role, remove role
        if (data.remove) {
            if (dbpermissions.includes(permission)) {
                let permindex = dbpermissions.indexOf(permission)
                dbpermissions.splice(permindex, 1)
                console.log('removed ' + permission)
            }
        } else { // otherwise add the role
            if (dbpermissions.includes(permission)) {
                return
            }
            dbpermissions.push(permission)
            console.log('added ' + permission)
        }

        // update the user
        await User.updateOne(
            { username: dbuser.username },
            { permissions: dbpermissions }
        )
    },
}
