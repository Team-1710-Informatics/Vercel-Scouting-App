<script lang="ts">
    import Node from './Node.svelte';
    export let state:any;

    const grid = [
        ['^','c','^','^','c','^','^','c','^'],
        ['^','c','^','^','c','^','^','c','^'],
        ['h','h','h','h','h','h','h','h','h'],
    ]
</script>

<div class="w-fit">
    <div class="grid gap-0 overflow-x-scroll box" style="grid-template-columns: repeat(9, 48px); max-width:90vw">
        {#each grid as row, y}
            {#each row as node, x}
                <Node bind:state={state} pos={{x,y}}/>
            {/each}
        {/each}
    </div>
</div>

<style>
    
</style>