<script>
    import { slide } from 'svelte/transition'
    import schema from '../../(api)/api/index.js'

    export let arrow
</script>

<h1>Return</h1>
<button
    on:click={() => {
        schema.checked = !schema?.checked
    }}
    class="newBox"
>
    <img
        src={arrow}
        style={schema?.checked ? '' : 'transform:rotate(-90deg);'}
        alt=""
    />{schema.desc}
</button>
{#if schema?.checked}
    <pre
        class="bg-black border-4 w-fit text-xs text-left"
        transition:slide>
    {schema.ex}
</pre>
{/if}

<style>
    .newBox {
        background-color: rgb(31 41 55);
        background-image: linear-gradient(
            to bottom,
            rgb(67, 72, 79),
            rgb(11, 32, 63)
        );
        border-color: rgb(255 255 255);
        color: white;
        border-radius: 0.5rem;
        border-width: 4px;
        padding: 0.75rem;
        margin: 0.5rem;
        width: 50vw;
        box-shadow: 10px 5px 5px rgb(39, 43, 48);
    }
</style>
