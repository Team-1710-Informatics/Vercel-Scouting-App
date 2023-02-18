<script>
    export let data;
</script>

<center>
    <br>
    <h5>Leaderboard</h5>
    <br>
    <div class="grid grid-cols-3 w-fit box">
        <div class="text-xl mb-2">Rank</div>
        <div class="text-xl mb-2">User</div>
        <div class="text-xl mb-2">Credits</div>
        {#each data.list as u,i}
            <div>{i+1}</div>
            <div>{u.user}</div>
            <div class="text-teal-500 lcd">{u.credits}</div>
        {/each}
    </div>
    <br>
    <a href="/hub"><button>Back to Hub</button></a>
</center>

<style>
    @import url('https://fonts.cdnfonts.com/css/lcd');

    .lcd {
        font-family: 'LCDMono', sans-serif;
    }
</style>