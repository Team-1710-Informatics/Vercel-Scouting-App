<svelte:head>
    <script src="https://cdn.plot.ly/plotly-latest.min.js" type="text/javascript"></script>
</svelte:head>

<script>
    import AllianceSelection from './AllianceSelection.svelte'
    import RobotCompatibility from '$lib/components/data/2025/RobotCompatibility.svelte'
    import MatchPredictor from '$lib/components/data/2025/MatchPredictor.svelte'
    import ServicePing from '../../../services/ServicePing.svelte'
    import {onMount} from 'svelte'
    import Spreadsheet from './Spreadsheet.svelte'
    import PitData from './PitData.svelte'

    let autoScoreValues = [3, 4, 6, 7]

    let teleopScoreValues = [2, 3, 4, 5]

    function teamScore(matchData) {
        let count = 0

        matchData.actions.forEach((action) => {
            if (action.phase == 'auto') {
                if (action.action == 'score') {
                    if (action.location == 'reef') {
                        count += autoScoreValues[action.level - 1]
                    } else {
                        if (action.location == 'barge') {
                            count += 4
                        } else if (action.location == 'processor') {
                            count += 6
                        }
                    }
                }
            } else if (action.phase == 'teleOp') {
                if (action.action == 'score') {
                    if (action.location == 'reef') {
                        count += teleopScoreValues[action.level - 1]
                    } else {
                        if (action.location == 'barge') {
                            count += 4
                        } else if (action.location == 'processor') {
                            count += 6
                        }
                    }
                }
            }
        })

        if (matchData.climb != null) {
            if (matchData.climb === 'deep') {
                count += 12
            } else if (matchData.climb === 'shallow') {
                count += 6
            }
        }

        try {
            if (matchData.untimed.parkMatch === true) {
                count += 2
            }
        } catch (e) {
        }

        try {
            if (matchData.untimed.exitAuto === true) {
                count += 3
            }
        } catch (e) {
        }

        return count
    }

    export let data

    let selectedTeam
    let selectedAlliance

    let matchPredictor
    let robotCompatibility

    let allianceSelection

    let pickedAlliances = []

    let event = ''

    let plotDiv

    function getTeamScores(team) {
        let scores = [];
        console.log("entries", entries.entries)
        entries.entries.forEach((matchData) => {
            if (matchData.team === team) {
                scores.push({
                    match: matchData.match,
                    score: teamScore(matchData)
                });
                console.log(matchData)
                console.log("scores", teamScore(matchData))
            }
        });
        return scores;
    }

    function plotTeamScores(team, data) {
        const scores = getTeamScores(team, data);
        const trace = {
            x: scores.map(d => d.match),
            y: scores.map(d => d.score),
            mode: 'lines+markers',
            type: 'scatter'
        };
        const layout = {
            margin: {
                l: 20,  // left margin
                r: 20,  // right margin
                t: 20,  // top margin
                b: 20   // bottom margin
            },
            yaxis: {
                range: [0, null] // Forces the bottom to be 0, lets Plotly decide the upper limit
            }
        };
        console.log(trace)
        Plotly.newPlot(plotDiv, [trace], layout, {
            staticPlot: true,
            margin: {autoexpand: true,},
            response: true
        });
        document.getElementsByClassName("main-svg")[0].style.cssText = "background: rgba(0, 0, 0, 0);";
    }

    let entries
    onMount(() => {
        event = data.data.event
        entries = data.data
        console.log("entries", entries)
    })

    $: if (selectedAlliance && selectedAlliance.length === 3) {
        robotCompatibility.fetch()
    }

    $: if (selectedTeam) {
        console.log(parseInt(selectedTeam.slice(3)))
        plotTeamScores(parseInt(selectedTeam.slice(3)));
    }
</script>

<div class="w-screen min-h-full grow flex flex-row">
    <div class="basis-1/4 max-h-screen m-4">
        <AllianceSelection
                bind:selectedAlliance
                bind:selectedTeam
                bind:this={allianceSelection}
                event_key={data.data.event}
        ></AllianceSelection>
    </div>

    <div class="basis-2/4 temporary_box my-4 rounded-lg overflow-x-scroll overflow-y-scroll"
         style="max-height: calc(100vh - 2rem); max-width:50%">
        {#if entries}
            <Spreadsheet data={entries}/>
        {/if}
    </div>
    <div class="basis-2/4 flex flex-col max-h-screen m-4">
        <div class="basis-1/2 flex flex-row mb-4">
            <div class="basis-1/2 h-auto mr-4 rounded-lg temporary_box flex flex-col items-center">
                {#if data && selectedTeam}
                    <PitData data={data} team={selectedTeam}/>
                    Score over Time
                {/if}
                <div bind:this={plotDiv} class="plot-container mb-4"
                     style="height:40%; width: 90%"></div>
            </div>
            <div class="basis-1/2 h-auto flex flex-col">
                <div class="grow h-auto temporary_box rounded-lg flex flex-col">
                    <h1 class="text-lg ml-4 mt-3">Alliance Info</h1>
                    <div class="w-full mt-1 mb-0.5 x-4">
                        <div class="bg-gray-800 w-full h-0.5"/>
                    </div>
                    <div>
                        {#if JSON.stringify(selectedAlliance) !== '["none"]'}
                            <p class="ml-4">{selectedAlliance}</p>
                        {:else}
                            <br>
                        {/if}
                    </div>
                    <RobotCompatibility
                            bind:event
                            bind:selectedAlliance
                            bind:this={robotCompatibility}
                    />
                </div>
                <ServicePing name="Blue All." url="thebluealliance.com"/>
                <ServicePing name="Robot Compat" url="micro.apisb.me"/>
                <ServicePing name="Match Prediction" url="match.apisb.me"/>
            </div>
        </div>
        <MatchPredictor bind:allianceSelection bind:this={matchPredictor} event={data.data.event}/>
    </div>
</div>

<style>
    .temporary_box {
        background-color: rgba(0, 0, 0, 0.2);
        box-shadow: inset 0 20px 40px 0 rgb(0 0 0 / 0.5);
    }

    .plot-container {
        filter: invert(75%) hue-rotate(180deg);
    }
</style>
