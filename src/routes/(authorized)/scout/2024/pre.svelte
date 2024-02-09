<script>
    import CompetitionSelector from "$lib/components/search/CompetitionSelector.svelte";
    import TeamSelector from "$lib/components/search/TeamSelector.svelte";
    import x from "$lib/assets/icons/x.svg";
    import check from "$lib/assets/icons/check.svg";
    import tba from "$lib/modules/tba";
    import { slide } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import Starting from "./Starting.svelte";
    const dispatch = createEventDispatcher();

    export let meta;
    export let events;
    export let pregame;

    const loadImgs = [
        {
            name:"none",
            value:false,
            src:x,
            style:"filter: brightness(0) saturate(100%) invert(22%) sepia(99%) saturate(6156%) hue-rotate(356deg) brightness(96%) contrast(117%);"
        },
        {
            name:"preloaded",
            value:true,
            src:check,
            style:"filter: brightness(0) saturate(100%) invert(22%) sepia(99%) saturate(6156%) hue-rotate(356deg) brightness(96%) contrast(117%);"
        }
    ]

    let disabled = false;


    $: key = `${meta.event}_qm${meta.match}`;
    $: innerWidth = 0;
    $: condition = innerWidth <= 290;
</script>

<svelte:window bind:innerWidth/>
<main style="overflow-y:hidden;">
<div class="h-full">
    <u class="underline font-bold text-3xl">Pre-Match</u>
    <div class="boxing">
        <div class="grid grid-cols-4">
            {#if !condition}
                <b class="justify-self-start">Event:</b>
                <div class="col-span-3 justify-self-end"><CompetitionSelector class="w-16" events={[{short_name:"!Practice Scouting",key:"2024practice"},{short_name:"!Practice Scouting",key:"2024practice"},...events]} bind:event={meta.event} {disabled} /> </div>
            {:else if condition}
                <b class="col-span-4 mx-auto">Event:</b>
                <div class="col-span-4 mx-auto"><CompetitionSelector class="w-16" events={[{short_name:"!Practice Scouting",key:"2024practice"},{short_name:"!Practice Scouting",key:"2024practice"},...events]} bind:event={meta.event} {disabled} /> </div>
            {/if}
            <b class="justify-self-start mx-auto col-span-2">Match:</b>
            <b class="justify-self-end mx-auto col-span-2">Team:</b>

            <div class="justify-self-start col-span-2 mx-auto"><input class="w-16" type="number" bind:value={meta.match}/></div>
            <div class="justify-self-end mx-auto col-span-2"><input class="w-16"type="number" bind:value={meta.team}/></div>

            <b class="justify-self-start col-span-2 mt-4">Alliance:</b>
            {#each ['red','blue'] as all}
                <label class="justify-self-start mt-4">
                    <input class="{all==="red"?"accent-red-600":"accent-blue-600"}" type="radio" bind:group={meta.alliance} value={all} {disabled}>
                    <span class="capitalize">{all}</span>
                </label>
            {/each}
        </div>
        {#await tba(`match/${key}/simple`)}
            <p class="text-xs opacity-50" transition:slide>Loading...</p>
        {:then m}
            <TeamSelector {disabled} match={m} bind:team={meta.team} bind:alliance={meta.alliance} />
        {/await}
        <br>
        {#if !disabled}
            <button on:click={()=>{disabled=true;}} class="submit" disabled={!(meta.event && meta.match && meta.team && meta.alliance)}>Next</button>
        {:else}
            <div in:slide>
                <button class="rounded border-2 bg-slate-800">No Show</button>
                <Starting alliance={meta.alliance} bind:value={pregame.startPosition}/>
                <div class="flex flex-row w-fit my-2">
                    <b class="mr-6 self-center">Preload:</b>
                    {#each loadImgs as img}
                        <button class="bg-none border-none opacity-50" class:opacity-100={pregame.preload===img.value} class:bg-white={pregame.preload===img.value} on:click={()=>{pregame.preload=img.value}}>
                            <img width=28px height=28px alt={img.value} src={img.src} style={img?.style}>
                        </button>
                    {/each}
                </div>
                <button on:click={()=>{dispatch("advance")}} class="submit" disabled={!(pregame.startPosition.x) || (pregame.preload!==true && pregame.preload!==false)}>Next</button>
            </div>
        {/if}
    </div>
</div>
</main>

<style>
    .boxing{
        @apply my-4;
        border: 5px #363131;
        border-radius: 8%;
        background-color:#171c26;
        padding: 0.75rem;
        width: fit-content;
        opacity:80%;

        box-shadow: 0px 0px 3px 1px black;
    }
</style>