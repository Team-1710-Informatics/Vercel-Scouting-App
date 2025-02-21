<script>
    import CompetitionSelector from '$lib/components/search/CompetitionSelector.svelte'
    import TeamSelector from '$lib/components/search/TeamSelector.svelte'
    import x from '$lib/assets/icons/x.svg'
    import check from '$lib/assets/icons/check.svg'
    import tba from '$lib/modules/tba'
    import {slide} from 'svelte/transition'
    import {createEventDispatcher} from 'svelte'
    import Starting from './Starting.svelte'

    const dispatch = createEventDispatcher()

    export let meta
    export let events
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

    export let team

    let disabled = false

    $: key = `${meta.event}_qm${meta.match}`
    $: innerWidth = 0
    $: condition = innerWidth <= 290
</script>

<svelte:window bind:innerWidth/>
<!-- <body style="overflow-y:hidden;"> -->
<div class="boxing">
    <Starting
        alliance={meta.alliance}
        bind:startValue={pregame.startPosition}
        team={team}
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
</div>

<!-- </body> -->

<style>
    .boxing {
        margin-top: 1rem;
        margin-bottom: 1rem;
        border: 5px #363131;
        border-radius: 8%;
        background-color: #171c26;
        padding: 0.75rem;
        width: fit-content;
        opacity: 80%;

        box-shadow: 0px 0px 3px 1px black;
    }
</style>
