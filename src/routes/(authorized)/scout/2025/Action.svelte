<script>
    import Reef from './Reef.svelte';
    import AllianceArea from "./AllianceArea.svelte";
    import Barge from "./Barge.svelte";
    import Inventory from "./Inventory.svelte";

    export let log = []
    let algae;
    let coral;
    export let state
    export let meta
    let item;

    let location
    let rotateDiv
    let rotate = false

    let selected = {
        location: 'none',
    }

    function flipField() {
        rotate = !rotate
    }

    function behavior(actionType) {
        log.push({
            time: state.time,
            action: actionType,
            location,
            phase: state.phase,
        })
        if (actionType == 'score') {
            if (selected.location === "reef" || selected.location === "processor" || selected.location === "barge") {
                if (item === "coral") {
                    coral = false
                    console.log("outtaking coral")
                } else {
                    algae = false
                    console.log("outtaking algae")
                }
            }
        } else {
            if (actionType === 'drop' || actionType === 'miss') {
                if (selected.location === "reef" || selected.location === "processor" || selected.location === "barge") {
                    if (item === "coral") {
                        coral = false
                        console.log("outtaking coral")
                    } else {
                        algae = false
                        console.log("outtaking algae")
                    }
                }
            } else if (actionType === 'intake') {
                if (selected.location === "coral_station_left" || selected.location === "coral_station_right" || selected.location === "alliance" || selected.location === "reef") {
                    if (item === "coral") {
                        coral = true
                        console.log("intaking coral")
                    } else {
                        algae = true
                        console.log("intaking algae")
                    }
                }
            }
        }
    }
</script>

<div class="w-fit grid grid-cols-2 grid-rows-2 gap-8 mb-8">
    <div class="rounded-md shadow-xl bg-red-600 p-2 w-40" on:click={() => {behavior("score")}}>
        SCORE
    </div>
    <div class="rounded-md shadow-xl bg-yellow-400 p-2" on:click={() => {behavior("intake")}}>
        INTAKE
    </div>
    <div class="rounded-md shadow-xl bg-fuchsia-500 p-2">
        MISS
    </div>
    <div class="rounded-md shadow-xl bg-blue-400 p-2">
        DROP
    </div>
    <div class="flex items-center justify-center">
        <Inventory bind:algae bind:coral/>
    </div>
</div>
<div class="border-4 border-black w-fit">
    <AllianceArea bind:item bind:selected/>
    <Reef bind:item bind:selected/>
    <Barge bind:item bind:selected/>
</div>