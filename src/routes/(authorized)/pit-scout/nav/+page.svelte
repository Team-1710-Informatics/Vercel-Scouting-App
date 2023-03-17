<script>
    export let data;
</script>

<center class="py-10">
    <p>Already scouted:</p>
    {#each data.scouted as team}
        <div><a href="../data/2023/team/2023ksla/{team}" class="text-blue-500 underline hover:text-white">{team}</a></div>
    {/each}

    <a href="./" class="pt-5"><button class="submit">Pit Scout!</button></a>
</center>