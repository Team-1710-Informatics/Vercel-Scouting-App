<script>
    import tba from "$lib/modules/tba"; 

    export let event_key;

    // $: rankings = ''

    async function getRankings() {
        const rankings = await tba('event/' + event_key + '/rankings');
        console.log(rankings);
    }
</script>

<div>
    <button on:click={getRankings}>Test</button>
</div>