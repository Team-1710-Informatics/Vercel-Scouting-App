import tba from '$lib/modules/tba'
import { ScoutData, TeamSelections } from '$lib/server/models'
import credits from '$lib/server/user/credi'
import stats from '$lib/server/user/stats'
import { redirect } from '@sveltejs/kit'
import tokens from '$lib/server/user/tokens'

export async function load({ locals, url }) {
    if (!locals.user) throw redirect(307, '/login')

    const events = await tba(`events/2025`)
    // const events = [];

    const params = url.searchParams
    const match = params.get('match')

    const scout = locals.user.username
    let [prefix, matchPart] = ['', '']
    let matchNumber = 0
    let team = 'practice'
    let alliance = 'red'

    if (!match) {
        throw redirect(302, `/scout/2025/pre`)
    }

    if (match !== '2025practice') {
        let search = await TeamSelections.findOne({ match: match })

        for (let i = 0; i < search.teams.length; i++) {
            if (search.teams[i].scout.includes(scout)) {
                team = search.teams[i].team
                alliance = search.teams[i].alliance
                break
            }
        }

        const toSpilt = search.match

        ;[prefix, matchPart] = toSpilt.split('_')
        matchNumber = parseInt(matchPart.replace('qm', ''))
    }

    return {
        events,
        competition: locals.competition,
        scout: locals.user.username,
        host: url.host,
        match: matchNumber,
        team: team,
        alliance: alliance,
        event: prefix,
    }
}

export const actions = {
    default: async function ({ request, locals }) {
        const res = await tba('team/frc1710/simple')
        if (res?.message == 'Internal Error') return { status: 'offline' }
        const input = await request.formData()
        const data = JSON.parse(input.get('data'))
        if (locals.competition?.key == data.event) {
            await credits.transaction(
                locals.user.username,
                400,
                `Scouting: Scouted ${data.event}_qm${data.match}:${data.team}`
            )
            await tokens.transaction(
                locals.user.username,
                2,  // change this to add more or less token payout
                "Scouting: Token Payout"
            )
            console.log("token awarded")
        } else if (data.event != '2025practice') {
            await credits.transaction(
                locals.user.username,
                100,
                `Scouting: Scouted ${data.event}_qm${data.match}:${data.team} (extra)`
            )
            await tokens.transaction(
                locals.user.username,
                1,  // change this to add more or less token payout
                "Scouting: Token Payout"
            )
            console.log("token awarded")
        }

        if (data.team === 'practice') {
            data.event = '2025practice'
            data.team = 0
        } else {
            data.team = data.team.substring(3)
        }

        const db = new ScoutData(data)
        await db.save()

        console.log(data)

        if (data.event != '2025practice') {
            await stats.setStat(
                data.scout,
                'matches_scouted',
                (await stats.getStat(data.scout, 'matches_scouted')) + 1
            )
        }
        throw redirect(307, '/scout/2025/pre')
    },
}
