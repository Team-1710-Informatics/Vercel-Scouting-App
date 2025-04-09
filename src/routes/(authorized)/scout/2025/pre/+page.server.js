import tba from '$lib/modules/tba'
import { redirect } from '@sveltejs/kit'
import { TeamSelections } from '$lib/server/models/index.js'

export async function load({ locals, url }) {
    if (!locals.user) throw redirect(307, '/login')

    const events = await tba(`events/2025`)

    return {
        events,
        competition: locals.competition,
        scout: locals.user.username,
        host: url.host,
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

export const actions = {
    default: async function ({ request, locals }) {
        const input = await request.formData()
        const data = JSON.parse(input.get('data'))
        console.log(data)

        if (data.event === '2025practice') {
            const pass = { match: data.event }
            const queryString = new URLSearchParams(pass).toString()
            throw redirect(302, `/scout/2025?${queryString}`)
            return
        }

        const match = data.event + '_qm' + data.match
        const scout = locals.user.username
        console.log(match)

        let search = await TeamSelections.findOne({ match: match })

        const tbaResponse = await tba(`/match/${match}/simple`)
        console.log('tba', tbaResponse)
        const blue = tbaResponse.alliances.blue.team_keys
        const red = tbaResponse.alliances.red.team_keys

        if (search == null) {
            let teams = []

            blue.forEach((e) => {
                teams.push({ team: e, alliance: 'blue', scout: '' })
            })
            red.forEach((e) => {
                teams.push({ team: e, alliance: 'red', scout: '' })
            })

            teams[0].scout = [scout]

            const document = {
                match: match,
                teams: teams,
            }

            const db = new TeamSelections(document)
            await db.save()
        } else {
            console.log('already exists')

            for (let i = 0; i < search.teams.length; i++) {
                if (search.teams[i].scout.includes(scout)) {
                    const pass = { match: match }
                    const queryString = new URLSearchParams(pass).toString()
                    throw redirect(302, `/scout/2025?${queryString}`)
                }
            }

            let index = null
            for (let i = 0; i < search.teams.length; i++) {
                if (search.teams[i].scout === '') {
                    index = i
                    break
                }
            }
            if (index == null) {
                if (data.event === '2025cttd') {
                    index = getRandomInt(6)
                    TeamSelections.updateOne(
                        { match: match },
                        {
                            $set: {
                                [`teams.${index}.scout`]: [
                                    ...search.teams[index].scout,
                                    scout,
                                ],
                            },
                        }
                    )
                        .then((result) => console.log(result))
                        .catch((err) => console.error(err))
                } else {
                    try {
                        const teams = [...blue, ...red]
                        console.log('meow', teams)
                        let epa = []
                        for (let i = 0; i < teams.length; i++) {
                            console.log('new1', teams[i])
                            console.log('error')
                            epa.push({
                                team: teams[i],
                                epa: i,
                                scout: 0,
                            })
                        }
                        console.log('nyan', epa)
                        for (let i = 0; i < epa.length; i++) {
                            const result = search.teams.find(
                                (obj) => obj['team'] === epa[i].team
                            )
                            if (result === undefined) {
                                index = i
                                break
                            } else {
                                epa[i].scout = result.scout.length
                            }
                        }
                        let extra = []
                        for (let i = 0; i < epa.length; i++) {
                            if (i === 0) {
                                extra.push(epa[i])
                            } else {
                                if (epa[i].scout < extra[0].scout) {
                                    extra = []
                                    extra.push(epa[i])
                                } else if (epa[i].scout === extra[0].scout) {
                                    extra.push(epa[i])
                                }
                            }
                        }
                        console.log('femboys', extra)
                        let highest_epa = 0
                        for (let i = 0; i < extra.length; i++) {
                            if (i === 0) {
                                highest_epa = extra[i]
                            } else if (extra[i].epa > highest_epa.epa) {
                                highest_epa = extra[i]
                            }
                        }
                        let highest_epa_available = 0
                        for (let i = 0; i < search.teams.length; i++) {
                            if (search.teams[i].team === highest_epa.team) {
                                highest_epa_available = i
                                break
                            }
                        }
                        TeamSelections.updateOne(
                            { match: match },
                            {
                                $set: {
                                    [`teams.${highest_epa_available}.scout`]: [
                                        ...search.teams[highest_epa_available].scout,
                                        scout,
                                    ],
                                },
                            }
                        )
                            .then((result) => console.log(result))
                            .catch((err) => console.error(err))
                    } catch (error) {
                        console.log(error)
                    }
                }
            } else {
                TeamSelections.updateOne(
                    { match: match },
                    { $set: { [`teams.${index}.scout`]: [scout] } }
                )
                    .then((result) => console.log(result))
                    .catch((err) => console.error(err))
            }
        }
        const pass = { match: match }
        const queryString = new URLSearchParams(pass).toString()
        throw redirect(302, `/scout/2025?${queryString}`)
    },
}
