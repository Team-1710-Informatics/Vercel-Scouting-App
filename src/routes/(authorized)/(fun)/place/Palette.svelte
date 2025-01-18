<script lang=ts>

    export let colors:Color[];
    export let color:Color;
</script>

<div class="flex flex-row">
{#each colors as c}
    <button class="bg-none rounded border-2 border-black w-6 h-6"
        style="background-color:rgb({c.red},{c.green},{c.blue});"
    on:click={()=>{color=c}}/>
{/each}
</div>