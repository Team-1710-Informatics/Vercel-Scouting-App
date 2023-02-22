<script>
    export let constrain = 1000;
    let content;

    let style = "";

    let ww;
    let wh;
    
    function move(e){
        if(wh > ww) return;
        let box = content.getBoundingClientRect();
        let xr = -(e.clientY - box.y - (box.height / 2)) / constrain;
        let yr = (e.clientX - box.x - (box.width / 2)) / constrain;
        style = `transform:perspective(100px) rotateX(${xr}deg) rotateY(${yr}deg)`;
    }
</script>

<svelte:window on:mousemove={move} bind:innerHeight={wh} bind:innerWidth={ww}/>

<div bind:this={content} class="w-fit" {style}>
    <slot />
</div>