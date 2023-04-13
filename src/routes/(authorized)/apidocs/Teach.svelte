<script>
    import { slide } from "svelte/transition";
    import schema from "../../(api)/api/index.js";

    export let arrow;
</script>

<h1>Return</h1>
<button on:click={()=>{schema.checked=!schema?.checked}} class="newBox">
        <img src={arrow} style={schema?.checked?"":"transform:rotate(-90deg);"} alt="">{schema.desc}
</button>
{#if schema?.checked}
<pre class="bg-black border-4 max-w-screen-sm text-xs text-left" transition:slide>
    {schema.ex}
</pre>
{/if}