import tba from '$lib/modules/tba.js';

export async function seedPredictor(event) {
    const team = "frc1710";

    const matchRoute = "/event/" + event + "/matches";
    const rankingsRoute = "/event/" + event + "/rankings";

    let matches = await tba(matchRoute);

    matches = matches.filter(match => match.winning_alliance == '');

    console.log("matches: ", matches)

    let rankings = await tba(rankingsRoute);
    rankings = rankings.rankings;

    let rpRankings = [];

    rankings.forEach(ranking => {
        rpRankings.push({
            team: ranking.team_key,
            points: ranking.extra_stats[0]

        });
    })

    rpRankings.sort((a, b) => {
        return b.points - a.points;
    })

    const url = 'https://match.apisb.me/prediction';

    for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        let matchFormData = new FormData();
        matchFormData.append("team-red-1", match.alliances.red.team_keys[0]);
        matchFormData.append("team-red-2", match.alliances.red.team_keys[1]);
        matchFormData.append("team-red-3", match.alliances.red.team_keys[2]);
        matchFormData.append("team-blue-1", match.alliances.blue.team_keys[0]);
        matchFormData.append("team-blue-2", match.alliances.blue.team_keys[1]);
        matchFormData.append("team-blue-3", match.alliances.blue.team_keys[2]);

        let redRp;
        let blueRp;

        const source = 'statbotics'

        if (source == "apisb") { // use apisb
            const response = await fetch(url, {
                method: 'POST',
                body: matchFormData
            });

            if (!response.ok) {
                throw error(500, 'Failed to fetch data from API');
            }

            const data = await response.json();

            redRp = data.redRP;
            blueRp = data.blueRP;
        } else if (source == "statbotics") { // use statbotics
            const response = await fetch("https://api.statbotics.io/v3/match/" + match.key);
            try {
                let responseData = await response.json();
                redRp = Math.round(responseData.pred.red_rp_1 + responseData.pred.red_rp_2 + responseData.pred.red_rp_3);
                blueRp = Math.round(responseData.pred.blue_rp_1 + responseData.pred.blue_rp_2 + responseData.pred.blue_rp_3);
                if (responseData.pred.winner === 'blue') {
                    blueRp += 3;
                } else {
                    redRp += 3;
                }
            } catch {
                console.log("error parsing json")
            }

            blueRp = 0;
            redRp = 0;
        }

        if (redRp > 0) {
            rpRankings.find((entry) => entry.team === match.alliances.red.team_keys[0]).points += redRp;
            rpRankings.find((entry) => entry.team === match.alliances.red.team_keys[1]).points += redRp;
            rpRankings.find((entry) => entry.team === match.alliances.red.team_keys[2]).points += redRp;

        }
        if (blueRp > 0) {
            rpRankings.find((entry) => entry.team === match.alliances.blue.team_keys[0]).points += blueRp;
            rpRankings.find((entry) => entry.team === match.alliances.blue.team_keys[1]).points += blueRp;
            rpRankings.find((entry) => entry.team === match.alliances.blue.team_keys[2]).points += blueRp;
        }

        rpRankings.sort((a, b) => {
            return b.points - a.points;
        })

    }
    console.log(rpRankings);
    return { rpRankings }
}