import tba from '$lib/modules/tba'
import { ScoutData, TeamSelections } from '$lib/server/models'
import credits from '$lib/server/user/credi'
import stats from '$lib/server/user/stats'
import { redirect } from '@sveltejs/kit'

export async function load({ locals, url }) {
    if (!locals.user) throw redirect(307, '/login')

    const events = await tba(`events/2024`)

    const rankings = await tba('event/')

    // const events = [];

    const params = url.searchParams;
    const match = params.get('match');

    const scout = locals.user.username

    let search = await TeamSelections.findOne({match: match})

    let team = ''
    let alliance = ''

    for (let i = 0; i < search.teams.length; i++) {
        if (search.teams[i].scout.includes(scout)){
            team = search.teams[i].team
            alliance = search.teams[i].alliance
            break
        }
    }

    const input = "2024cttd_qm1";

    const [prefix, matchPart] = input.split('_')
    const matchNumber = parseInt(matchPart.replace('qm', ''))

    return {
        events,
        competition: prefix,
        scout: locals.user.username,
        host: url.host,
        match: matchNumber,
        team: team,
        alliance: alliance
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
                150,
                `Scouted ${data.event}_qm${data.match}:${data.team}`
            )
        } else if (data.event != '2024practice') {
            await credits.transaction(
                locals.user.username,
                25,
                `Scouted ${data.event}_qm${data.match}:${data.team} (extra)`
            )
        }

        const db = new ScoutData(data)
        await db.save()

        console.log(data)

        if (data.event != '2024practice') {
            await stats.setStat(
                data.scout,
                'matches_scouted',
                (await stats.getStat(data.scout, 'matches_scouted')) + 1
            )
        }
        throw redirect(307, '/hub')
    },
}
