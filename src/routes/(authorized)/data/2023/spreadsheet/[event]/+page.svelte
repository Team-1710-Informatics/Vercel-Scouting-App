<script>
    import { flip } from "svelte/animate";
    import stats from "./statistics"
    import Plot from 'svelte-plotly.js';
    import { onMount } from 'svelte';

    let teams = [];
    let first = 1;
    let last = 999;

    function matfil(e){
        return e.match >= first && e.match <= last;
    }

    let show="";
    $: showteams=show.split(" ");

    export let data;
    data.entries.forEach(e=>{
        if(!teams.includes(e.team))
            teams.push(e.team);
    })

    let columns = ["Team_number", "Average_score"];
    let sortFunction = "Average_score";
    let ascending = false;
    let positive = true;

    let output;

    function tableToCSV(){
        let csvdata = [];

        let rows = output.getElementsByTagName("tr");

        for(let i=0;i<rows.length;i++){
            let cols=rows[i].querySelectorAll('td,th');

            let csvrow=[];
            for(let j=0;j<cols.length;j++){
                csvrow.push(cols[j].innerHTML);
            }
            csvdata.push(csvrow.join(','));
        }
        csvdata=csvdata.join('\n');

        downloadCSVFile(csvdata);
    }

    function movingAvg(array, count, qualifier){

        // calculate average for subarray
        var avg = function(array, qualifier){

            var sum = 0, count = 0, val;
            for (var i in array){
                val = array[i];
                if (!qualifier || qualifier(val)){
                    sum += val;
                    count++;
                }
            }

            return sum / count;
        };

        var result = [], val;

        // pad beginning of result with null values
        for (var i=0; i < count-1; i++)
            result.push(null);

        // calculate average for each subarray and add to result
        for (var i=0, len=array.length - count; i <= len; i++){

            val = avg(array.slice(i, i + count), qualifier);
            if (isNaN(val))
                result.push(null);
            else
                result.push(val);
        }

        return result;
    }

    function downloadCSVFile(csvdata){
        let file = new Blob([csvdata],{
            type: "text/csv"
        });

        let temp = document.createElement('a');
        
        temp.download = "export.csv";
        temp.href = window.URL.createObjectURL(file);
        temp.style.display="none";
        document.body.appendChild(temp);

        temp.click();
        document.body.removeChild(temp);
    }

    $: teams = teams.sort((a,b)=>{
        if(first&&last){}
        return ((+stats[sortFunction](b,data.entries.filter(matfil)))-(+stats[sortFunction](a,data.entries.filter(matfil))))*(ascending? -1 : 1);
    })

    function add_column() {
        columns.push("Average_score");
        update_graph_data()
        columns=columns;
    }

    function remove_column() {
        columns.pop();
        update_graph_data()
        columns=columns;
    }

    $: graph_data = [{'x': [], 'y': [], type: 'scatter', mode: 'markers'},
                    {'x': [], 'y': [], type: 'line'}];

    function update_graph_data() {
        graph_data[0]['x'] = []
        graph_data[0]['y'] = []
        for (const team of teams) {
            graph_data[0]['x'].push((typeof stats[columns[0]](team, data.entries.filter(matfil)) === "number" && stats[columns[0]](team, data.entries.filter(matfil)) != Math.trunc(stats[columns[0]](team, data.entries.filter(matfil)))) ? parseFloat(stats[columns[0]](team, data.entries.filter(matfil))).toFixed(2) : stats[columns[0]](team, data.entries.filter(matfil)))
            graph_data[0]['y'].push((typeof stats[columns[1]](team, data.entries.filter(matfil)) === "number" && stats[columns[1]](team, data.entries.filter(matfil)) != Math.trunc(stats[columns[1]](team, data.entries.filter(matfil)))) ? parseFloat(stats[columns[1]](team, data.entries.filter(matfil))).toFixed(2) : stats[columns[1]](team, data.entries.filter(matfil)))

            graph_data[0]['x'] = graph_data[0]['x'].map(element => Number(element));
            graph_data[0]['y'] = graph_data[0]['y'].map(element => Number(element));
        }
        graph_data[1]['x'] = movingAvg(graph_data[0]['x'], 10)
        graph_data[1]['y'] = movingAvg(graph_data[0]['y'], 10)

        console.log(graph_data)
    }

    onMount(async () => {
        update_graph_data()
    })

    let showGraph = false;

</script>

<center class="pt-10">
    <div class="grid grid-cols-2 w-fit gap-1">
        <button class="font-bold bg-gradient-to-t from-green-800 to-green-400 border-green-900" on:click={add_column}>Add column</button>
        <button class="font-bold bg-gradient-to-t from-red-800 to-red-400 border-red-900" on:click={remove_column}>Remove column</button>
    </div>
    <br>
    <div><label>
        Filter teams: 
        <input type="text" bind:value={show}>
    </label></div>
    <label>
        <input type="radio" name="positive" bind:group={positive} value={true}>
        Include
    </label>
    <label>
        <input type="radio" name="positive" bind:group={positive} value={false}>
        Exclude
    </label>    
    <br><br>
    <div>Filter matches:</div>
    <label>
        From:
        <input class="w-24" type="number" bind:value={first}>
    </label>
    <label>
        To:
        <input class="w-24" type="number" bind:value={last}>
    </label>    
    <br><br>
    <div class="flex flex-row items-center w-fit p-4">
        <input type="checkbox" id="graph-switch" class="relative w-11 h-6 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600 before:inline-block before:w-5 before:h-5 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
               on:click={() => showGraph = !showGraph}>
        <label for="graph-switch" class="text-sm">Toggle Graphing</label>
    </div>
    {#if !showGraph}
        <div class="flex flex-row w-fit gap-1">
            <p>Sort:</p>
            <select bind:value={sortFunction}>
                {#each Object.keys(stats) as func}
                    <option value={func}>{func}</option>
                {/each}
            </select>
        </div>
        <label>
            <input type="radio" name="sort" bind:group={ascending} value={false}>
            Descending
        </label>
        <label>
            <input type="radio" name="sort" bind:group={ascending} value={true}>
            Ascending
        </label>
        <br>
        <br>
        <div class="box overflow-x-scroll max-w-full">
            <table class="divide-y divide-white">
                <tr>
                    <th>#</th>
                    {#each columns as col}
                        <th>
                            <select class="text-xs" style="max-width:80px" bind:value={col} on:change={update_graph_data}>
                                {#each Object.keys(stats) as func}
                                    <option value={func}>{func}</option>
                                {/each}
                            </select>
                        </th>
                    {/each}
                </tr>

                {#key first}{#key last}{#each teams as team, i (team)}
                    <tr class="divide-x" animate:flip>
                        {#if showteams?.[0]=="" || (showteams.includes(""+team) && positive) || (!showteams.includes(""+team) && !positive)}
                            <td>{i+1}.</td>
                            {#each columns as col}
                                <td class:font-bold={col=="Team_number"}>{(typeof stats[col](team,data.entries.filter(matfil))==="number" && stats[col](team,data.entries.filter(matfil)) != Math.trunc(stats[col](team,data.entries.filter(matfil))))?parseFloat(stats[col](team,data.entries.filter(matfil))).toFixed(2):stats[col](team,data.entries.filter(matfil))}</td>
                            {/each}
                        {/if}
                    </tr>
                {/each}{/key}{/key}
            </table>
        </div>
        <br>
        <div class="opacity-50">*Score calculations do not include links</div>
        <button on:click={tableToCSV} class="font-bold bg-gradient-to-t from-teal-800  to-teal-400 border-black">Export sheet</button>
    {:else}
        <div class="h-50 max-w-full">
            X:
            <select class="text-xs" style="max-width:120px" bind:value={columns[0]} on:change={update_graph_data}>
                {#each Object.keys(stats) as func}
                    <option value={func}>{func}</option>
                {/each}
            </select>
            Y:
            <select class="text-xs mb-3" style="max-width:120px" bind:value={columns[1]} on:change={update_graph_data}>
                {#each Object.keys(stats) as func}
                    <option value={func}>{func}</option>
                {/each}
            </select>
            <Plot
                    data={graph_data}
                    layout={{showlegend: false,
                             title: "Graphing " + columns[0] + " over " + columns[1],
                             margin: { t: 60, b: 40, l: 40, r: 30 },
                             xaxis: {showline: true, title: columns[0]},
                             yaxis: {title: columns[1]}}}
                    fillParent=true
                    debounce={250}
            />
        </div>
    {/if}
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
                <td>{stats[col](team,data.entries)}</td>
            {/each}
        </tr>
    {/each}
</table>

<style>
    th, td, table {
        padding:4px;
        text-align:center;
        border-radius:4px;

    }

    select {
        padding:2px;
        border-radius:4px;
    }
</style>