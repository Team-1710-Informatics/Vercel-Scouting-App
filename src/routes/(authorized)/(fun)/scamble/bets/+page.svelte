<script>
    import MatchSelector from '$lib/components/search/MatchSelector.svelte'
    import ColorSwappingText from '$lib/components/visual/ColorSwappingText.svelte'
    import Credits from '$lib/components/visual/Credits.svelte'
    import Bet from './Bet.svelte'
    import Matchup from './Matchup.svelte'
    import Tickets from './Tickets.svelte'
    import { page } from '$app/stores'
    import { tweened } from 'svelte/motion'
    import { identity } from 'svelte/internal'

    export let data
    export let form

    $: data.tickets = form?.tickets ?? data.tickets

    let match = null

    function ticketExists(key) {
        let o = false
        data.tickets.forEach((t) => {
            if (t.match == key) o = t
        })
        return o
    }

    let credits = tweened(0)
    $: if (data.tickets || !data.tickets) loadCredits()

    async function loadCredits() {
        const o = await fetch(
            `http${$page.url.hostname === 'localhost' ? '' : 's'}://${$page.url.host}/internal/credits/${data.user}`
        )

        credits.set(await o.json())
    }
</script>

<middle class="py-10">
    <p class="font-black text-6xl"><ColorSwappingText text={'SCAMBLE'} /></p>
    <div
        class="bg-gradient-to-br from-slate-900 to-slate-800 text-center p-2 rounded-lg"
    >
        <p class="font-extrabold text-xl text-center">Select a Match</p>
        <hr />
        <MatchSelector
            event={data.competition?.key ?? data.last ?? null}
            events={data.events}
            bind:match
        />
    </div>
    <Tickets tickets={data.tickets} />
    <div class="h-4" />
    <div
        class="font-bold bg-gradient-to-br from-slate-900 to-slate-800 text-center p-2 rounded-lg mb-2 text-2xl text-teal-500"
        class:rounded-b-none={match}
        style="max-width:96vw; width:300px"
    >
        <Credits class="text-3xl">{Math.trunc($credits)}</Credits>
        credits
        <br />
        <Credits class="text-3xl">{Math.trunc($data.tokens)}</Credits>
        tokens
    </div>
    <Matchup bind:match />
    <div >
        {#if match?.winning_alliance === '' && !match.actual_time && data.tokens !== 0}
            {#key form}
                {#if !ticketExists(match.key)}
                    <Bet {data} bind:match />
                {:else}
                    <p
                        class="font-bold bg-gradient-to-br from-slate-900 to-slate-800 text-center p-2 rounded-lg"
                        style="max-width:96vw; width:300px"
                    >
                        You bet <Credits
                            >{ticketExists(match.key).amount}</Credits
                        > credits on {ticketExists(match.key).alliance}
                    </p>
                {/if}
            {/key}
        {:else if match?.winning_alliance != undefined && data.tokens !== 0}
            <p
                class={`font-bold p-2 mt-2 rounded-lg bg-gradient-to-br ${
                    match.winning_alliance === 'blue'
                        ? 'from-blue-700 to-blue-400'
                        : match.winning_alliance === 'red'
                          ? 'from-red-700 to-red-400 text-right'
                          : 'from-slate-900 to-slate-800 text-center'
                }`}
                style="max-width:96vw; width:300px"
            >
                {match.winning_alliance.toUpperCase()}{match.winning_alliance !=
                ''
                    ? ' VICTORY'
                    : 'DRAW'}
            </p>
        {/if}


    </div>
    {#if data.tokens < 1}
        <p class="text-center w-3/4">You have 0 scamble tokens. Earn some more by scouting in order to bet on matches.</p>
    {/if}
    <br />
</middle>

<!-- <Mario/> -->
