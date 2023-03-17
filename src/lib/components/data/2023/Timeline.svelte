<script>
    export let entry;

    export let width=459;
    export let height=10;
</script>

<div style="width:{width}px; height:{height}px" class="relative bg-white">
    {#each entry.game.actions as action}
        <div 
            style="
                width:{width/153}px;
                height:{height}px;
                left:{(width/153)*(action.time - entry.game.start)/1000}px;
            "
            class="bg-cyan-500 absolute"
        />
    {/each}
</div> 