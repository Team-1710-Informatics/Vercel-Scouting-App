<script>
    export let entry;

    let width = 180;
    let height = 5;
</script>

<div style="width:{width}px; height:{height}px" class="relative bg-white">
    {#each entry.game.actions as action}
        {#if (action.time - entry.game.start)/1000 <= 18}
            <div 
                style="
                    width:{width/18}px;
                    height:{height}px;
                    left:{(action.time - entry.game.start)/100}px;
                "
                class="bg-cyan-500 absolute"
            />
        {/if}
    {/each}
</div> 