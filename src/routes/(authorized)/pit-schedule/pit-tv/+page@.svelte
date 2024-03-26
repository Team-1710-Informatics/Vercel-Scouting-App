<script lang="ts">
    import img from '$lib/assets/icons/ahh.png'

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
            }
        })
        if(name[0] == ''){
            return username
        }
        else{
            return name[0]
        }
    }
</script>
<div class=" flex flex-row streamHolder left-0">
    <div class="stream">
        <iframe src="https://www.youtube.com/watch?v=6YsNRnZRgg8" height="100%" width="100%" title="live stream"></iframe>
    </div>
    <div class="shifts overflow-y-scroll">
        <middle>
            <div class="bg-gray-800 flex flex-col gap-1 p-2 my-0 rounded-lg">
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
            </div>
            <div class="bg-gray-800 gap-2 p-2 my-1 rounded-3xl">
                <table>
                    <tr>
                        <th>Time</th>
                        <th>Match<br>Type</th>
                        <th>Pit<br>Crew</th>
                    </tr>
                    {#each leads as lead}
                        {#if lead.dayId == selected}
                            <tr>
                                <td>
                                    {lead.start}:00<br>
                                    to<br>
                                    {lead.end}:00
                                </td>
                                <td class="bg-slate-800">
                                    {#if lead.name == "Qualifications"}
                                        Quals
                                    {:else if lead.name == "Eliminations"}
                                        Elims
                                    {:else}
                                        {lead.name}
                                    {/if}
                                </td>
                                <td>
                                    <table>
                                        {#each scouts as scout}
                                            {#if scout.leadId == lead.id}
                                                <tr>
                                                    {#if scout.name == "Experienced Members"}
                                                        <td>Exp<br>Memb</td>
                                                    {:else if scout.name != ""}
                                                        <td>
                                                            {findName(scout.name)}
                                                        </td>
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
    </div>
</div>
<style>
    .stream {
        width: 80%;
        height: 100%;
    }
    .streamHolder {
        width: 100%;
        height: 100vh;
    }
    .shifts {
        width: 20%;
        height: 100%;
    }
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