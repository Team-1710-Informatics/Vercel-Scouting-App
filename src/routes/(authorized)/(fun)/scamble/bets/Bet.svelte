<script>
    import Credits from "$lib/components/visual/Credits.svelte";
    import { page } from "$app/stores";
    import { enhance } from "$app/forms";

    const MAX_BET=0.25;

    export let data;
    export let match;

    async function load(){
        const o = await fetch(`http://${$page.url.host}/internal-api/credits/${data.user}`);

        return await o.json();
    }

    let wager=0;

    let loading = false;

    let alliance="blue";
</script>

<div class="box m-6">
    <center class="flex flex-col w-fit">
        {#await load()}
            <p>Loading...</p>
        {:then credits}
            <form method="POST" action="?/bet" use:enhance={() => {
                loading = true;
                //@ts-ignore
                return async ({ update }) => {
                    await update();
                    loading = false;
                };
            }}>
                <div class="w-fit text-2xl self-center text-teal-500"><Credits class="">{credits-wager}</Credits> credits</div>
                <input type="number" name="wager" bind:value={wager}/>
                <input hidden type="text" name="match" bind:value={match.key}/>
                <p class="opacity-50 text-xs">Max bet: {Math.trunc(credits*MAX_BET)}</p>
                <div class="grid grid-cols-2 my-2">
                    <label class="text-blue-400 accent-blue-900"><input bind:group={alliance} type="radio" name="alliance" value="blue"/> Blue</label>
                    <label class="text-red-400 accent-red-900"><input bind:group={alliance} type="radio" name="alliance" value="red"/> Red</label>
                </div>
                <button class="bg-gradient-to-t from-slate-800 to-slate-500 border-black" disabled={wager > credits*MAX_BET || wager <= 0 || wager != Math.trunc(wager) || loading }>Bet <Credits>{wager}</Credits> credits</button>
            </form>
        {/await}
    </center>
</div>