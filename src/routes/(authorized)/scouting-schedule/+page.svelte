<script lang="ts">
    export let data:any;

    let users = JSON.parse(data.users);
    let scheduledays = JSON.parse(data.scheduledays);
    let leads = JSON.parse(data.leads);
    let scouts = JSON.parse(data.scouts);
    let backups = JSON.parse(data.backups);

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

    const isNothing = (currentValue:string) => currentValue == "";
    function backupCheck() {
        let backup:any = [];
        let lead:any = [];
        leads.forEach((e:any)=>{
            if(e.dayId == selected){
                lead.push(e.id);
            }
        })
        backups.forEach((e:any)=>{
            if(lead.includes(e.leadId)){
                backup.push(e.name);
            }
        })
        if(backup.every(isNothing) == true){
            return false;
        }
        else{
            return true;
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
        <a href="/scouting-schedule/edit" class="bg-rose-700 rounded-2xl py-1 px-2">
            Edit        
        </a>
    </div>
    <div class="bg-gray-800 gap-2 p-2 my-2 rounded-3xl">
        <table>
            <tr>
                <th>Time</th>
                <th>Lead</th>
                <th>Scouts</th>
                {#if backupCheck()}
                    <th>Backups</th>
                {/if}
            </tr>
            {#each leads as lead}
                {#if lead.dayId == selected}
                    <tr>
                        <td>
                            {formatTime(lead.start)}<br>
                            to<br>
                            {formatTime(lead.end)}
                        </td>
                        {#if lead.name == data.user}
                            <td class="bg-slate-700">{findName(lead.name)}</td>
                        {:else}
                            <td>{findName(lead.name)}</td>
                        {/if}
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
                        <td>
                            {#each backups as backup}
                                {#if backup.leadId == lead.id}
                                    {#if backup.name == data.user}
                                        <td class="bg-slate-700">{findName(backup.name)}</td>
                                    {:else}
                                        <td>{findName(backup.name)}</td>
                                    {/if}<br>
                                {/if}
                            {/each}
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