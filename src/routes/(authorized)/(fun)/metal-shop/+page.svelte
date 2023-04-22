<script>
    import { enhance } from "$app/forms";
    import { PUBLIC_HOST } from "$env/static/public";
    import Credits from "$lib/components/visual/Credits.svelte";
    import { tweened } from "svelte/motion";
    import meme from "$lib/assets/credits/Screenshot_20230330_162537_Firefox.jpg";
    import { slide } from 'svelte/transition';

    let credits = tweened(0);

    export let data;
    export let form;

    async function load(){
        const c = await (await fetch(`${PUBLIC_HOST}/internal/credits/${data.user}`)).json();

        credits.set(c);
    }

    console.log(data)

    $: {
        if(form?.bismuth){
            data.bismuth = form.bismuth;
        }
        if(form?.tungsten){
            data.tungsten = form.tungsten;
        }
        if(form?.tourmaline){
            data.tourmaline = form.tourmaline;
        }
        if(form?.welmanite){
            data.welmanite = form.welmanite;
        }
        load();
    }

    $: metals = [
        {
            name:"bismuth",
            cost:1000
        },{
            name:"tungsten",
            cost:4000,
            upgrade:"bismuth",
            upgradeAble:(data?.bismuth<4?true:false),
        },{
            name:"tourmaline",
            cost:16000,
            upgrade:"tungsten",
            upgradeAble:(data?.tungsten<4?true:false),
        },{
            name:"welmanite",
            cost:64000,
            upgrade:"tourmaline",
            upgradeAble:(data?.tourmaline<4?true:false),
        }
    ]
    let loading = false;
</script>

<middle class="py-10">
    <h5 class="mb-5 text-6xl">METAL SHOP</h5>
    <p class="mb-5 text-2xl text-teal-400 font-bold"><Credits class="mb-5 text-3xl">{Math.trunc($credits)}</Credits> credits</p>
    <i>refresh after each purchase</i>
    <div class="grid grid-cols-2 gap-x-1">
        {#each metals as metal}
            <form class="mb-5 text-xs" method=POST action=?/metalAdd use:enhance={() => {
                loading = true;
                //@ts-ignore
                return async ({ update }) => {
                    await update();
                    loading = false;
                };
            }}>
                <input hidden value={metal.name} name="type"/><input hidden value={metal.cost} name="cost"/>
                <button class="font-bold bg-gradient-to-t from-slate-800 to-emerald-800 p-3 w-40" disabled={$credits < metal.cost || loading}>Buy 1 {metal.name}<br>for {metal.cost} credits</button>
            </form>
            {#if metal.name != "bismuth"}
                <form class="mb-5 text-xs" method=POST action=?/metalUpgrade use:enhance={() => {
                    loading = true;
                    //@ts-ignore
                    return async ({ update }) => {
                        await update();
                        loading = false;
                    };
                }}>
                    <input hidden value={metal.name} name="type"/>
                    <input hidden value={metal.upgrade} name="upgrader"/>
                    <button class="font-bold bg-gradient-to-t from-slate-800 to-emerald-800 p-3 w-40" disabled={metal?.upgradeAble}>Buy 1 {metal.name}<br>for 4 {metal.upgrade}</button>
                </form>
            {:else}
                <div/>
            {/if}
        {/each}
    </div>
    <p class="mb-5 text-2xl text-teal-400 font-bold"><span class="mb-5 text-3xl">{data.bismuth}</span> bismuth</p>
    <p class="mb-5 text-2xl text-teal-400 font-bold"><span class="mb-5 text-3xl">{data.tungsten}</span> tungsten</p>
    <p class="mb-5 text-2xl text-teal-400 font-bold"><span class="mb-5 text-3xl">{data.tourmaline}</span> tourmaline</p>
    <p class="mb-5 text-2xl text-teal-400 font-bold"><span class="mb-5 text-3xl">{data.welmanite}</span> welmanite</p>
    {#if (!data.bismuth && !data.tungsten && !data.tourmaline && !data.welmanite && $credits >= 1000) || data.user === "Gaven" || data.user ==="Slugger123"}
        <img class='rounded-lg' src={meme} alt="" transition:slide width=300px />
    {/if}
</middle>
