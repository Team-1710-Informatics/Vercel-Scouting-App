<script lang="ts">
    import { object_without_properties } from "svelte/internal";

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
            if(time % 1 == 0.5) {
                finalTime = (newTime - 0.5) + ":30 P.M.";
            } else {
                finalTime = newTime + ":00 P.M.";
            }
        }
        else{
            if(time % 1 == 0.5) {
                finalTime = (time - 0.5) + ":30 A.M.";
            } else {
                finalTime = time + ":00 A.M.";
            }

        }
        return finalTime;
    }

    $: releasing = false;
    $: infoScout = {};
    $: infoLead = {};
    $: pickingUp = false;
    $: reason = "";
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
        {#if JSON.parse(data.permissions).includes('admin')}
            <a href="/scouting-schedule/edit" class="bg-rose-700 rounded-2xl py-1 px-2">
                Edit        
            </a>
        {/if}
    </div>
    Click on your shift to release it
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
                                                {#if scout.releasing == false}
                                                    <td class="bg-slate-700">
                                                        <button on:click={()=>{releasing = true, infoScout = scout, infoLead = lead}} class="bg-rose-700 rounded-2xl">
                                                            {findName(scout.name)}
                                                        </button>
                                                    </td>
                                                {:else}
                                                    <td class="bg-slate-700">
                                                        {findName(scout.name)}
                                                    </td>
                                                {/if}
                                            {:else if scout.releasing == true}
                                                <td>
                                                    <button on:click={()=>{pickingUp = true, infoScout = scout}} class="bg-green-700 rounded-2xl">
                                                        {findName(scout.name)}
                                                    </button>
                                                </td>
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
                        {#if backupCheck()}
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
                        {/if}
                    </tr>
                {/if}
            {/each}
        </table>
    </div>
    {#if releasing == true}
        <div class=overlay></div>
        <div class="msg bg-gray-700 h-min py-4 rounded-2xl">
            <middle>
                <button on:click={()=>(releasing = false, reason = "", infoScout = {}, infoLead = {})} class="bg-rose-700 mb-2 rounded-2xl">
                    Back
                </button>
                Reason for shift release?
                <textarea bind:value={reason} class="w-40 h-20"/>
                <form method="POST" action="?/release">
                    <input type="text" hidden name="reason" value={JSON.stringify(reason)} />
                    <input type="text" hidden name="infoScout" value={JSON.stringify(infoScout)} />
                    <input type="text" hidden name="infoLead" value={JSON.stringify(infoLead)} />
                    {#if reason == ""}
                        <button disabled class="bg-green-700 mt-2 rounded-2xl submit" type="submit" value="Submit">
                            Submit
                        </button>
                    {:else}
                        <button on:click={()=>{location.reload()}} class="bg-green-700 mt-2 rounded-2xl submit" type="submit" value="Submit">
                            Submit
                        </button>
                    {/if}
                </form>
            </middle>
        </div>
    {/if}
    {#if pickingUp == true}
        <div class=overlay></div>
        <div class="msg bg-gray-700 h-min py-4 rounded-2xl">
            <middle>
                <button on:click={()=>(pickingUp = false, infoScout = {})} class="bg-rose-700 mb-2 rounded-2xl">
                    No... :(
                </button>
                Are you sure you want to pick up this shift?
                <form method="POST" action="?/pickup">
                    <input type="text" hidden name="info" value={JSON.stringify(infoScout)} />
                    <button on:click={()=>{location.reload()}} class="bg-green-700 mt-2 rounded-2xl submit" type="submit" value="Submit">
                        Credits!
                    </button>
                </form>
            </middle>
        </div>
    {/if}
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

.overlay {
    z-index: 1;
    width:100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left:0;
    background-color:black;
    opacity: 0.4;
}

.msg {
    z-index: 2;
    width: 200px;
    font-weight: bold;
    text-align:center;
    position: fixed;
    top:40%;
    opacity: 2;
}
</style>