<script>
    export let data;
</script>

<center class="py-10">
    <p>Already scouted:</p>
    <div class="grid grid-cols-3 gap-2 w-fit">
        {#each data.scouted as team}
            {#if team > 0}
                <div><a href="../data/2023/team/2023ksla/{team}" class="text-blue-500 underline hover:text-white">{team}</a></div>
            {/if}
        {/each}
    </div>
    <br>
    <a href="./" class="pt-5"><button class="submit">Pit Scout!</button></a>
</center>