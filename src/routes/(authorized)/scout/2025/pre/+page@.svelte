<script lang="ts">
    import CompetitionSelector from './CompetitionSelector.svelte'
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    export let data

    let meta: {
        event: string
        match: number | null
    } = {
        event: data.competition?.key ?? null,
        match: null,
    }

    $: final = JSON.stringify({
        ...meta
    })

    let events = data.events

    $: innerWidth = 0
    $: condition = innerWidth <= 290
</script>

<svelte:window bind:innerWidth />
<!-- <body style="overflow-y:hidden;"> -->
<center class="h-full overflow-y-hidden background">
    <form
    method="POST"
    >
        <div class="h-full mt-10">
            <u class="underline font-bold text-5xl">Pre-Match</u>
                <div class="boxing">
                    <div class="flex flex-col">
                        {#if !condition}
                            <b class="justify-self-start text-2xl mb-1">Event</b>
                            <div class="col-span-3 justify-self-end">
                                <CompetitionSelector
                                    class="w-16"
                                    events={[
                                        {
                                            short_name: '!Practice Scouting',
                                            key: '2025practice',
                                        },
                                        {
                                            short_name: '!Practice Scouting',
                                            key: '2025practice',
                                        },
                                        ...events,
                                    ]}
                                    bind:event={meta.event}
                                />
                            </div>
                        {:else if condition}
                            <b class="col-span-4 mx-auto text-2xl mb-1">Event</b>
                            <div class="col-span-4 mx-auto">
                                <CompetitionSelector
                                    class="w-16"
                                    events={[
                                        {
                                            short_name: '!Practice Scouting',
                                            key: '2025practice',
                                        },
                                        {
                                            short_name: '!Practice Scouting',
                                            key: '2025practice',
                                        },
                                        ...events,
                                    ]}
                                    bind:event={meta.event}
                                />
                            </div>
                        {/if}
                        <div>
                            <b class="justify-self-start mx-auto col-span-2 mt-8 text-lg">Match</b>
                            <input class="w-16 mt-8" type="number" bind:value={meta.match} />
                        </div>
                        <input type="text" hidden name="data" value={final} />
                        <button
                            on:click={() => {
                                dispatch('advance')
                            }}
                            disabled="{meta.event == null || meta.match == null}"
                            class="submit mt-8">
                            Next
                        </button>
                    </div>
                </div>
            <br />
        </div>
    </form>
</center>
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
    .background {
        background: linear-gradient(0.3turn, #363131, #242a34, #000000);
        /* Your main background gradient */
        /* linear-gradient(to right, black, black); */
    }
</style>