<script lang="ts">
    import { is_function } from "svelte/internal";

    export let data:any;

    let users = JSON.parse(data.users);
    let scheduledays = JSON.parse(data.scheduledays);
    let leads = JSON.parse(data.leads);
    let scouts = JSON.parse(data.scouts);

    $: selected = data.selected;

    function findName(username:String){
        let name = [''];
        users.forEach((e:any) =>{
            if(e.username == username){
                name.unshift(e.name.first);
                name.unshift(e.name.last);
            }
        })
        if(name[0] == ''){
            return username
        }
        else{
            return name[1] + " " + name[0].charAt(0)
        }
    }

    function formatTime(time:any){
        let finalTime = time;
        if(time > 12){
            let newTime = time - 12;
            finalTime  = newTime + ":00 P.M.";
        }
        else{
            finalTime = time + ":00 A.M.";
        }
        return finalTime;
    }
</script>
<middle>
    <div class="bg-gray-800 flex flex-row gap-2 p-2 my-2 rounded-3xl">  
        {#each scheduledays as day}
            {#if selected != day.id && day.id != 0}
                <button on:click={()=>(selected = day.id)} class="bg-gray-700 rounded-2xl">
                        {day.name}
                </button>
            {/if}
            {#if selected == day.id && day.id != 0}
                <button on:click={()=>(selected = day.id)} class="bg-gray-800 rounded-2xl">
                    {day.name}
                </button>
            {/if}
        {/each}
        {#if JSON.parse(data.permissions).includes('coo')}
            <a href="/pit-schedule/edit" class="bg-rose-700 rounded-2xl py-1 px-2">
                Edit        
            </a>
        {/if}
    </div>
    <div class="bg-gray-800 gap-2 p-2 my-2 rounded-3xl">
        <table>
            <tr>
                <th>Time</th>
                <th>Match Type</th>
                <th>Pit Crew</th>
            </tr>
            {#each leads as lead}
                {#if lead.dayId == selected}
                    <tr>
                        <td>
                            {formatTime(lead.start)}<br>
                            to<br>
                            {formatTime(lead.end)}
                        </td>
                        <td class="bg-slate-800">
                            {lead.name}
                        </td>
                        <td>
                            <table>
                                {#each scouts as scout}
                                    {#if scout.leadId == lead.id}
                                        <tr>
                                            {#if scout.name == data.user}
                                                <td class="bg-slate-700">{findName(scout.name)}</td>
                                            {:else}
                                                <td>{findName(scout.name)}</td>
                                            {/if}
                                            {#if scout.team == 'Blue 3' || scout.team == 'Blue 2' || scout.team == 'Blue 1'}
                                                <td class="bg-sky-700">{scout.team}</td>
                                            {:else if scout.team == 'Red 3' || scout.team == 'Red 2' || scout.team == 'Red 1'}
                                                <td class="bg-rose-700">{scout.team}</td>
                                            {/if}
                                        </tr>
                                    {/if}
                                {/each}
                            </table>
                        </td>
                    </tr>
                {/if}
            {/each}
        </table>
    </div>
</middle>
<style>
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
    }

    td, th {
        border: 2px solid black;
        text-align: left;
        padding: 8px;
    }
</style>