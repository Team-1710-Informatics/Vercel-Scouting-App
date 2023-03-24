<script>
    import CompetitionSelector from '$lib/components/search/CompetitionSelector.svelte';


    export let data;

    let event = data.current?.key??undefined
</script>

<center class="py-10">
    <div class="box">
        <h6>Competition</h6>
        <CompetitionSelector bind:event={event} events={data.events}/>
    </div>
    <br>
    <p>Already scouted:</p>
    <div class="grid grid-cols-3 gap-2 w-fit">
        {#each data.scouted as team}
            {#if team.team > 0 && team.event === event}
                <div><a href="../data/2023/team/{team.event}/{team.team}" class="text-blue-500 underline hover:text-white">{team.team}</a></div>
            {/if}
        {/each}
    </div>
    <br>
    <a href="./" class="pt-5"><button class="submit">Pit Scout!</button></a>
</center>