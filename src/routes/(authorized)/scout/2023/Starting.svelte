<script>
    import red from "$lib/assets/scout/2023/red_community.png";
    import blue from "$lib/assets/scout/2023/blue_community.png";
    const imgs = {
        red:red,
        blue:blue
    }

    export let alliance;
    export const value = {
        x:NaN,
        y:NaN
    }
    export let display=false;

    let coordinates={
        x: NaN,
        y: NaN,
        sx: NaN,
        sy: NaN
    }

    let comm;

    function setStartingPosition(event) {
        if(display) return;
        const rect = comm.getBoundingClientRect();
        coordinates.x = Math.trunc(event.clientX - rect.left);
        coordinates.y = Math.trunc(event.clientY - rect.top);
        coordinates.sx = event.clientX;
        coordinates.sy = event.clientY;

        value.x = coordinates.x;
        value.y = coordinates.y;

        coordinates = coordinates;
    }
</script>

<div class="w-fit">
    <img alt="" class="border-black rounded border-2" bind:this={comm} on:click={setStartingPosition} on:keydown={()=>{return}} src={imgs[alliance]}/>
    {#if coordinates.y != NaN}<div class="rounded-full w-5 h-5 {alliance=="red"?"bg-red-600":"bg-blue-600"} border-2 border-black" style="position:absolute; top:{+coordinates.sy-10}px; left:{coordinates.sx-10}px;"/>{/if}
</div>