import tba from '$lib/modules/tba'

export const ApiService = {
    /**
     * Fetches the alliances for a given event from The Blue Alliance API and processes the data to create predictions.
     *
     * @param {string} event_key - The key of the event to fetch alliances for.
     * @returns {Promise<Object>} - A promise that resolves to the predictions created from the fetched alliances.
     */
    async event(event_key) {
        const response = await tba(`event/${event_key}/alliances`)
        const teams = []
        for (let i = 0; i < response.length; i++) {
            teams.push(response[i].picks)
        }

        return this.createPredictions(teams)
    },
    /**
     * Fetches the team data and processes it to create predictions.
     *
     * @param {Array} teams - An array of team identifiers.
     * @returns {Promise<Object>} - A promise that resolves to the predictions created from the fetched team data.
     */
    async team(teams) {
        return this.createPredictions(teams)
    },
    /**
     * Creates predictions based on the provided teams.
     *
     * @param {Array} teams - An array of team identifiers.
     * @returns {Promise<Object>} - A promise that resolves to an object containing matches and teams.
     */
    async createPredictions(teams) {
        const order = [
            [6, 4],
            [6, 4],
            [7, 5],
            [7, 5],
            [9, 0],
            [8, 0],
            [10, 8],
            [10, 9],
            [11, 0],
            [11, 0],
            [13, 12],
            [12, 0],
            [13, 0],
        ]

        let matches = [
            {
                red: 0,
                blue: 7,
                winner: '',
            },
            {
                red: 1,
                blue: 6,
                winner: '',
            },
            {
                red: 2,
                blue: 5,
                winner: '',
            },
            {
                red: 3,
                blue: 4,
                winner: '',
            },
            {
                red: 8,
                blue: 8,
                winner: '',
            },
            {
                red: 8,
                blue: 8,
                winner: '',
            },
            {
                red: 8,
                blue: 8,
                winner: '',
            },
            {
                red: 8,
                blue: 8,
                winner: '',
            },
            {
                red: 8,
                blue: 8,
                winner: '',
            },
            {
                red: 8,
                blue: 8,
                winner: '',
            },
            {
                red: 8,
                blue: 8,
                winner: '',
            },
            {
                red: 8,
                blue: 8,
                winner: '',
            },
            {
                red: 8,
                blue: 8,
                winner: '',
            },
            {
                red: 8,
                blue: 8,
                winner: '',
            },
        ]

        const url = 'https://match.apisb.me/prediction'

        for (let i = 0; i < matches.length; i++) {
            let form_data = await this.formData(matches[i], teams)

            const prediction = await this.getPrediction(form_data, url)

            matches[i].winner = prediction
            if (i !== 13) {
                if (matches[i].winner === 'red') {
                    let winner = order[i][0]
                    let loser = order[i][1]
                    if (matches[winner].red === 8) {
                        matches[winner].red = matches[i].red
                    } else {
                        matches[winner].blue = matches[i].red
                    }
                    if (loser !== 0) {
                        if (matches[loser].red === 8) {
                            matches[loser].red = matches[i].blue
                        } else {
                            matches[loser].blue = matches[i].blue
                        }
                    }
                } else {
                    let winner = order[i][0]
                    let loser = order[i][1]
                    if (matches[winner].red === 8) {
                        matches[winner].red = matches[i].blue
                    } else {
                        matches[winner].blue = matches[i].blue
                    }
                    if (loser !== 0) {
                        if (matches[loser].red === 8) {
                            matches[loser].red = matches[i].red
                        } else {
                            matches[loser].blue = matches[i].red
                        }
                    }
                }
            } else {
                if (prediction === 'red') {
                    matches[13].red = matches[i].red
                } else {
                    matches[13].blue = matches[i].blue
                }
            }
        }
        return { matches: matches, teams: teams }
    },
    /**
     * Sends a POST request to the prediction API with the provided form data and returns the prediction result.
     *
     * @param {FormData} form_data - The form data containing team information.
     * @param {string} url - The URL of the prediction API.
     * @returns {Promise<string>} - A promise that resolves to the prediction result ('red' or 'blue').
     */
    async getPrediction(form_data, url) {
        const response = await fetch(url, { method: 'post', body: form_data })
        const data = await response.json()
        if (
            Number(data.blue_alliance_win_confidence) >
            Number(data.red_alliance_win_confidence)
        ) {
            return 'blue'
        } else {
            return 'red'
        }
    },
    /**
     * Creates form data for the prediction API request based on the provided match data and teams.
     *
     * @param {Object} data - The match data.
     * @param {Array} teams - An array of team identifiers.
     * @returns {Promise<FormData>} - A promise that resolves to the form data.
     */
    async formData(data, teams) {
        let form_data = new FormData()

        form_data.append('team-red-1', teams[data.red][0])
        form_data.append('team-red-2', teams[data.red][1])
        form_data.append('team-red-3', teams[data.red][2])
        form_data.append('team-blue-1', teams[data.blue][0])
        form_data.append('team-blue-2', teams[data.blue][1])
        form_data.append('team-blue-3', teams[data.blue][2])

        return form_data
    },
    /**
     * Flips the winner of a specified match and recalculates predictions for subsequent matches.
     *
     * @param {number} match - The index of the match to flip.
     * @param {Object} data - The data containing matches and teams.
     * @returns {Promise<Object>} - A promise that resolves to an object containing updated matches and teams.
     */
    async flip(match, data) {
        let teams = data.teams

        let matches = [
            {
                red: 0,
                blue: 7,
                winner: '',
            },
            {
                red: 1,
                blue: 6,
                winner: '',
            },
            {
                red: 2,
                blue: 5,
                winner: '',
            },
            {
                red: 3,
                blue: 4,
                winner: '',
            },
            {
                red: 8,
                blue: 8,
                winner: '',
            },
            {
                red: 8,
                blue: 8,
                winner: '',
            },
            {
                red: 8,
                blue: 8,
                winner: '',
            },
            {
                red: 8,
                blue: 8,
                winner: '',
            },
            {
                red: 8,
                blue: 8,
                winner: '',
            },
            {
                red: 8,
                blue: 8,
                winner: '',
            },
            {
                red: 8,
                blue: 8,
                winner: '',
            },
            {
                red: 8,
                blue: 8,
                winner: '',
            },
            {
                red: 8,
                blue: 8,
                winner: '',
            },
            {
                red: 8,
                blue: 8,
                winner: '',
            },
        ]
        const order = [
            [6, 4],
            [6, 4],
            [7, 5],
            [7, 5],
            [9, 0],
            [8, 0],
            [10, 8],
            [10, 9],
            [11, 0],
            [11, 0],
            [13, 12],
            [12, 0],
            [13, 0],
        ]
        if (match === 13) {
            matches = data.matches
            if (data.matches[13].winner === 'red') {
                matches[13].winner = 'blue'
            } else if (data.matches[13].winner === 'blue') {
                matches[13].winner = 'red'
            }
            return { matches: matches, teams: teams }
        }
        for (let i = 0; i < match; i++) {
            matches[i].winner = data.matches[i].winner
        }
        if (data.matches[match].winner === 'red') {
            matches[match].winner = 'blue'
        } else if (data.matches[match].winner === 'blue') {
            matches[match].winner = 'red'
        }
        for (let i = 0; i < match + 1; i++) {
            if (matches[i].winner === 'red') {
                let winner = order[i][0]
                let loser = order[i][1]
                if (matches[winner].red === 8) {
                    matches[winner].red = matches[i].red
                } else {
                    matches[winner].blue = matches[i].red
                }
                if (loser !== 0) {
                    if (matches[loser].red === 8) {
                        matches[loser].red = matches[i].blue
                    } else {
                        matches[loser].blue = matches[i].blue
                    }
                }
            } else {
                let winner = order[i][0]
                let loser = order[i][1]
                if (matches[winner].red === 8) {
                    matches[winner].red = matches[i].blue
                } else {
                    matches[winner].blue = matches[i].blue
                }
                if (loser !== 0) {
                    if (matches[loser].red === 8) {
                        matches[loser].red = matches[i].red
                    } else {
                        matches[loser].blue = matches[i].red
                    }
                }
            }
        }
        const url = 'https://match.apisb.me/prediction'

        for (let i = match + 1; i < matches.length; i++) {
            let form_data = await this.formData(matches[i], teams)

            const prediction = await this.getPrediction(form_data, url)

            matches[i].winner = prediction
            if (i !== 13) {
                if (matches[i].winner === 'red') {
                    let winner = order[i][0]
                    let loser = order[i][1]
                    if (matches[winner].red === 8) {
                        matches[winner].red = matches[i].red
                    } else {
                        matches[winner].blue = matches[i].red
                    }
                    if (loser !== 0) {
                        if (matches[loser].red === 8) {
                            matches[loser].red = matches[i].blue
                        } else {
                            matches[loser].blue = matches[i].blue
                        }
                    }
                } else {
                    let winner = order[i][0]
                    let loser = order[i][1]
                    if (matches[winner].red === 8) {
                        matches[winner].red = matches[i].blue
                    } else {
                        matches[winner].blue = matches[i].blue
                    }
                    if (loser !== 0) {
                        if (matches[loser].red === 8) {
                            matches[loser].red = matches[i].red
                        } else {
                            matches[loser].blue = matches[i].red
                        }
                    }
                }
            } else {
                if (prediction === 'red') {
                    matches[13].red = matches[i].red
                } else {
                    matches[13].blue = matches[i].blue
                }
            }
        }
        return { matches: matches, teams: teams }
    },
}
