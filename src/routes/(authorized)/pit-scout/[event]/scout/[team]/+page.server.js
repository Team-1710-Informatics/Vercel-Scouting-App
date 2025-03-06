import { X_TBA_AUTHKEY } from '$env/static/private'
import { pitdata2025, User } from '$lib/server/models/index.js'
import credits from '$lib/server/user/credi.ts'
import { redirect } from '@sveltejs/kit'

// fetches bluealliance data to load lists of events and matches for scouts to select form.
export async function load({ locals, fetch, params }) {
    const res = await fetch(`https://thebluealliance.com/api/v3/events/2024`, {
        headers: {
            'X-TBA-Auth-Key': X_TBA_AUTHKEY,
        },
    })

    console.log(params)

    const events = await res.json()

    // get all members so scouting partners can be selected

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

    // return members for frontend

    return {
        events,
        competition: locals.competition,
        scout: locals.user.username,
        team: params?.team,
        members,
    }
}

// Gets form data from the form on the frontend
// Supplements the match and scout info and adds to db
export const actions = {
    default: async function ({ request, locals, params }) {
        const input = await request.formData()

        const data = JSON.parse(input.get('data'))

        // let output = {};

        // const items = ["otherScouts","length","width","height","sizeUnit","weight","weightUnit", "speed", "speedUnit", "driveTrain", "otherDriveTrain", "intakeType", "otherIntake", "shooterType", "wheelType", "otherShooter", "speakerScore", "ampScore", "trapScore", "shootingDistance", "climbingAbility", "maxAutoScore", "autoStrategy", "buddyClimb", "scorePreference", "scoringAbility", "ampUse", "intakeLocation"]

        // items.forEach(item=>{
        //     output[item]=input.get(item)
        // })

        console.log(params.team, 'team')

        const otherData = {
            event: params.event,
            team: params.team,
            scout: locals.user.username,
        }

        console.log(otherData)

        const final = {
            ...data,
        }

        final.event = params.event
        final.team = params.team
        final.scout = locals.user.username

        console.log(final)

        const db = new pitdata2025(final)

        await db.save()

        // if there are not other scouts pay the scout
        if (final.otherScouts == 'none') {
            await credits.transaction(
                final.scout,
                350,
                `Pit scouted ${final.team}`
            )
        }

        // if there is, then pay both
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

        // send them back to the nav page
        console.log('test')
        throw redirect(301, '/pit-scout/nav')
    },
}
