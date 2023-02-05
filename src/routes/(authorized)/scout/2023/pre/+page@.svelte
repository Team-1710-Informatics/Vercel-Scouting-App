<script lang="ts">
    //@ts-nocheck
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";

    import red from "$lib/assets/scout/2023/red_community.png";
    import blue from "$lib/assets/scout/2023/blue_community.png";

    const imgs = {
        red:red,
        blue:blue
    }

    let team:number;
    let match:number;
    let alliance:string = "";

    let coordinates:{x:number,y:number} = {
        x: NaN,
        y: NaN,
        sx: NaN,
        sy: NaN
    }

    let comm:HTMLImageElement;

    function setStartingPosition(event) {
        const rect = comm.getBoundingClientRect();
        coordinates.x = event.clientX - rect.left;
        coordinates.y = event.clientY - rect.top;
        coordinates.sx = event.clientX;
        coordinates.sy = event.clientY;
    }
</script>

<center>
    <div class="box w-fit mt-10">
        <div class="grid grid-cols-2">
            <div>Team Number:</div>
            <input class="justify-self-end w-24" type="number" bind:value={team}>
        </div>
        <div class="grid grid-cols-2">
            <div>Match Number:</div>
            <input class="justify-self-end w-24" type="number" bind:value={match}>
        </div>
        <div>
            <input name="alliance" type="radio" bind:group={alliance} value="red">
            Red Alliance
        </div>
        <div>
            <input name="alliance" type="radio" bind:group={alliance} value="blue">
            Blue Alliance
        </div>
        {#if team && match && alliance}
            <div transition:slide class="w-fit">
                <img alt="community" bind:this={comm} class="bg-red-500 bg-blue-500" on:click={setStartingPosition} src={imgs[alliance]}/>
                {#if coordinates.y != NaN}<div class="rounded-full w-5 h-5 bg-{alliance}-500" style="position:absolute; top:{+coordinates.sy-10}px; left:{coordinates.sx-10}px;"/>{/if}
            </div>
        {/if}
        {#if team && match && alliance && coordinates.x}
            <br>
            <button transition:slide class="submit-button">
                Next
            </button>
        {/if}
    </div>
</center>