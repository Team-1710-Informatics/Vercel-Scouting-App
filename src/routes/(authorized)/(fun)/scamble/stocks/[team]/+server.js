import { X_TBA_AUTHKEY } from '$env/static/private'
import { json } from '@sveltejs/kit'

export async function GET({ params, fetch }) {
    const YEAR = new Date().getFullYear()
    const res = await fetch(
        `https://thebluealliance.com/api/v3/team/frc${params.team}/matches/${YEAR}`,
        {
            headers: {
                'X-TBA-Auth-Key': X_TBA_AUTHKEY,
            },
        }
    )
    const matches = await res.json()

    let rp = 0
    let w = 0
    let l = 0
    let aas = 0
    matches.forEach((m) => {
        let alliance = all(params.team, m)

        if (m.winning_alliance === alliance) w++
        else if (m.winning_alliance !== '') l++

        let r = rankingPoints(params.team, m)
        if (r === undefined) return
        rp += r
        aas += m.score_breakdown[alliance].totalPoints
    })
    rp /= matches.length
    aas /= matches.length
    let win = w / (w + l)

    return json({
        value: Math.trunc(aas + rp * 30 + win * 100) * 2,
        team: params.team,
    })
}

function rankingPoints(team, match) {
    let out = 0
    const alliance = all(team, match)

    if (!alliance) return undefined
    if (!match.score_breakdown) return undefined

    if (alliance === match.winning_alliance) out += 2
    else if (match.winning_alliance === '') out += 1

    if (match.score_breakdown[alliance].totalChargeStationPoints >= 26) out += 1

    if (match.score_breakdown[alliance].links.length >= 5) out += 1
    else if (
        match.score_breakdown[alliance].links.length === 4 &&
        match.score_breakdown[alliance].coopertitionCriteriaMet
    )
        out += 1

    return out
}

function all(team, match) {
    if (match.alliances.red.team_keys.includes(`frc${team}`)) {
        return 'red'
    } else if (match.alliances.blue.team_keys.includes(`frc${team}`)) {
        return 'blue'
    }
}
