<script>
    import { flip } from 'svelte/animate'
    import stats from './statistics'

    let teams = []
    let first = 1
    let last = 999

    function matfil(e) {
        return e.match >= first && e.match <= last
    }

    let show = ''
    $: showteams = show.split(' ')

    export let data
    data.entries.forEach((e) => {
        if (!teams.includes(e.team)) teams.push(e.team)
    })

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
        }
        return (
            (+stats[sortFunction](b, data.entries.filter(matfil)) -
                +stats[sortFunction](a, data.entries.filter(matfil))) *
            (ascending ? -1 : 1)
        )
    })
</script>

<center class="pt-10 px-10">
    <div class="grid grid-cols-2 w-fit gap-1">
        <button
            class="font-bold bg-gradient-to-t from-green-800 to-green-400 border-green-900"
            on:click={() => {
                columns.push('AverageScore')
                columns = columns
            }}>Add column</button
        >
        <button
            class="font-bold bg-gradient-to-t from-red-800 to-red-400 border-red-900"
            on:click={() => {
                columns.pop('AverageScore')
                columns = columns
            }}>Remove column</button
        >
    </div>
    <br />
    <div>
        <label>
            Filter teams:
            <input type="text" bind:value={show} />
        </label>
    </div>
    <label>
        <input
            type="radio"
            name="positive"
            bind:group={positive}
            value={true}
        />
        Include
    </label>
    <label>
        <input
            type="radio"
            name="positive"
            bind:group={positive}
            value={false}
        />
        Exclude
    </label>
    <br /><br />
    <div>Filter matches:</div>
    <label>
        From:
        <input class="w-24" type="number" bind:value={first} />
    </label>
    <label>
        To:
        <input class="w-24" type="number" bind:value={last} />
    </label>
    <br /><br />
    <div class="flex flex-row w-fit gap-1">
        <p>Sort:</p>
        <select bind:value={sortFunction}>
            {#each Object.keys(stats) as func}
                <option value={func}>{func}</option>
            {/each}
        </select>
    </div>
    <label>
        <input type="radio" name="sort" bind:group={ascending} value={false} />
        Descending
    </label>
    <label>
        <input type="radio" name="sort" bind:group={ascending} value={true} />
        Ascending
    </label>
    <br />
    <br />
    <div class="box overflow-x-scroll max-w-full">
        <table class="divide-y divide-white">
            <tr>
                <th>#</th>
                {#each columns as col}
                    <th>
                        <select
                            class="text-xs"
                            style="max-width:7.5rem"
                            bind:value={col}
                        >
                            {#each Object.keys(stats) as func}
                                <option value={func}>{func}</option>
                            {/each}
                        </select>
                    </th>
                {/each}
            </tr>

            {#key first}{#key last}{#each teams as team, i (team)}
                        <tr class="divide-x" animate:flip>
                            {#if showteams?.[0] == '' || (showteams.includes('' + team) && positive) || (!showteams.includes('' + team) && !positive)}
                                <td>{i + 1}.</td>
                                {#each columns as col}
                                    <td class:font-bold={col == 'Team_number'}
                                        >{typeof stats[col](
                                            team,
                                            data.entries.filter(matfil)
                                        ) === 'number' &&
                                        stats[col](
                                            team,
                                            data.entries.filter(matfil)
                                        ) !=
                                            Math.trunc(
                                                stats[col](
                                                    team,
                                                    data.entries.filter(matfil)
                                                )
                                            )
                                            ? parseFloat(
                                                  stats[col](
                                                      team,
                                                      data.entries.filter(
                                                          matfil
                                                      )
                                                  )
                                              ).toFixed(2)
                                            : stats[col](
                                                  team,
                                                  data.entries.filter(matfil)
                                              )}</td
                                    >
                                {/each}
                            {/if}
                        </tr>
                    {/each}{/key}{/key}
        </table>
    </div>
    <br />
    <button
        on:click={tableToCSV}
        class="font-bold bg-gradient-to-t from-teal-800 to-teal-400 border-black"
        >Export sheet</button
    >
</center>

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
