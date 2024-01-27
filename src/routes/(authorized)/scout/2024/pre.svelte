<script>
    import CompetitionSelector from "$lib/components/search/CompetitionSelector.svelte";
    import TeamSelector from "$lib/components/search/TeamSelector.svelte";
    import tba from "$lib/modules/tba";
    import { slide } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let meta;
    export let events;

    let disabled = false;

    $: key = `${meta.event}_qm${meta.match}`;
</script>

<div class="h-full pt-5">
    <u class="underline font-bold text-3xl">Pre-Match</u>
    <div class="boxing">
        <div class="grid grid-cols-4">
            <b class="justify-self-start">Event:</b>
            <div class="col-span-3 justify-self-end"><CompetitionSelector class="w-16" events={[{short_name:"!Practice Scouting",key:"2023practice"},{short_name:"!Daly Pre-scout",key:"2023predaly"},...events]} bind:event={meta.event} {disabled} /> </div>

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
    </div>
</div>

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