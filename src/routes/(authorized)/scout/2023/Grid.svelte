<script>
    import Node from './Node.svelte'
    import zoomin from '$lib/assets/icons/zoomin.svg'
    import zoomout from '$lib/assets/icons/zoomout.svg'

    export let meta
    export let log
    export let state

    let size = 64

    $: if (size < 40) {
        size = 40
    } else if (size > 96) {
        size = 96
    }

    const grid = [
        '^',
        'c',
        '^',
        '^',
        'c',
        '^',
        '^',
        'c',
        '^',
        '^',
        'c',
        '^',
        '^',
        'c',
        '^',
        '^',
        'c',
        '^',
        'h',
        'h',
        'h',
        'h',
        'h',
        'h',
        'h',
        'h',
        'h',
    ]

    let take = false
</script>

<div
    class=" w-fit overflow-x-scroll rounded border-2 bg-gray-800 {meta.alliance ===
    'red'
        ? 'border-rose-400'
        : 'border-cyan-500'} p-0 pb-3"
    style="max-width:97%"
>
    <div class="grid" style="grid-template-columns: repeat(9, {size}px);">
        {#each grid as type, i}
            <Node
                {type}
                {meta}
                {size}
                bind:log
                location={i}
                bind:take
                bind:state
            />
        {/each}
    </div>
</div>

<div class="flex flex-row w-fit mt-2">
    <button
        disabled={!state.started}
        class="h-7 w-32 mr-4 text-xs bg-gradient-to-b from-teal-600 to-teal-300 text-cyan-900 border-teal-800"
        class:darken={take}
        on:click={() => {
            take = !take
        }}>{take ? 'Cancel' : 'Take from grid'}</button
    >

    <div class="text-sm">
        <button
            class="h-7 px-3 rounded-r-none border-slate-900 bg-gradient-to-r from-slate-800 to-slate-700 -mr-2"
            on:click={() => {
                size += 8
            }}
            ><img
                style="filter: brightness(0) saturate(100%) invert(93%) sepia(78%) saturate(4610%) hue-rotate(180deg) brightness(124%) contrast(106%);"
                src={zoomin}
                alt="+"
            /></button
        >
        <button
            class="h-7 px-3 rounded-l-none border-slate-900 bg-gradient-to-l from-slate-800 to-slate-700"
            on:click={() => {
                size -= 8
            }}
            ><img
                style="filter: brightness(0) saturate(100%) invert(93%) sepia(78%) saturate(4610%) hue-rotate(180deg) brightness(124%) contrast(106%);"
                src={zoomout}
                alt="-"
            /></button
        >
    </div>
</div>

<style>
    .darken {
        filter: brightness(50%);
    }
</style>
