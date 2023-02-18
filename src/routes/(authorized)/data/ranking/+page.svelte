<script>
    export let data;

    // data.list.forEach(()=>{

    // })
</script>

<center>
    {#each data.list as robot}
        <br>
        <div class="box grid grid-cols-2">
            <h6>Team: {robot.team}</h6>
            <h6>Match: {robot.match}</h6>
            <p class="mr-1"><span class="text-gray-400 text-sm">Direct score:</span>{robot.score}</p>
            <p class="ml-1"><span class="text-gray-400 text-sm">Scout rating:</span>{robot.rating}/10</p>
        </div>
    {/each}
</center>