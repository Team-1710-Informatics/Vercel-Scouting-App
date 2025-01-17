<script>
    import { enhance } from '$app/forms'
    import { slide } from 'svelte/transition'
    import Credits from '$lib/components/visual/Credits.svelte'
    import tba from '$lib/modules/tba'

    export let ticket

    async function results(key) {
        let o = await tba(`match/${key}/simple`)

        return o
    }

    let loading = false

    const lossFlavorText = [
        'Skill issue.',
        'Skill issue.',
        'Skill issue.',
        'Okay.',
        'Okay.',
        'Okay.',
        'Just win next time.',
        'I understand.',
        'I understand.',
        'I understand.',
        "Maybe it's a sign.",
        "Maybe it's a sign.",
        'Claim <span class="text-white">25000</span> participation credits',
    ]
</script>

<div class="flex flex-col gap-0 m-2 w-64 rounded-lg" transition:slide>
    <div
        class={`rounded-t-lg p-1 bg-gradient-to-t ${ticket.alliance == 'red' ? 'from-red-500 to-rose-400' : 'from-sky-600 to-sky-400'}`}
    >
        <p class="text-2xl font-bold">{ticket.match}</p>
    </div>
    <div
        class="rounded-b-lg bg-gradient-to-br from-slate-900 to-slate-800 p-2 font-bold"
    >
        <div class="flex flex-row">
            <p class="text-xs self-end mr-1 mb-1">Your bet<br />aligns with:</p>
            <p
                class={`flex-grow text-center -mt-2 -mr-2 p-1 mb-3 rounded-bl-lg bg-gradient-to-t ${ticket.alliance == 'red' ? 'from-red-700 to-red-500' : 'from-sky-700 to-sky-600'}`}
            >
                Wager: <Credits class="font-bold text-2xl"
                    >{ticket.amount}</Credits
                >
            </p>
        </div>
        <div
            class={`border-b-2 border-black relative w-full h-4 ${ticket.alliance === 'blue' ? 'bg-red-500' : 'bg-blue-500'} p-0 `}
        >
            <div
                class={`border-r-2 border-b-2 border-black h-4 p-0 m-0 ${ticket.alliance === 'red' ? 'bg-red-500' : 'bg-blue-500'} absolute top-0`}
                style="width:{ticket.sameBetPercentage}%;"
            ></div>
            <div
                class={`border-r-2 border-b-2 border-black h-4 p-0 m-0 bg-black/25 absolute top-0`}
                style="width:{(1 / ticket.others) * 100}%;"
            ></div>
            <p
                class="absolute top-0 pl-1"
                style="font-size:11px; padding-top:1px; line-height:12px"
            >
                {ticket.sameBetPercentage}% of people
            </p>
        </div>
        <div
            class={`relative w-full h-4 ${ticket.alliance === 'blue' ? 'bg-red-500' : 'bg-blue-500'} p-0`}
        >
            <div
                class={`border-r-2 border-black h-4 p-0 m-0 ${ticket.alliance === 'red' ? 'bg-red-500' : 'bg-blue-500'} absolute top-0`}
                style="width:{ticket.sameBetPercentageCredits}%;"
            ></div>
            <div
                class={`border-r-2 border-black h-4 p-0 m-0 bg-black/25 absolute top-0`}
                style="width:{ticket.portion}%;"
            ></div>
            <p
                class="absolute top-0 pl-1"
                style="font-size:11px; padding-top:2px; line-height:12px"
            >
                {ticket.sameBetPercentageCredits}% of credits
            </p>
        </div>
        {#await results(ticket.match) then r}
            <div transition:slide>
                <hr class="my-3" />
                <center>
                    {#if r.winning_alliance === '' && r.actual_time === null}
                        <p class="text-white text-center">
                            Predicted payout: {ticket.payout}
                        </p>
                    {:else if Math.trunc(ticket.timestamp / 1000) > r.actual_time || r.winning_alliance === ''}
                        {#if r.winning_alliance === ''}<p
                                class="opacity-50 text-xs"
                            >
                                Match was a draw.
                            </p>
                        {:else}<p class="opacity-50 text-xs">
                                This bet was placed<br />after the match
                                started.
                            </p>{/if}
                        <form
                            method="POST"
                            action="?/resolve"
                            use:enhance={() => {
                                loading = true
                                //@ts-ignore
                                return async ({ update }) => {
                                    await update()
                                    loading = false
                                }
                            }}
                        >
                            <input
                                hidden
                                type="text"
                                name="user"
                                value={ticket.user}
                            />
                            <input
                                hidden
                                type="text"
                                name="match"
                                value={ticket.match}
                            />

                            <input
                                hidden
                                type="text"
                                name="winner"
                                value={r.winning_alliance}
                            />
                            <input
                                hidden
                                type="text"
                                name="time"
                                value={r.actual_time}
                            />

                            <button
                                disabled={loading}
                                class="bg-gradient-to-t from-slate-800 to-slate-500 border-black"
                                >Refund {ticket.amount} credits</button
                            >
                        </form>
                    {:else if ticket.alliance === r.winning_alliance}
                        <form
                            method="POST"
                            action="?/resolve"
                            use:enhance={() => {
                                loading = true
                                //@ts-ignore
                                return async ({ update }) => {
                                    await update()
                                    loading = false
                                }
                            }}
                        >
                            <input
                                hidden
                                type="text"
                                name="user"
                                value={ticket.user}
                            />
                            <input
                                hidden
                                type="text"
                                name="match"
                                value={ticket.match}
                            />

                            <input
                                hidden
                                type="text"
                                name="winner"
                                value={r.winning_alliance}
                            />
                            <input
                                hidden
                                type="text"
                                name="time"
                                value={r.actual_time}
                            />

                            <button
                                disabled={loading}
                                class="bg-gradient-to-t from-yellow-600 to-slate-300 text-white border-black"
                                >Claim {ticket.payout} credits</button
                            >
                        </form>
                    {:else}
                        <p class="text-sm">You lost.</p>
                        <form
                            method="POST"
                            action="?/resolve"
                            use:enhance={() => {
                                loading = true
                                //@ts-ignore
                                return async ({ update }) => {
                                    await update()
                                    loading = false
                                }
                            }}
                        >
                            <input
                                hidden
                                type="text"
                                name="user"
                                value={ticket.user}
                            />
                            <input
                                hidden
                                type="text"
                                name="match"
                                value={ticket.match}
                            />

                            <input
                                hidden
                                type="text"
                                name="winner"
                                value={r.winning_alliance}
                            />
                            <input
                                hidden
                                type="text"
                                name="time"
                                value={r.actual_time}
                            />

                            <button
                                disabled={loading}
                                class="bg-gradient-to-b from-gray-500 to-gray-300 text-black border-black"
                                >{@html lossFlavorText[
                                    Math.floor(
                                        Math.random() * lossFlavorText.length
                                    )
                                ]}</button
                            >
                        </form>
                    {/if}
                </center>
            </div>
        {/await}
    </div>
</div>
