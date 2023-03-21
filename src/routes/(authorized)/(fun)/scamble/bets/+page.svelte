<script>
    import MatchSelector from "$lib/components/search/MatchSelector.svelte";
    import Credits from "$lib/components/visual/Credits.svelte";
    import Bet from "./Bet.svelte";
    import Matchup from "./Matchup.svelte";
    import Tickets from "./Tickets.svelte";

    export let data;
    export let form;

    $:data.tickets = form?.tickets??data.tickets;

    let match = null;

    function ticketExists(key){
        let o = false
        data.tickets.forEach(t=>{
            if(t.match == key)o=t;
        })
        return o;
    }
</script>
<Tickets tickets={data.tickets}/>
<middle class="pt-10">
    <p class="font-black text-6xl">SCAMBLE</p>
    <div class="box mb-8">
        <p class="font-extrabold text-xl text-center">Select a Match</p>
        <hr>
        <MatchSelector event={data.competition?.key??null} events={data.events} bind:match={match}/>
    </div>
    <Matchup bind:match={match} />
    <br>
    {#if match?.winning_alliance===""}
        {#key form}
            {#if !ticketExists(match.key)}
                <Bet {data} bind:match={match} />
            {:else}
                <p class="mt-4">You bet <Credits>{ticketExists(match.key).amount}</Credits> credits on {ticketExists(match.key).alliance}</p>
            {/if}
        {/key}
    {:else if match?.winning_alliance}
        <p>{match.winning_alliance} victory</p>
    {/if}
    <br>
</middle>
