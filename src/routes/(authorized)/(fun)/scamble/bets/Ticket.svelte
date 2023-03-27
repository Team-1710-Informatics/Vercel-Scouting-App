<script>
    import { enhance } from "$app/forms";
    import { slide } from "svelte/transition";
    import { PUBLIC_X_TBA_AUTHKEY } from "$env/static/public";
    import Credits from "$lib/components/visual/Credits.svelte";


    export let ticket;

    async function results(key){
        const results = await fetch(`https://www.thebluealliance.com/api/v3/match/${key}/simple`,{
            headers:{
                "X-TBA-Auth-Key":PUBLIC_X_TBA_AUTHKEY
            }
        });

        let o = await results.json();

        if(key==="2023mose_sf3m1") o.winning_alliance = "red";

        return (o);
    }

    let loading=false;

    const lossFlavorText = [
         "Skill issue.",
         "Skill issue.",
         "Skill issue.",
         "Okay.",
         "We love you anyway.",
         "I understand.",
         "Maybe it's a sign.",
         'Claim <span class="text-white">150000</span> participation credits'
         
         
    ]
</script>

<div class="flex flex-col gap-0 m-2 w-64 border-2 border-white rounded-lg" transition:slide>
    <div class={`rounded-t-lg p-1 bg-gradient-to-t ${ticket.alliance=="red"?"from-red-500 to-rose-400":"from-sky-600 to-sky-400"}`}>
        <p class="text-2xl font-bold">{ticket.match}</p>
    </div>
    <div class="rounded-b-lg bg-gradient-to-b from-slate-900 to-slate-700 p-2 font-bold">
        <p>Wager: <Credits class="font-bold text-2xl">{ticket.amount}</Credits></p>
        {#await results(ticket.match) then r}
            <div transition:slide>
                <hr class="my-3">
                <center>
                {#if r.winning_alliance === "" && r.actual_time === null}
                    <p class="text-white text-center">Predicted payout: {ticket.payout}</p>
                {:else if Math.trunc(ticket.timestamp/1000) > r.actual_time || r.winning_alliance === ""}
                    {#if r.winning_alliance===""}<p class="opacity-50 text-xs">Match was a draw.</p>
                    {:else}<p class="opacity-50 text-xs">This bet was placed<br>after the match started.</p>{/if}
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
                    <p class="text-sm">You lost.</p>
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

                        <button disabled={loading} class="bg-gradient-to-b from-gray-500 to-gray-300 text-black border-black">{@html lossFlavorText[Math.floor(Math.random()*lossFlavorText.length)]}</button>
                    </form>
                {/if}
                </center>
            </div>
        {/await}
    </div>
</div>