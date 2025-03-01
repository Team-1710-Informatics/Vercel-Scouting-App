<script>
    export let data;

    $: teamSearch = 1710

    let entries = data.data

    let teams = []

    let showAll = false

    for (let i = 0; i < entries.length; i++) {
        if (!teams.includes(entries[i].team)) {
            teams.push(entries[i].team)
        }
    }

</script>

<center>

    <div class="flex flex-row h-fit mx-auto w-fit">
        <p class="align-middle my-auto mr-2">Team Number: </p>
        <input type="number" bind:value={teamSearch} class="my-2 w-16 h-7"/>
    </div>
    <hr class="my-2 mb-2 w-1/2" />
    <div class="w-1/2 flex flex-wrap items-center">
        <button on:click={() => {showAll = true}} class="underline font-bold">Show All</button>
        {#each teams as a}
            <button on:click={() => {teamSearch = a; showAll = false}} class="underline">{a}</button>
        {/each}
    </div>

    <hr class="my-2 mb-2 w-1/2" />
    <br />
    <div class="w-5/6 flex flex-wrap mx-auto">
        {#each data.data as entry}
            {#if entry.team === teamSearch && !showAll}
                <div class="flex flex-col mb-3">
                    <p class="text-sm">Scout: {entry.scout}</p>
                    <iframe src={entry.picture} allow="autoplay" width="600" height="400" class="mx-auto" title="beep boop"></iframe>
                </div>
            {/if}
            {#if showAll && teams.includes(entry.team)}
                <div class="flex flex-col mb-3">
                    <p class="text-md">{entry.team}</p>
                    <iframe src={entry.picture} allow="autoplay" width="600" height="400" class="mx-auto" title="beep boop"></iframe>
                </div>
            {/if}
        {/each}
        {#if teams.includes(teamSearch) !== true && !showAll}
            <p class="mx-auto w-fit">No available pictures.</p>

        {/if}
    </div>

</center>
