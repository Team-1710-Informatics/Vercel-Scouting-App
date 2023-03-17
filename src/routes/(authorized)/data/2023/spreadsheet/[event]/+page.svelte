<script>
    import { flip } from "svelte/animate";
    import stats from "./statistics";

    let teams = [];

    export let data;
    data.entries.forEach(e=>{
        if(!teams.includes(e.team))
            teams.push(e.team);
    })

    let columns = ["Average_score"];
    let sortFunction = "Average_score";

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
        return (+stats[sortFunction](b))-(+stats[sortFunction](a));
    })
</script>

<center class="pt-10">
    <div class="flex flex-row w-fit gap-1">
        <button on:click={()=>{columns.push("Average_score");columns=columns}}>Add column</button>
        <button class="bg-red-500" on:click={()=>{columns.pop ("Average_score");columns=columns}}>Remove column</button>
    </div>
    <br>
    <div class="flex flex-row w-fit gap-1">
        <p>Sort:</p>
        <select bind:value={sortFunction}>
            {#each Object.keys(stats) as func}
                <option value={func}>{func}</option>
            {/each}
        </select>
    </div>
    <br>
    <table class="divide-y divide-white">
        <tr>
            <th>Team</th>
            {#each columns as col}
                <th>
                    <select bind:value={col}>
                        {#each Object.keys(stats) as func}
                            <option value={func}>{func}</option>
                        {/each}
                    </select>
                </th>
            {/each}
        </tr>

        {#each teams as team (team)}
            <tr class="divide-x" animate:flip>
                <th>{team}</th>
                {#each columns as col}
                    <td>{(typeof stats[col](team)==="number")?parseFloat(stats[col](team)).toFixed(2):stats[col](team,data.entries)}</td>
                {/each}
            </tr>
        {/each}
    </table>
    <br>
    <button on:click={tableToCSV}>Export table</button>
</center>

<table bind:this={output} hidden>
    <tr>
        <th>Team</th>
        {#each columns as col}
                <th>
                    {col}
                </th>
        {/each}
    </tr>

    {#each teams as team}
        <tr class="divide-x">
            <th>{team}</th>
            {#each columns as col}
                <td>{(typeof stats[col](team)==="number")?parseFloat(stats[col](team)).toFixed(2):stats[col](team,data.entries)}</td>
            {/each}
        </tr>
    {/each}
</table>

<style>
    th, td {
        padding:4px;
        text-align:center;
    }

    select {
        padding:2px;
        border-radius:4px;
    }
</style>