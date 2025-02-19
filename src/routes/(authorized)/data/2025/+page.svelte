<script>
    import CompetitionSelector from '$lib/components/search/CompetitionSelector.svelte'

    export let data
</script>

<center class="pt-10">
    <div class="box">
        <h6>Competition</h6>
        <CompetitionSelector
                bind:event={data.competition}
                events={data.events}/>
    </div>
    <br/>
    <a disabled={!data.competition} href="./2025/spreadsheet/{data.competition}">
        <button disabled={!data.competition}>Spreadsheet</button>
    </a>
    <!-- <a disabled={!data.competition} href="./2024/entries/{data.competition}"><button disabled={!data.competition}>Database</button></a> -->
    <a disabled={!data.competition} href="./2025/{data.competition}">
        <button disabled={!data.competition}>Strategy</button>
    </a>
</center>

<style>
    button {
        @apply border-2 p-2 border-black rounded bg-slate-700 shadow-lg;
    }
</style>
