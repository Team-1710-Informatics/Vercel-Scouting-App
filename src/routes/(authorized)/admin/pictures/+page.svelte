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

    let imgWidth = 32.33

</script>

<center class="w-fit">

    <div class="flex flex-row h-fit mx-auto w-fit">
        <p class="align-middle my-auto mr-2">Team Number</p>
        <input type="number" bind:value={teamSearch} class="my-2 w-16 h-7 mr-16"/>
        <p class="align-middle my-auto mr-2">Columns</p>
        <select class="my-2 w-16 h-7 mr-16" bind:value={imgWidth}>
            <option value="32.33">3</option>
            <option value="48.7">2</option>
            <option value="100">1</option>
        </select>
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
    <div class="flex flex-wrap mx-auto w-screen">
        {#each data.data as entry}
            {#if entry.team === teamSearch && !showAll}
                <div class="flex flex-col m-2" style="width: {imgWidth}%; height: {imgWidth / 1.5}%;}">
                    <p class="text-sm">Scout: {entry.scout}</p>
                    <iframe src={entry.picture} allow="autoplay" class="mx-auto w-full" height={imgWidth * 10} title="beep boop"></iframe>
                </div>
            {/if}
            {#if showAll && teams.includes(entry.team)}
                <div class="flex flex-col m-2" style="width: {imgWidth}%; height: {imgWidth / 1.5}%;}">
                    <p class="text-md font-bold">{entry.team}</p>
                    <iframe src={entry.picture} allow="autoplay" height={imgWidth * 10} class="mx-auto w-full" title="beep boop"></iframe>
                </div>
            {/if}
        {/each}
        {#if teams.includes(teamSearch) !== true && !showAll}
            <p class="">No available pictures.</p>
        {/if}
    </div>

</center>
