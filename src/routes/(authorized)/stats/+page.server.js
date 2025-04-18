// import teamselections model from models
import { TeamSelections, ScoutData2024 } from '$lib/server/models/index.js'
import { redirect } from '@sveltejs/kit'

export async function load({ locals }) {
    // convert 2024 scout data to team selections
    // let scoutData = await ScoutData2024.find({})
    // for (const scoutEntry of scoutData) {
    //     let match = scoutEntry.event + '_qm' + scoutEntry.match
    //     let team = scoutEntry.team
    //     let scout = scoutEntry.scout
    //
    //     console.log(
    //         `Processing scout entry: match=${match}, team=${team}, scout=${scout}`
    //     )
    //
    //     if (/^\d+$/.test(match)) {
    //         console.log(`Pausing execution due to invalid match: ${match}`)
    //         debugger // Pauses the execution
    //     }
    //
    //     // check if the matchselection exists and add the scout to the team or create the matchselection
    //     let matchSelection = await TeamSelections.findOne({ match: match })
    //     if (matchSelection) {
    //         console.log(`Match selection found for match=${match}`)
    //         let teamSelection = matchSelection.teams.find(
    //             (teamEntry) => teamEntry.team === team
    //         )
    //         if (teamSelection) {
    //             console.log(
    //                 `Team selection found for team=${team} in match=${match}`
    //             )
    //             teamSelection.scout.push(scout)
    //         } else {
    //             console.log(
    //                 `No team selection found for team=${team} in match=${match}, creating new team selection`
    //             )
    //             matchSelection.teams.push({ team: team, scout: [scout] })
    //         }
    //         await matchSelection.save()
    //     } else {
    //         console.log(
    //             `No match selection found for match=${match}, creating new match selection`
    //         )
    //         let newMatchSelection = new TeamSelections({
    //             match: match,
    //             teams: [{ team: team, scout: [scout] }],
    //         })
    //         await newMatchSelection.save()
    //     }
    // }
    //
    // // check if there are any teamselections with less than six teams, if so, fill them
    // let teamSelections = await TeamSelections.find({})
    // for (const teamSelection of teamSelections) {
    //     if (teamSelection.teams.length < 6) {
    //         console.log(
    //             `Team selection for match ${teamSelection.match} has less than 6 teams, filling with empty teams`
    //         )
    //         for (let i = teamSelection.teams.length; i < 6; i++) {
    //             teamSelection.teams.push({ team: 0, scout: [] })
    //         }
    //         await teamSelection.save()
    //         console.log(
    //             `Updated team selection: ${JSON.stringify(teamSelection)}`
    //         )
    //     }
    // }

    let events = []
    let result = await TeamSelections.find({})

    result.forEach((event) => {
        events.push(event.match.split('_')[0])
    })

    // events = [...new Set(events)]
    events = [
        '2025mose',
        '2025mokc',
        '2025new',
        '2024cttd',
        '2024wila',
        '2024ksla',
        '2024dal',
    ]

    let scouts = []
    let output = []
    for (const event of events) {
        let eventTeamSelections = await TeamSelections.find({
            match: { $regex: event + '*' },
        })
        console.log('Event #: ' + eventTeamSelections.length)
        let matchCount = 0
        let totalScouts = 0
        let missingScouts = 0
        let bonus = 0

        matchCount = eventTeamSelections.length

        eventTeamSelections.forEach((match) => {
            let fill = 0
            match.teams.forEach((team) => {
                if (team.scout) {
                    if (team.scout.length !== 0) {
                        totalScouts += team.scout.length
                        fill++
                        if (fill === 6) bonus++
                        scouts.push(team.scout)
                    } else missingScouts++
                } else missingScouts++
            })
        })

        console.log('Event: ' + event)
        console.log('Missing Scouts: ' + missingScouts)
        console.log('Matches: ' + matchCount)
        console.log('Scouts: ' + totalScouts)
        let scoutingCoverage = totalScouts / (matchCount * 6)
        console.log(scoutingCoverage)

        scouts = scouts.flat()
        scouts = [...new Set(scouts)]

        output.push({
            event: event,
            matches: matchCount,
            uniqueScouts: scouts.length,
            missingScouts: missingScouts,
            scouts: totalScouts,
            coverage: scoutingCoverage,
            bonus: bonus,
        })

        matchCount = 0
        totalScouts = 0
        scouts = []
    }

    return { event: output }
}
