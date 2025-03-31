<script>
    import {flip} from 'svelte/animate'
    import stats from './statistics.ts'
    import Spreadsheet from './Spreadsheet.svelte'

    let teams = []
    let first = 1
    let last = 999

    function matfil(e) {
        return e.match >= first && e.match <= last
    }

    let show = ''
    $: showteams = show.split(' ')

    export let data

    console.log(data.entries)

    const entries = data.entries;

    let columns = ['TeamNumber', 'AverageScore']
    let sortFunction = 'AverageScore'
    let ascending = false
    let positive = true

    let output

    function tableToCSV() {
        let csvdata = []

        let rows = output.getElementsByTagName('tr')

        for (let i = 0; i < rows.length; i++) {
            let cols = rows[i].querySelectorAll('td,th')

            let csvrow = []
            for (let j = 0; j < cols.length; j++) {
                csvrow.push(cols[j].innerHTML)
            }
            csvdata.push(csvrow.join(','))
        }
        csvdata = csvdata.join('\n')

        downloadCSVFile(csvdata)
    }

    function downloadCSVFile(csvdata) {
        let file = new Blob([csvdata], {
            type: 'text/csv',
        })

        let temp = document.createElement('a')

        temp.download = 'export.csv'
        temp.href = window.URL.createObjectURL(file)
        temp.style.display = 'none'
        document.body.appendChild(temp)

        temp.click()
        document.body.removeChild(temp)
    }

    $: teams = teams.sort((a, b) => {
        if (first && last) {
            return (
                (+stats[sortFunction](b, data.entries.filter(matfil)) -
                    +stats[sortFunction](a, data.entries.filter(matfil))) *
                (ascending ? -1 : 1)
            )
        }
    })
</script>

<table bind:this={output} hidden>
    <tr>
        {#each columns as col}
            <th>
                {col}
            </th>
        {/each}
    </tr>

    {#each teams as team}
        <tr class="divide-x">
            {#each columns as col}
                <td>{stats[col](team, data.entries)}</td>
            {/each}
        </tr>
    {/each}
</table>

<Spreadsheet data={entries} />

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
