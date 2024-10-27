<script lang="ts">
    import Credits from '$lib/components/visual/Credits.svelte'
    import { slide } from 'svelte/transition'

    export let item: Merchandise
</script>

<div
    transition:slide
    class="rounded-lg w-80 merch"
    style={item?.color ? `--color:${item.color}` : `--color:255, 255, 255`}
>
    <p>{item.name}</p>

    <div class="grid grid-cols-2">
        <p class="opacity-80"></p>
        <p class="text-right">
            <Credits class="w-fit bg-black/50 rounded p-1 pb-0.5"
                >{item.price}</Credits
            >
        </p>
    </div>
</div>

<style>
    .merch {
        text-align: left;
        border: none;
        border-bottom: 2px solid white;
        padding: 8px;

        background-image: radial-gradient(
            ellipse at bottom,
            rgba(var(--color), 0.25) 0%,
            rgba(255, 255, 255, 0) 70%
        );

        transition: box-shadow 1.5s;
    }

    .merch:active:not(disabled) {
        box-shadow: inset 320px 0px 0px 0px rgba(0, 0, 0, 0.7);

        transition: box-shadow 0.2s;
    }
</style>
