<script>
    export let data;

    let teamSearch = 1710

</script>

<center>

    <div class="flex flex-row h-fit mx-auto w-fit">
        <p class="align-middle my-auto mr-2">Team Number</p>
        <input type="number" bind:value={teamSearch} class="my-2"/>
    </div>

    {#each data.data as entry}
        {#if entry.team == teamSearch}
            <div class="flex flex-col mb-3">
                <iframe src={entry.picture} allow="autoplay" width="600" height="400" class="mx-auto"></iframe>
            </div>
        {/if}
    {/each}

</center>
