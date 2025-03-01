<script>
    export let data;

    let teamSearch = 1710

    let entries = data.data

    let teams = []

    for (let i = 0; i < entries.length; i++) {
        teams.push(entries[i].team)
    }

</script>

<center>

    <div class="flex flex-row h-fit mx-auto w-fit">
        <p class="align-middle my-auto mr-2">Team Number</p>
        <select bind:value={teamSearch} class="my-2 w-20 h-7" >
            {#each teams as team}
                <option value={team} >{team}</option>
            {/each}
        </select>
        <input type="number" bind:value={teamSearch} class="my-2 w-16 h-7"/>
    </div>

    <hr class="my-2 mb-2 w-1/2" />
    <br />

    {#each data.data as entry}
        {#if entry.team == teamSearch}
            <div class="flex flex-col mb-3">
                <p class="text-sm">Scout: {entry.scout}</p>
                <iframe src={entry.picture} allow="autoplay" width="600" height="400" class="mx-auto" title="beep boop"></iframe>
            </div>
        {/if}
    {/each}

</center>
