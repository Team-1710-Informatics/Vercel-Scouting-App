<script>
    import Credits from "$lib/components/visual/Credits.svelte";
    import { page } from "$app/stores";
    import { enhance } from "$app/forms";
    import { fade, slide } from "svelte/transition";

    const MIN = 1000;
    function max(c){
        let o = c-MIN;

        if(c<MIN*1.5){
            o=c/3;
        }

        return Math.trunc(o);
    };

    export let data;
    export let match;

    async function load(){
        const o = await fetch(`http${$page.url.hostname==="localhost"?"":"s"}://${$page.url.host}/internal-api/credits/${data.user}`);
        
        return await o.json();
    }

    let wager=0;

    let loading = false;

    let alliance="blue";
</script>

<div 
    class="font-bold bg-gradient-to-b from-slate-900 to-slate-800 text-center p-2 border-2 rounded-lg rounded-t-none border-white mt-2" 
    style="max-width:96vw; width:300px"
>
    <center class="flex flex-col">
        {#await load()}
            <p transition:slide>Loading...</p>
        {:then credits}
            <form transition:slide method="POST" action="?/bet" use:enhance={() => {
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
                <p class="opacity-50 text-xs">Max bet: {max(credits)}</p>
                <div class="grid grid-cols-2 my-2 -mx-2 bg-gradient-to-r border-y-2 border-white/75
                 {alliance==="blue"?"from-blue-600 via-transparent to-red-600/50":"from-blue-600/50 via-transparent to-red-600"}">
                    <label class="accent-blue-500 {alliance==="blue"?"opacity-100 underline decoration-2":"opacity-50"}"><input hidden bind:group={alliance} type="radio" name="alliance" value="blue"/> Blue</label>
                    <label class="accent-red-500 {alliance==="red"?"opacity-100 underline decoration-2":"opacity-50"}"><input hidden bind:group={alliance} type="radio" name="alliance" value="red"/> Red</label>
                </div>
                <button class="bg-gradient-to-t from-slate-800 to-slate-500 border-black" disabled={wager > max(credits) || wager <= 0 || wager != Math.trunc(wager) || loading }>Bet <Credits>{wager}</Credits> credits</button>
            </form>
        {/await}
    </center>
</div>