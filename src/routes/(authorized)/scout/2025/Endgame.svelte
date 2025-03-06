<script>
    let startedClimb = false;
    let startTime = 0;

    export let climb = {}
    export let endgame;

    function initiateClimb() {
        startedClimb = true;
        startTime = Date.now(); // Capture the current timestamp
    }

    function recordCageClick(cageType) {
        if (cageType === 'fail') {
            climb.fails++
            endgame = true;
            startedClimb = false
            startTime = 0
            return;
        }

        const endTime = Date.now();
        // Time in seconds
        climb.time = (endTime - startTime) / 1000;
        climb.type = cageType;
        endgame = false;
    }
</script>

<div class="flex flex-col h-full justify-center items-center gap-4 basis-3/4" style="height: auto">
    {#if !startedClimb}
        Please wait until the robot begins climbing.
        <button class="h-14 bg-blue-500 w-40 mb-4 rounded-xl" on:click={initiateClimb}>
            Initiate Climb
        </button>
    {:else}
        Please wait until the robot is fully stable to select a cage type.
        <button class="h-14 bg-green-600 w-40 mb-4 rounded-xl" on:click={() => recordCageClick('shallow')}>
            Shallow Cage
        </button>
        <button class="h-14 bg-purple-500 w-40 mb-4 rounded-xl" on:click={() => recordCageClick('deep')}>
            Deep Cage
        </button>
        <button class="h-14 bg-red-500 w-40 mb-4 rounded-xl" on:click={() => recordCageClick('fail')}>
            Fail
        </button>
    {/if}
</div>
