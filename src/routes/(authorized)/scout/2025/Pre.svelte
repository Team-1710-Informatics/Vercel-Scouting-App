<script>
    import CompetitionSelector from '$lib/components/search/CompetitionSelector.svelte'
    import TeamSelector from '$lib/components/search/TeamSelector.svelte'
    import x from '$lib/assets/icons/x.svg'
    import check from '$lib/assets/icons/check.svg'
    import tba from '$lib/modules/tba'
    import {slide} from 'svelte/transition'
    import {createEventDispatcher} from 'svelte'
    import Starting from './Starting.svelte'
    import {onMount} from 'svelte';

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
    let isLandscape = false;
    let bypassOrientationCheck = false;

    $: key = `${meta.event}_qm${meta.match}`
    $: innerWidth = 0
    $: condition = innerWidth <= 290

    function checkOrientation() {
        isLandscape = window.innerWidth > window.innerHeight;
    }

    function bypassCheck() {
        bypassOrientationCheck = true;
    }

    onMount(() => {
        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        return () => {
            window.removeEventListener('resize', checkOrientation);
        };
    });
</script>

<svelte:window bind:innerWidth/>

{#if isLandscape && !bypassOrientationCheck}
    <div class="orientation-warning">
        <p>Rotate your phone to portrait</p>
        <button on:click={bypassCheck}>Bypass</button>
    </div>
{:else}
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
        >Next
        </button>
    </div>
{/if}

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

    .orientation-warning {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .orientation-warning p {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    .orientation-warning button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        background-color: white;
        color: black;
        border: none;
        cursor: pointer;
    }
</style>