<script>
    export let team;
    export let data;

    const pitData = data.data.pitData

    function convertData(data) {
        try {
            return JSON.stringify(data);
        } catch (error) {
            return data;
        }
    }
</script>
<div class="overflow-scroll h-auto mb-10" style="width: 100%">
    {#each pitData as entry}
        {#if "frc" + entry.team.toString() === team}
            <div class="flex flex-row text-sm mb-1 outline outline-white outline-1 outline-offset-2 p-2">
                <p class="w-1/2 text-left">LxW</p>
                <p class="w-1/2 text-left">{entry.length}x{entry.width} in</p>
            </div>
            <div class="flex flex-row text-sm mb-1 outline outline-white outline-1 outline-offset-2 p-2">
                <p class="w-1/2 text-left">Weight</p>
                <p class="w-1/2 text-left">{entry.weight} lbs</p>
            </div>
            <div class="flex flex-row text-sm mb-1 outline outline-white outline-1 outline-offset-2 p-2">
                <p class="w-1/2 text-left">Drivetrain</p>
                <p class="w-1/2 text-left">{entry.driveTrain}</p>
            </div>
            <div class="flex flex-row text-sm mb-1 outline outline-white outline-1 outline-offset-2 p-2">
                <p class="w-1/2 text-left">Cage Climbable</p>
                <p class="w-1/2 text-left">{entry.cageClimbable}</p>
            </div>
        {/if}
    {/each}
</div>
