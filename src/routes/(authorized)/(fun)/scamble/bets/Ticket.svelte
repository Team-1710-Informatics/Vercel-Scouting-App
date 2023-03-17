<script>
    import { enhance } from "$app/forms";
    import Credits from "$lib/components/visual/Credits.svelte";
    import { slide } from "svelte/transition";

    export let ticket;

    async function results(key){
        const results = await fetch(`https://www.thebluealliance.com/api/v3/match/${key}/simple`,{
            headers:{
                "X-TBA-Auth-Key":"96NRE08op9grsHLgW38FVN9m7SyYAjSA6PGQ7oCEEO6V8KSJbRQt863mowzU4Il3"
            }
        });

        return (await results.json());
    }

    let loading=false;
</script>

<div class="flex flex-col gap-0 m-2 w-64" transition:slide>
    <div class={`rounded-t p-1 ${ticket.alliance=="red"?"bg-red-500":"bg-blue-600"}`}>
        <p class="text-2xl font-bold">{ticket.match}</p>
    </div>
    <div class="rounded-b bg-white p-2 font-bold">
        <p class="text-black">Wager: {ticket.amount}</p>
        
        {#await results(ticket.match) then r}
            {#if r.winning_alliance == ""}
                <p class="text-black">Predicted payout: {ticket.payout}</p>
            {:else if Math.trunc(ticket.timestamp/1000) > r.actual_time}
                <p class="text-black opacity-50 text-xs">Bet was placed after match started.</p>
                <form method=POST action=?/resolve use:enhance={() => {
                    loading = true;
                    //@ts-ignore
                    return async ({ update }) => {
                        await update();
                        loading = false;
                    };
                }}>
                    <input hidden type="text" name="user" value={ticket.user}/>
                    <input hidden type="text" name="match" value={ticket.match}/>

                    <input hidden type="text" name="winner" value={r.winning_alliance}/>
                    <input hidden type="text" name="time" value={r.actual_time}/>

                    <button disabled={loading} class="bg-gradient-to-t from-slate-800 to-slate-500 border-black">Refund {ticket.amount} credits</button>
                </form>
            {:else if ticket.alliance === r.winning_alliance}
                <form method=POST action=?/resolve use:enhance={() => {
                    loading = true;
                    //@ts-ignore
                    return async ({ update }) => {
                        await update();
                        loading = false;
                    };
                }}>
                    <input hidden type="text" name="user" value={ticket.user}/>
                    <input hidden type="text" name="match" value={ticket.match}/>

                    <input hidden type="text" name="winner" value={r.winning_alliance}/>
                    <input hidden type="text" name="time" value={r.actual_time}/>

                    <button disabled={loading} class="bg-gradient-to-t from-yellow-600 to-slate-300 text-white border-black">Claim {ticket.payout} credits</button>
                </form>
            {:else}
                <p class="text-black text-sm">You lost.</p>
                <form method=POST action=?/resolve use:enhance={() => {
                    loading = true;
                    //@ts-ignore
                    return async ({ update }) => {
                        await update();
                        loading = false;
                    };
                }}>
                    <input hidden type="text" name="user" value={ticket.user}/>
                    <input hidden type="text" name="match" value={ticket.match}/>

                    <input hidden type="text" name="winner" value={r.winning_alliance}/>
                    <input hidden type="text" name="time" value={r.actual_time}/>

                    <button disabled={loading} class="bg-gradient-to-b from-gray-500 to-gray-300 text-black border-black">Skill issue.</button>
                </form>
            {/if}
        {/await}
    </div>
</div>