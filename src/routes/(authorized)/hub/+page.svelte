<script lang=ts>
    import CompetitionTracker from "./CompetitionTracker.svelte";

    export let data;
</script>

<svelte:head>
    <title>Scouting</title>
</svelte:head>

<middle>
    <div class="mt-10 box">
        <CompetitionTracker events={data.events} />
    </div>
</middle>

