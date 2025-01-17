<script>
    import tba from "$lib/modules/tba"; 
    import { onMount } from 'svelte';

    export let event_key;

    let rankings;

    async function getRankings() {
        rankings = await tba('event/' + event_key + '/rankings');
        console.log(rankings);
    }

    onMount(() => {
        getRankings();
    });


</script>

<!-- <div>
    <button on:click={getRankings}>Test</button>
    {#if rankings}
        {#each rankings.rankings as ranking}
            {ranking.team_key}
        {/each}
    {/if}
</div> -->

<div>
    {#if rankings}
        <div>{rankings.rankings[10].team_key}</div>
    {/if}
</div>

<!-- <div>
    <div on:mount={getRankings}>
        {#if rankings}
            {#each rankings.rankings as ranking}
                {ranking.team_key}
            {/each}
        {/if}
    </div>
</div> -->


<!-- <div flex flex-rows flex-wrap>
    <div {getRankings}>
        {#if rankings}
            {#each rankings.rankings as ranking}
                {ranking.team_key}
            {/each}
        {/if}
    </div>
    <div>Rankings</div>
    <div>{rankings.team_key}</div>
</div> -->