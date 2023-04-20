<script>
    import { flip } from "svelte/animate";
    import stats from "./statistics"

    let teams = [];

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
        return ((+stats[sortFunction](b,data.entries))-(+stats[sortFunction](a,data.entries)))*(ascending? -1 : 1);
    })
</script>

<center class="pt-10">
    <div class="grid grid-cols-2 w-fit gap-1">
        <button class="font-bold bg-gradient-to-t from-green-800 to-green-400 border-green-900" on:click={()=>{columns.push("Average_score");columns=columns}}>Add column</button>
        <button class="font-bold bg-gradient-to-t from-red-800 to-red-400 border-red-900" on:click={()=>{columns.pop ("Average_score");columns=columns}}>Remove column</button>
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
    <br>
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
                        <select class="text-xs" style="max-width:80px" bind:value={col}>
                            {#each Object.keys(stats) as func}
                                <option value={func}>{func}</option>
                            {/each}
                        </select>
                    </th>
                {/each}
            </tr>

            {#each teams as team, i (team)}
                <tr class="divide-x" animate:flip>
                    {#if showteams?.[0]=="" || (showteams.includes(""+team) && positive) || (!showteams.includes(""+team) && !positive)}
                        <td>{i+1}.</td>
                        {#each columns as col}
                            <td class:font-bold={col=="Team_number"}>{(typeof stats[col](team,data.entries)==="number" && stats[col](team,data.entries) != Math.trunc(stats[col](team,data.entries)))?parseFloat(stats[col](team,data.entries)).toFixed(2):stats[col](team,data.entries)}</td>
                        {/each}
                    {/if}
                    
                </tr>
            {/each}
        </table>
    </div>
    <br>
    <div class="opacity-50">*Score calculations do not include links</div>
    <br>
    <button on:click={tableToCSV} class="font-bold bg-gradient-to-t from-teal-800  to-teal-400 border-black">Export sheet</button>
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