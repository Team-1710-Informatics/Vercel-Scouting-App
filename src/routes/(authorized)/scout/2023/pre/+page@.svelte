<script lang="ts">
    //@ts-nocheck
    import { slide } from "svelte/transition";
    import { enhance } from "$app/forms";

    import red from "$lib/assets/scout/2023/red_community.png";
    import blue from "$lib/assets/scout/2023/blue_community.png";

    import cone from "$lib/assets/scout/2023/cone.png";
    import cube from "$lib/assets/scout/2023/cube.png";
    import x from "$lib/assets/icons/x.svg";

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
        coordinates.x = Math.trunc(event.clientX - rect.left);
        coordinates.y = Math.trunc(event.clientY - rect.top);
        coordinates.sx = event.clientX;
        coordinates.sy = event.clientY;

        coordinates = coordinates;
    }

    let preload:"cube"|"cone"|null;

    $: data = JSON.stringify({
        team,
        match,
        alliance,
        start:{
            x:coordinates.x,
            y:coordinates.y
        },
        preload
    });
</script>

<img src={red} alt="" class="opacity-25 bg-blue-600 bg-red-600" hidden/>
<img src={blue} alt="" hidden/>

<svelte:body style="margin-top:0px"/>

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
        <br>
        {#if team && match && alliance}
            <div transition:slide class="w-fit">
                Select starting position
                <img alt="community" bind:this={comm} class="bg-red-500 bg-blue-500" on:click={setStartingPosition} src={imgs[alliance]}/>
                {#if coordinates.y != NaN}<div class="rounded-full w-5 h-5 bg-{alliance}-600 border-2 border-black" style="position:absolute; top:{+coordinates.sy-10}px; left:{coordinates.sx-10}px;"/>{/if}
            </div>
        {/if}
        <br>

        <center>
            <div class="flex flex-row items-center w-fit">
                <p>Preload:</p>
                <button class="bg-none border-none bg-opacity-50 opacity-50" class:opacity-100={preload=="cube"} class:bg-white={preload=="cube"} on:click={()=>{preload="cube"}}><img width=28px height=28px src={cube} alt=""></button>
                <button class="bg-none border-none bg-opacity-50 opacity-50" class:opacity-100={preload=="cone"} class:bg-white={preload=="cone"} on:click={()=>{preload="cone"}}><img width=28px height=28px src={cone} alt=""></button>
                <button class="bg-none border-none bg-opacity-50 opacity-50" class:opacity-100={preload== null } class:bg-white={preload== null } on:click={()=>{preload= null }}><img width=28px height=28px style="filter: brightness(0) saturate(100%) invert(22%) sepia(99%) saturate(6156%) hue-rotate(356deg) brightness(96%) contrast(117%);" src={x} alt=""></button>
            </div>
        </center>

        {#if team && match && alliance && coordinates.x}
            <br>
            <form method="POST" use:enhance>
                <input hidden type="text" name="data" bind:value={data} />
                <button transition:slide class="submit-button">
                    Next
                </button>
            </form>
        {/if}
    </div>
</center>