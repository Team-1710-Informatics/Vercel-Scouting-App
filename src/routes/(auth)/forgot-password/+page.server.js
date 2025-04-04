import { EMAIL, EMAIL_HOST, EMAIL_PASSWORD } from '$env/static/private'
import nodemailer from 'nodemailer'
import { User } from '$lib/server/models'
import { PUBLIC_HOST } from '$env/static/public'

export const actions = {
    forgot: async ({ request }) => {
        const input = await request.formData()
        const data = { email: input.get('email') }

        const user = await User.findOne({ email: data.email })
        // const user = await client.db("main").collection("users").findOne({ email: data.email });

        if (!user) {
            data.error = 'Invalid email!'
            return data
        }

        const key = crypto.randomUUID()
        if (await email(user.email, key)) {
            //await client.db("main").collection("users").updateOne({ email: data.email }, {$set: {"flags.reset": key}});
            user.flags = {
                ...user.flags,
                reset: key,
            }
            await user.save()
            data.success =
                'You have been sent an email containing instructions to reset your password.'
        } else {
            data.error = 'Something went wrong!'
        }
        return data
    },
}

async function email(email, key) {
    let transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: 465,
        secure: true, // true for 465, false for other ports
        tls: {
            rejectUnauthorized: true,
        },
        auth: {
            user: EMAIL,
            pass: EMAIL_PASSWORD,
        },
    })

    let state = new Promise((resolve, reject) => {
        transporter.verify(async function (error, success) {
            if (error) {
                console.log(error)
            } else {
                console.log('Server is ready to take our messages')

                transporter
                    .sendMail({
                        from: `"Team 1710 Scouting" <${EMAIL}>`,
                        to: `${email}`,
                        subject: 'Scouting Password Reset',
                        text: `You may reset your scouting password at ${PUBLIC_HOST}/pw-reset/${key}.\n\nIf this was not you, please ignore this email.`,
                    })
                    .then((res) => {
                        console.log(res)
                        resolve(true)
                    })
                    .catch((err) => {
                        console.error(err)
                        reject(false)
                    })
            }
        })
    })

    return await state
}

function randstr(length) {
    let result = ''
    let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
    }
    return result
}
