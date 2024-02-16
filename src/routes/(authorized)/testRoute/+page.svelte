<script>
    import { onMount } from 'svelte';
    import ColorSwappingText from "$lib/components/visual/ColorSwappingText.svelte";
    import { redirect } from '@sveltejs/kit';

    let canvas;
    let ctx;
    let active=false;
    let color = "#0e7cc1";

    $: innerWidth = 0;

    const sizes=[
        5,10,20,30,40
    ]
    
    let width = 5;

    function clear(){
        ctx.fillStyle="blue";
        ctx.fillRect(0,0,innerWidth-50,500);
    }

    onMount(()=>{
        ctx=canvas.getContext('2d');
    });

    function handleMouse(event){
        const rect = canvas.getBoundingClientRect();
        if(active){
            let clickX = Math.trunc(event.clientX - rect.left);
            let clickY = Math.trunc(event.clientY - rect.top);
            clickX=clickX-(width/2);
            clickY=clickY-(width/2);
            console.log(clickX, clickY);
            ctx.fillStyle=color;
            ctx.beginPath();
            ctx.arc(clickX,clickY,width,0,2 * Math.PI);
            ctx.fill();
        }
    }


</script>

<svelte:window bind:innerWidth/>

<div class="flex flex-col overflow-x-hidden">
    <h1 class="text-5xl mx-auto underline my-5"><ColorSwappingText text={"SCOUTING PAINT"}/></h1>
    <canvas width={innerWidth-50} height=400 class="mx-auto" bind:this={canvas} 
        on:touchstart={()=>{active=true;document.body.style.overflow = 'hidden';}} 
        on:touchend={()=>{active=false;document.body.style.overflow = 'auto';}} 
        on:mousedown={()=>{active=true;}} 
        on:mouseup={()=>{active=false}} 
        on:pointermove={handleMouse}/>
    <div class="grid grid-cols-5 mx-auto rounded my-2">
        {#each sizes as size}
            <button class="border-2 rounded bg-white mx-1 mt-1"  on:click={()=>{width=size;}}>
                <div class="bg-black m-auto p-0" style="width:{size}px;height:{size}px;border-radius:100%;"/>
            </button>
        {/each}
    </div>
    <input type="color" bind:value={color} class="mx-auto my-2"/>
    <button class="w-fit rounded border-2 mx-auto my-2" on:click={clear}>Clear/Reset</button>
    <button class="w-fit rounded border-2 mx-auto my-2" on:click={()=>{
        let image = ctx.toDataURL("image/png").replace("image/png", "image/octet-stream");
        throw redirect(308, image);
    }}>Download</button>
</div>

<style>
    button:hover{
        background-color:blue;
    }
</style>