<script lang="ts">
    import Pre from './Pre.svelte'
    import Match from './Match.svelte'
    import Post from './Post.svelte'

    export let data, form

    let step = 0

    function safetynet(e: Event) {
        e.preventDefault()

        return 'Are you sure you want to leave? Scouting data will be lost.'
    }

    let meta: {
        //meta is all background data
        scout: string
        event: string
        team: number | null
        match: number | null
        alliance: 'red' | 'blue' | null
    } = {
        scout: data.scout,
        event: data.competition?.key ?? null,
        match: null,
        team: null,
        alliance: null,
    }

    let pregame: {
        startPosition: { x: number; y: number }
        preload: Boolean
    } = {
        startPosition: { x: NaN, y: NaN },
        preload: true,
    }

    let game: any = {}

    let postgame: any = {}

    $: h = 0

    //all of these positions are compiled in postgame component upon submission
</script>

<svelte:window on:beforeunload={safetynet} bind:innerHeight={h} />
<!--prevents data loss on page reload-->

<center
    class="h-full overflow-y-scroll background"
    style="min-height:{h}px"
>
    {#if step == 0}
        <Pre
            bind:meta
            events={data.events}
            bind:pregame
            on:advance={() => {
                step++
                console.log("Advancing to match")
            }}
        />
    {:else if step == 1}
        <Match
            bind:meta
            bind:pregame
            bind:game
            on:advance={() => {
                console.log("Advancing to post")
                step++
            }}
        />
    {:else if step == 2}
        <Post bind:meta bind:pregame bind:game bind:postgame {form} />
    {/if}
</center>

<style>
    .background {
        background: linear-gradient(0.3turn, #323136, #242a34, #000000) fixed;
        /* Your main background gradient */
        /* linear-gradient(to right, black, black); */
    }
    .background-2 {
        background:
            linear-gradient(
                    to top left,
                    rgba(255, 255, 255, 0.3) 0%,
                    transparent 30%
                )
                top left,
            linear-gradient(
                    to top right,
                    rgba(255, 255, 255, 0.3) 0%,
                    transparent 30%
                )
                top right,
            linear-gradient(
                    to bottom left,
                    rgba(255, 255, 255, 0.3) 0%,
                    transparent 30%
                )
                bottom left,
            linear-gradient(
                    to bottom right,
                    rgba(255, 255, 255, 0.3) 0%,
                    transparent 30%
                )
                bottom right,
            linear-gradient(0.3turn, #363131, #242a34, #000000);
    }
</style>
