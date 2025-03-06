<script>
    import AllianceSelection from './AllianceSelection.svelte'
    import RobotCompatibility from '$lib/components/data/2025/RobotCompatibility.svelte'
    import MatchPredictor from '$lib/components/data/2025/MatchPredictor.svelte'
    import ServicePing from '../../../services/ServicePing.svelte'
    import {onMount} from 'svelte'
    import Spreadsheet from './Spreadsheet.svelte'
    import PitData from './PitData.svelte'

    export let data

    let selectedTeam
    let selectedAlliance

    let matchPredictor
    let robotCompatibility

    let allianceSelection

    let pickedAlliances = []

    let event = ''

    let entries
    onMount(() => {
        matchPredictor.eventPrediction()
        event = data.data.event
        entries = data.data
    })

    $: if (selectedAlliance && selectedAlliance.length === 3) {
        robotCompatibility.fetch()
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

    <div class="basis-2/4 h-auto temporary_box my-4 rounded-lg">
        {#if entries}
            <Spreadsheet data={entries}/>
        {/if}
    </div>
    <div class="basis-2/4 flex flex-col max-h-screen m-4">
        <div class="basis-1/2 flex flex-row mb-4">
            <div class="basis-1/2 h-auto mr-4 rounded-lg temporary_box">
                {selectedTeam}
                {#if data}
                    <PitData data={data} team={selectedTeam}/>
                {/if}

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
        <MatchPredictor bind:this={matchPredictor} event={data.data.event}
        ></MatchPredictor>
    </div>
</div>

<style>
    .temporary_box {
        background-color: rgba(0, 0, 0, 0.2);
        box-shadow: inset 0 20px 40px 0 rgb(0 0 0 / 0.5);
    }
</style>
