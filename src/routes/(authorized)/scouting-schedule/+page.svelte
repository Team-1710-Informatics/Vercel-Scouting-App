<script>
    export let data;
    const days = JSON.parse(data.days);
    const shifts = JSON.parse(data.shifts);
    const scouts = JSON.parse(data.scouts);
    const backups = JSON.parse(data.backups);
    let currentUser = JSON.parse(data.user);
    let selected = days[0];

    function format(time){
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const originalDate = new Date(time);
        const formattedTime = originalDate.toLocaleString('en-US', {
            timeZone: timeZone,
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        return(formattedTime);
    }
</script>
<middle>
    <div class="bg-gray-800 flex flex-row gap-2 p-2 my-2 rounded-3xl">  
        {#each days as day}
            <button on:click={()=>(selected = day)} class="bg-gray-700 rounded-2xl">
                {day}
            </button>
        {/each}
    </div>
    <div class="bg-gray-800 gap-2 p-2 my-2 rounded-xl">
        <table>
            <tr>
                <th>Time</th>
                <th>Lead Scout</th>
                <th>Scouts</th>
                <th>Backups</th>
            </tr>
            {#each shifts as shift}
                {#if shift.day == selected}
                    <tr>
                        <td>{format(shift.start)}<br>to<br>{format(shift.end)}</td>
                        {#if shift.name != currentUser.username}
                            <td>{shift.name}</td>
                        {:else if shift.name == currentUser.username}
                            <td class="bg-slate-700">{shift.name}</td>
                        {/if}
                        <td>
                            <table>
                                <tr>
                                    <th>Name</th>
                                    <th>Team</th>
                                </tr>
                                {#each scouts as scout}
                                    {#if scout.day == selected && scout.start == shift.start && scout.end == shift.end}
                                        <tr>
                                            {#if scout.team == 'Blue1'}
                                                {#if scout.name != currentUser.username}
                                                    <td>{scout.name}</td>
                                                {:else if scout.name == currentUser.username}
                                                    <td class="bg-slate-700">{scout.name}</td>
                                                {/if}
                                                <td class="bg-sky-700">Blue 1</td>
                                            {/if}
                                        </tr>
                                        <tr>
                                            {#if scout.team == 'Blue2'}
                                                {#if scout.name != currentUser.username}
                                                    <td>{scout.name}</td>
                                                {:else if scout.name == currentUser.username}
                                                    <td class="bg-slate-700">{scout.name}</td>
                                                {/if}
                                                <td class="bg-sky-700">Blue 2</td>
                                            {/if}
                                        </tr>
                                        <tr>
                                            {#if scout.team == 'Blue3'}
                                                {#if scout.name != currentUser.username}
                                                    <td>{scout.name}</td>
                                                {:else if scout.name == currentUser.username}
                                                    <td class="bg-slate-700">{scout.name}</td>
                                                {/if}
                                                <td class="bg-sky-700">Blue 3</td>
                                            {/if}
                                        </tr>
                                        <tr>
                                            {#if scout.team == 'Red1'}
                                                {#if scout.name != currentUser.username}
                                                    <td>{scout.name}</td>
                                                {:else if scout.name == currentUser.username}
                                                    <td class="bg-slate-700">{scout.name}</td>
                                                {/if}
                                                <td class="bg-rose-700">Red 1</td>
                                            {/if}
                                        </tr>
                                        <tr>
                                            {#if scout.team == 'Red2'}
                                                {#if scout.name != currentUser.username}
                                                    <td>{scout.name}</td>
                                                {:else if scout.name == currentUser.username}
                                                    <td class="bg-slate-700">{scout.name}</td>
                                                {/if}
                                                <td class="bg-rose-700">Red 2</td>
                                            {/if}
                                        </tr>
                                        <tr>
                                            {#if scout.team == 'Red3'}
                                                {#if scout.name != currentUser.username}
                                                    <td>{scout.name}</td>
                                                {:else if scout.name == currentUser.username}
                                                    <td class="bg-slate-700">{scout.name}</td>
                                                {/if}
                                                <td class="bg-rose-700">Red 3</td>
                                            {/if}
                                        </tr>
                                    {/if}
                                {/each}
                            </table>
                        </td>
                        <td>
                            {#each backups as backup}
                                {#if backup.day == selected && backup.start == shift.start && backup.end == shift.end}
                                    {#if backup.name != currentUser.username}
                                        <td>{backup.name}</td>
                                    {:else if backup.name == currentUser.username}
                                        <td class="bg-slate-700">{backup.name}</td>
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