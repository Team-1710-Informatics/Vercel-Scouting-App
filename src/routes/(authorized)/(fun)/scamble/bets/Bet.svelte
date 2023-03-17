<script>
    import Credits from "$lib/components/visual/Credits.svelte";
    import { page } from "$app/stores";

    const MAX_BET=0.5;

    export let data;

    async function load(){
        const o = await fetch(`http://${$page.url.host}/internal-api/credits/${data.user}`);

        return await o.json();
    }

    let wager=0;
</script>

<div class="box">
    <center class="flex flex-col w-fit">
        {#await load()}
            <p>Loading...</p>
        {:then credits}
            <Credits class="text-2xl">{credits}</Credits>
            <input type="range" min=0 max={credits*MAX_BET} bind:value={wager}/>
            <button>Bet <Credits>{wager}</Credits> credits</button>
        {/await}
    </center>
</div>