<script>
    import x from '$lib/assets/icons/x.svg'
    import check from '$lib/assets/icons/check.svg'
    import { createEventDispatcher } from 'svelte'
    import Starting from './Starting.svelte'

    const dispatch = createEventDispatcher()

    export let meta
    export let pregame

    const loadImgs = [
        {
            name: 'none',
            value: false,
            src: x,
            style: 'filter: brightness(0) saturate(100%) invert(22%) sepia(99%) saturate(6156%) hue-rotate(356deg) brightness(96%) contrast(117%);',
        },
        {
            name: 'preloaded',
            value: true,
            src: check,
            style: 'filter: brightness(0) saturate(100%) invert(22%) sepia(99%) saturate(6156%) hue-rotate(356deg) brightness(96%) contrast(117%);',
        },
    ]

</script>
<Starting
    alliance={meta.alliance}
    bind:startValue={pregame.startPosition}
/>
<div class="flex flex-row w-fit my-2">
    <b class="mr-6 self-center">Preload:</b>
    {#each loadImgs as img}
        <button
            class="bg-none border-none opacity-50"
            class:opacity-100={pregame.preload === img.value}
            class:bg-white={pregame.preload === img.value}
            on:click={() => {
                pregame.preload = img.value
            }}
        >
            <img
                width="28px"
                height="28px"
                alt={img.value}
                src={img.src}
                style={img?.style}
            />
        </button>
    {/each}
</div>
<button
    class="submit my-2"
    on:click={() => {
        dispatch('advance')
    }}
    disabled={
        !pregame.startPosition.x ||
        (pregame.preload !== true && pregame.preload !== false)
    }
>Next</button>