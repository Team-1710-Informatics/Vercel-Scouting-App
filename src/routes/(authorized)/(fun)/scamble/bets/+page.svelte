<script>
    import MatchSelector from "$lib/components/search/MatchSelector.svelte";
    import Bet from "./Bet.svelte";
    import Matchup from "./Matchup.svelte";

    export let data;

    let match = null;
</script>

<middle class="pt-10">
    <p class="font-black text-6xl">SCAMBLE</p>
    <div class="box mb-8">
        <p class="font-extrabold text-xl text-center">Select a Match</p>
        <hr>
        <MatchSelector event={data.competition.key} events={data.events} bind:match={match}/>
    </div>
    <Matchup bind:match={match}/>
    <Bet {data} />
</middle>