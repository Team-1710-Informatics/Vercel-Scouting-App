import { X_TBA_AUTHKEY } from '$env/static/private'
import { pitdata2024, User } from '$lib/server/models'
import credits from '$lib/server/user/credi'
import { redirect } from '@sveltejs/kit'

export async function load({ locals, fetch, params }) {
    const res = await fetch(`https://thebluealliance.com/api/v3/events/2024`, {
        headers: {
            'X-TBA-Auth-Key': X_TBA_AUTHKEY,
        },
    })

    console.log(params)

    const events = await res.json()

    let result = JSON.parse(
        JSON.stringify(await User.find({ team: locals.user.team }))
    )

    const members = []
    result.forEach((m) => {
        members.push({
            username: m.username,
            name: m.name,
        })
    })

    return {
        events,
        competition: locals.competition,
        scout: locals.user.username,
        team: params?.team,
        members,
    }
}

export const actions = {
    default: async function ({ request, locals, params }) {
        const input = await request.formData()

        const data = JSON.parse(input.get('data'))

        // let output = {};

        // const items = ["otherScouts","length","width","height","sizeUnit","weight","weightUnit", "speed", "speedUnit", "driveTrain", "otherDriveTrain", "intakeType", "otherIntake", "shooterType", "wheelType", "otherShooter", "speakerScore", "ampScore", "trapScore", "shootingDistance", "climbingAbility", "maxAutoScore", "autoStrategy", "buddyClimb", "scorePreference", "scoringAbility", "ampUse", "intakeLocation"]

        // items.forEach(item=>{
        //     output[item]=input.get(item)
        // })

        const otherData = {
            event: locals.competition?.key ?? null,
            team: params?.team,
            scout: locals.user.username,
        }

        const final = {
            ...otherData,
            ...data,
        }

        console.log(final)

        if (
            await pitdata2024.findOne({
                team: final['team'],
                event: final['event'],
            })
        ) {
            throw redirect(301, '/pit-scout')
        }

        const db = new pitdata2024(final)
        await db.save()

        if (final.otherScouts == 'none') {
            await credits.transaction(
                final.scout,
                350,
                `Pit scouted ${final.team}`
            )
        }

        if (final.otherScouts != 'none') {
            await credits.transaction(
                final.scout,
                350,
                `Pit scouted ${final.team}`
            )
            await credits.transaction(
                final.otherScouts,
                350,
                `Co-pit scouted ${final.team}`
            )
        }

        console.log('test')
        throw redirect(301, '/pit-scout/nav')
    },
}
