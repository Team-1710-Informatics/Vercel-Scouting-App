<script>
    export let data;
</script>

<center class="pt-10">
    <p>Already scouted:</p>
    {#each data.scouted as team}
        <p>{team}</p>
    {/each}

    <a href="./" class="pt-5"><button class="submit">Pit Scout!</button></a>
</center>