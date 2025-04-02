<script>
    import {flip} from 'svelte/animate'
    import stats from './statistics.ts'
    import Spreadsheet from './Spreadsheet.svelte'
    import { onMount } from 'svelte'


    let show = ''
    $: showteams = show.split(' ')

    export let data

    let entries;
    onMount(() => {
        entries = data.data;
        console.log(entries);
    })
</script>

<Spreadsheet data={data.data} />

<style>
    th,
    td,
    table {
        padding: 4px;
        text-align: center;
        border-radius: 4px;
    }

    select {
        padding: 2px;
        border-radius: 4px;
    }
</style>
