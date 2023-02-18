<script>
    import { onMount } from "svelte";


    export let constrain = 500;
    let content;
    let xr;
    let yr;
    
    function move(e){
        let box = content.getBoundingClientRect();
        xr = -(e.clientY - box.y - (box.height / 2)) / constrain;
        yr = (e.clientX - box.x - (box.width / 2)) / constrain;
    }
</script>

<svelte:window on:mousemove={move} />

<div bind:this={content} class="w-fit" style="transform:perspective(100px) rotateX({xr}deg) rotateY({yr}deg)">
    <slot />
</div>