<script>
    import CompetitionSelector from "$lib/components/CompetitionSelector.svelte";
    import Starting from "./Starting.svelte";
    import { slide } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    import cube from "$lib/assets/scout/2023/cube.png";
    import cone from "$lib/assets/scout/2023/cone.png";
    import x from "$lib/assets/icons/x.svg";

    const imgs=[
        ["cube",cube,""],
        ["cone",cone,""],
        ["none",x   ,"filter: brightness(0) saturate(100%) invert(22%) sepia(99%) saturate(6156%) hue-rotate(356deg) brightness(96%) contrast(117%);"],
    ]

    export let meta;
    export let pregame;

    export let events;

    let disabled = false;
</script>

<h5>Pre-Match</h5>
<br>
<div class="box">
    <div id="metadata" class="grid grid-cols-4 gap-y-2 mb-3">
        <b class="justify-self-start">Event:</b>
        <div class="col-span-3 justify-self-end"><CompetitionSelector {events} bind:event={meta.event} {disabled} /></div>
        
        <b class="justify-self-start">Match:</b>
        <div><input class="w-16" type="number" bind:value={meta.match} {disabled}></div>

        <b>Team: </b>
        <div class="justify-self-end"><input class="w-16" type="number" bind:value={meta.team} {disabled}></div>

        <b class="justify-self-start col-span-2">Alliance:</b>
        <!-- <div class="justify-self-end col-span-2"> -->
            {#each ['red','blue'] as all}
                <label class="justify-self-start">
                    <input class="{all==="red"?"accent-red-600":"accent-blue-600"}" type="radio" bind:group={meta.alliance} value={all} {disabled}>
                    <span class="capitalize">{all}</span>
                </label>
            {/each}
        <!-- </div> -->
    </div>
    {#if !disabled}
        <button on:click={()=>{disabled=true;}} class="submit" disabled={!(meta.event && meta.match && meta.team && meta.alliance)}>Next</button>
    {:else}
        <div id="pregame" in:slide>
            <b>Select starting position:</b>
            <Starting alliance={meta.alliance} bind:value={pregame.startPosition} />
            <div class="flex flex-row w-fit my-2">
                <b class="mr-6 self-center">Preload:</b>
                {#each imgs as img}
                    <button class="bg-none border-none opacity-50" class:opacity-100={pregame.preload===img[0]} class:bg-white={pregame.preload===img[0]} on:click={()=>{pregame.preload=img[0]}}>
                        <img width=28px height=28px alt={img[0]} src={img[1]} style={img[2]}>
                    </button>
                {/each}
            </div>
            <button on:click={()=>{dispatch("advance")}} class="submit" disabled={!(pregame.startPosition.x && pregame.preload)}>Next</button>
        </div>
    {/if}
</div>
