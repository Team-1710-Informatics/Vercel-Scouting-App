<script>
    import { enhance } from "$app/forms";
    import Loading from "$lib/components/ui/Loading.svelte";
    import { slide } from "svelte/transition";
    import { page } from "$app/stores";
    import { tweened } from "svelte/motion";
    import { flip } from "svelte/animate";

    export let data;
    export let form;

    $: if(form?.portfolio){
        data.portfolio = form.portfolio;
        delete form.portfolio;
        stocks = 0;
        sell = 0;
    }

    async function value(team){
        return (await fetch(`stocks/${team}`)).json();
    }

    let team=1710;
    let inputTeam=1710;

    let stocks=0;
    let sell=0;

    let loading = false

    let credits=tweened(0);
    $: if(data.portfolio||!data.portfolio){
        loadCredits();
    }

    async function loadCredits(){
        const o = await fetch(`http${$page.url.hostname==="localhost"?"":"s"}://${$page.url.host}/internal/credits/${data.user}`);
        
        credits.set(await o.json());
    }

    function num(){
        if(!data.portfolio?.portfolio) return 0;
        let sum=0;
        Object.keys(data.portfolio.portfolio).forEach(p=>{
            sum+=data.portfolio.portfolio[p];
        })
        return sum;
    }
</script>

<middle class="py-10">
    <p class="font-black text-6xl">SCAMBLE</p>
    <p class="font-serif font-black text-6xl underline">STOCKS</p>
    <div class="h-5"/>
    <div class="font-serif font-black">
        <div class="box">
            <center>
                <label>
                    <button class="rounded-none border-b-4 border-black hover:border-gray-400 bg-gradient-to-b from-sky-50 to-sky-200" on:click={()=>{team=inputTeam}}>Search Stock:</button>
                    <input type="number" class="w-16" bind:value={inputTeam}>
                </label>
                <hr class="border-black my-2"/>

                {#await value(team)}
                    <Loading/>
                {:then t}
                    {#if t.value != undefined}
                        <div transition:slide>
                            <div class="grid grid-cols-2">
                                <div class="justify-self-start">{t.team} value:</div> 
                                <div class="justify-self-end text-xl">{t.value} cr.</div>
                            </div>
                            <form method=POST action=?/purchase use:enhance={() => {
                                loading = true;
                                //@ts-ignore
                                return async ({ update }) => {
                                    await update();
                                    loading = false;
                                };
                            }}>
                                <label>
                                    Purchase stocks:
                                    <input class="w-16" type="number" name="stocks" bind:value={stocks}>
                                    <input hidden type="number" name="team" value={t.team}>
                                </label><hr class="border-black my-2">
                                <div class="grid grid-cols-2">
                                    <div class="text-2xl col-span-2 justify-self-start">{Math.trunc($credits-stocks*t.value)} cr.</div>
                                    <div class="justify-self-start self-end" class:text-red-500={(num()+stocks)>5}>
                                        {num()+stocks}<span class="opacity-50">/5</span>
                                    </div>
                                    <button disabled={
                                        loading ||
                                        stocks != Math.trunc(stocks) ||
                                        stocks <= 0 ||
                                        stocks*t.value > $credits ||
                                        (num()+stocks)>5
                                    } class="rounded-none border-black  bg-gradient-to-b from-green-200 to-emerald-400 w-fit justify-self-end">{stocks*t.value} cr.</button>
                                </div>
                            </form>
                        </div>
                    {:else}
                        <div>Invalid item</div>
                    {/if}
                {/await}
            </center>
        </div>
        <br>   
    </div>
    <div class="h-16">{loading?"Loading...":""}</div>
    <div class="box font-serif font-black">
        <div class="grid grid-cols-5">
            <div class="col-span-2">Your portfolio</div>
            <div class="justify-self-center">
                {#key data.portfolio}{num()}<span class="opacity-50">/5</span>{/key}
            </div>
            <label class="justify-self-end col-span-2">
                Sell:
                <input class="w-16" type="number" bind:value={sell}>
            </label>
        </div>
        <table>
            <tr>
                <th>Stock</th>
                <th>Amount</th>
                <th>Value</th>
                <th>Sell</th>
            </tr>
            {#if data.portfolio?.portfolio}{#each Object.keys(data.portfolio.portfolio) as team (team)}
                <tr animate:flip>
                    {#if data.portfolio.portfolio[team] > 0}
                        <th>{team}</th>
                        <td>{data.portfolio.portfolio[team]}</td>
                        {#await value(team)}
                            <td></td>
                            <td></td>
                        {:then v}
                            <td>{v.value*data.portfolio.portfolio[team]}</td>
                            <td class="p-0">
                                {#if Date.now()-(data.portfolio?.times?.[team]??0)>86400000}
                                    <form class="w-full h-full" method=POST action=?/sell use:enhance={() => {
                                        loading = true;
                                        //@ts-ignore
                                        return async ({ update }) => {
                                            await update();
                                            loading = false;
                                        };
                                    }}>
                                        <input hidden value={team} name="team">
                                        <input hidden bind:value={sell} name="sell">
                                        <button disabled={
                                            sell <= 0 ||
                                            sell >data.portfolio.portfolio[team] ||
                                            sell != Math.trunc(sell) ||
                                            loading
                                        } class="w-full h-full rounded-none bg-gradient-to-b from-red-100 to-rose-400 border-black text-xs">{sell??0} for<br>{sell*v.value} cr.</button>
                                    </form>
                                {:else}
                                    <button disabled class="w-full h-full rounded-none bg-gradient-to-b from-red-100 to-rose-400 border-black text-xs">Sell in<br>{Math.trunc((86400000-(Date.now()-(data.portfolio.times[team])))/3600000)} hours</button>
                                {/if}
                            </td>
                        {/await}
                    {/if}
                </tr>
            {/each}{/if}
        </table>
    </div>
</middle>

<style>
    .box {
        background-image: linear-gradient(to bottom, rgb(255, 255, 255), rgb(200, 200, 200));
        border-color: rgb(0, 0, 0);
        color: rgb(0, 0, 0);
        border-radius: 0.5rem;
        border-width: 1px;
        padding: 0.75rem;
        width: fit-content;

        box-shadow: 0px 0px 3px 1px black;
    }

    th {
        text-align:center;
        border:2px solid black;
        width:72px;
    }

    td {
        text-align:center;
        border:2px solid black;
        width:72px;
        height:45px;
        font-weight: 500 !important;
    }
</style>