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

    $: {
        if(form?.bismuth){
            data.bismuth = form.bismuth
        }
        load();
    }

    let loading = false;
</script>

<middle class="py-10">
    <h5 class="mb-5 text-6xl">METAL SHOP</h5>
    <p class="mb-5 text-2xl text-teal-400 font-bold"><Credits class="mb-5 text-3xl">{Math.trunc($credits)}</Credits> credits</p>
    <form class="mb-5" method=POST use:enhance={() => {
        loading = true;
        //@ts-ignore
        return async ({ update }) => {
            await update();
            loading = false;
        };
    }}>
        <button class="font-bold bg-gradient-to-t from-slate-800 to-emerald-800 p-3" disabled={$credits < 1000 || loading}>Purchase 1 Bismuth<br>for 1000 credits</button>
    </form>
    <p class="mb-5 text-2xl text-teal-400 font-bold"><span class="mb-5 text-3xl">{data.bismuth}</span> bismuth</p>
    {#if data.bismuth == 0}
        <img class='rounded-lg' src={meme} transition:slide width=300px />
    {/if}
</middle>
