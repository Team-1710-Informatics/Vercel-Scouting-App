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
        const endTime = Date.now();
         // Time in seconds
        climb.time = (endTime - startTime) / 1000;
        climb.type = cageType;
        endgame = false;
    }
</script>

<div class="flex flex-row h-full justify-center items-center gap-4" style="height: 63rem;">
    {#if !startedClimb}
        <button class="h-14 bg-blue-500 w-40 mb-6 rounded-xl" on:click={initiateClimb}>
            Initiate Climb
        </button>
    {:else}
        <button class="h-14 bg-red-600 w-40 mb-6 rounded-xl" on:click={() => recordCageClick('shallow')}>
            Shallow Cage
        </button>
        <button class="h-14 bg-purple-500 w-40 mb-6 rounded-xl" on:click={() => recordCageClick('deep')}>
            Deep Cage
        </button>
    {/if}
</div>
