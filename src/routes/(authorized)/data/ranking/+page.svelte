<script>
    export let data;

    // data.list.forEach(()=>{

    // })
</script>

<center>
    {#each data.list as robot}
        <br>
        <div class="box grid grid-cols-2">
            <h6>{robot.team}</h6>
            <h6>{robot.match}</h6>
            <p><span class="text-gray-400 text-sm">Direct score:</span>{robot.score}</p>
            <p><span class="text-gray-400 text-sm">Scout rating:</span>{robot.rating}</p>
        </div>
    {/each}
</center>