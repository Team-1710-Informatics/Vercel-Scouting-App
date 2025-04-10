<script>
    import {flip} from 'svelte/animate'
    import stats from './statistics.ts'

    let teams = []
    let first = 1
    let last = 999

    function matfil(e) {
        return e.match >= first && e.match <= last
    }

    let show = ''
    $: showteams = show.split(' ')

    export let data
    if (data) {
        data.entries.forEach((e) => {
            if (!teams.includes(e.team)) teams.push(e.team)
        })
        console.log(teams)
    }



    let columns = ['TeamNumber', 'AverageScore']
    let sortFunction = 'AverageScoreNumeric'
    let ascending = false
    let positive = true

    $: teams = teams.sort((a, b) => {
        if (first && last) {
        }
        return (
            (+stats[sortFunction](b, data.entries.filter(matfil)) -
                +stats[sortFunction](a, data.entries.filter(matfil))) *
            (ascending ? -1 : 1)
        )
    })

    let output
</script>


<center class="pt-10 px-4 max-w-full">
    <div>
        <table>
            <tr class="">
                <td class="">Filter teams:</td>
                <td class=""><input bind:value={show} class="w-1/2" type="text"/></td>
            </tr>
            <tr class="">
                <td class="w-1/2">
                    <input
                            bind:group={positive}
                            name="positive"
                            type="radio"
                            value={true}
                    />
                    Include
                </td>
                <td class="w-1/2">
                    <input
                            bind:group={positive}
                            name="positive"
                            type="radio"
                            value={false}
                    />
                    Exclude
                </td>
            </tr>
            <tr class=" my-2">
                <td class="">Matches:</td>
                <td class="">
                    From:
                    <input bind:value={first} class="w-10" type="number"/>
                    To:
                    <input bind:value={last} class="w-10" type="number"/>
                </td>
            </tr>
            <tr class="my-2">
                <td class="">Sort:</td>
                <td class="w-">
                    <select bind:value={sortFunction} class="">
                        {#each Object.keys(stats) as func}
                            <option value={func}>{func}</option>
                        {/each}
                    </select>
                </td>
            </tr>
            <tr class="my-2">
                <td class="w-1/2">Ascending <input bind:group={ascending} name="sort" type="radio"
                                                   value={true}/></td>
                <td class="w-1/2">Descending <input bind:group={ascending} name="sort" type="radio"
                                                    value={false}/></td>
            </tr>
        </table>
    </div>

    <br/>

    <div class="outline outline-2 overflow-auto w-fit p-1">
        <table class="divide-y divide-white">
            <tr>

                <div class="flex flex-row">
                    <button
                            class="font-bold bg-gradient-to-t from-green-800 to-green-400 border-green-900 rounded-full w-8 h-8 mr-1"
                            on:click={() => {
                    columns.push('AverageScore')
                    columns = columns
                }}>+
                    </button
                    >

                    <button
                            class="font-bold bg-gradient-to-t from-red-800 to-red-400 border-red-900 rounded-full w-8 h-8"
                            on:click={() => {
                    columns.pop('AverageScore')
                    columns = columns
                }}>-
                    </button
                    >
                </div>

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

            {#key first}
                {#key last}
                    {#each teams as team, i (team)}
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
                    {/each}
                {/key}
            {/key}
        </table>
    </div>
    <br/>
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
