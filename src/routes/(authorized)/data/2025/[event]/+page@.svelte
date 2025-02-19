<script>
    import AllianceSelection from "./AllianceSelection.svelte";
    import RobotCompatibility from "$lib/components/data/2025/RobotCompatibility.svelte";
    import MatchPredictor from "$lib/components/data/2025/MatchPredictor.svelte";
    import {onMount} from "svelte";

    export let data
    let matchPredictor;

    let allianceSelection;

    let pickedAlliances = [];

    function getPickedAlliances() {
        pickedAlliances = allianceSelection.getPickedAlliances();
        console.log(pickedAlliances);
    }

    onMount(() => {
        matchPredictor.eventPrediction();
    });
</script>


<div class="w-screen min-h-full grow flex flex-row">
    <div class="basis-1/4 max-h-screen m-4">
        <AllianceSelection bind:this={allianceSelection} event_key={data.data.event}></AllianceSelection>
    </div>
    <div class="basis-2/4 h-auto bg-blue-400 my-4 rounded-lg">

    </div>
    <div class="basis-2/4 flex flex-col max-h-screen m-4">
        <div class="basis-1/2 flex flex-row mb-4">
            <div class="basis-1/2 h-auto bg-blue-400 mr-4 rounded-lg">

            </div>
            <div class="basis-1/2 h-auto bg-blue-400 rounded-lg">

            </div>
        </div>
        <MatchPredictor bind:this={matchPredictor} event={data.data.event}></MatchPredictor>
    </div>
</div>