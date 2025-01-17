<script lang=ts>
    //@ts-ignore;
    import Countdown from "$lib/components/Countdown.svelte"

    type Competition = {
        name:string,
        date:number,
        end:number
    }

    export let events:Competition[];
    // export let lead:any;
    // export let scouts:any;
    // export let backups:any;
    // export let upcomingLead:any;
    // export let upcomingScouts:any;
    // export let upcomingBackups:any; 
    // export let users:any;
    // export let user:any;

    function nextComp() : Competition | null {
        let next = null;
        let now = Date.now();
        events.forEach(e=>{
            if(e.date>now){
                if(next == null) next = e;
                else if(next.date>e.date) next = e;
            }
        });
        return next;
    }

    function currComp() : [Competition, string] | null {
        let curr = null;
        let now = Date.now();
        events.forEach(e=>{
            if(e.date <= now && e.end + 86400000 > now)
                curr = e;
        });

        if(!curr) return null;

        let elapsed = now - curr.date;
        let n = Math.floor(elapsed / (1000 * 3600 * 24)) + 1;
        console.log(n);
        let day:string;
        switch(n){
            // I don't think comps are ever this long, but may as well cover all the bases
            case 1: day = "one";break;
            case 2: day = "two";break;
            case 3: day = "three";break;
            case 4: day = "four";break;
            case 5: day = "five";break;
            case 6: day = "six";break;
            case 7: day = "seven";break;
            case 8: day = "eight";break;
            case 9: day = "nine";break;
            default: day = n.toString();break;
        }

        return [curr,day];
    }

    // function format(time:string){
    //     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    //     const originalDate = new Date(time);
    //     const formattedTime = originalDate.toLocaleString('en-US', {
    //         timeZone: timeZone,
    //         hour: 'numeric',
    //         minute: 'numeric',
    //         hour12: true
    //     });
    //     return(formattedTime);
    // }
    // let itsBasicallyOneAMAndIDontKnowWhatToNameThis:any = [];
    // backups.forEach((e:any)=>{
    //     itsBasicallyOneAMAndIDontKnowWhatToNameThis.push(e.name);
    // })
    // const isNothing = (currentValue:string) => currentValue == "";
    // function backupCheck() {
    //     if(itsBasicallyOneAMAndIDontKnowWhatToNameThis.every(isNothing) == true){
    //         return false;
    //     }
    //     else{
    //         return true;
    //     }
    // }

    // function findName(username:any){
    //     let name = [''];
    //     users.forEach((e:any) =>{
    //         if(e.username == username){
    //             name.unshift(e.name.first);
    //             name.unshift(e.name.last);
    //         }
    //     })
    //     if(name[0] == ''){
    //         return username
    //     }
    //     else{
    //         return name[1] + " " + name[0]
    //     }
    // }
</script>

<middle class="text-center">
    {#if currComp() != null}
        <b>{currComp()[0].name}</b>
        <p class="text-2xl">Day <b>{currComp()[1]}</b></p>
    {:else if nextComp() != null}
        <Countdown until={nextComp().date} />
        <p style="color:rgb(174, 172, 172); font-size:10px">until</p>
        <b>{nextComp().name}</b>
    {:else}
        <p>Preseason</p>
    {/if}
    <!-- {#if lead.name != ''}
        <div class="p-2 bg-slate-800 rounded-xl">
            <table>
                <tr>
                    <th>Current Shift</th>
                </tr>
                <tr>
                    <th>{format(lead.start)} to {format(lead.end)}</th>
                </tr>
                <tr>
                    <table>
                        <tr>
                            <th>Scouts</th>
                            {#if backupCheck()}
                                <th>Backups</th>
                            {/if}
                        </tr>
                        <tr>
                            <td>
                                <table>
                                    <tr>
                                        <th>Name</th>
                                        <th>Team</th>
                                    </tr>
                                    {#each scouts as scout}
                                        <tr>
                                            {#if scout.name == user.username}
                                                <td class="bg-slate-700">{findName(scout.name)}</td>
                                            {:else}
                                                <td>{findName(scout.name)}</td>
                                            {/if}
                                            {#if scout.team == 'Blue3' || scout.team == 'Blue2' || scout.team == 'Blue1'}
                                                <td class="bg-sky-700">{scout.team}</td>
                                            {:else if scout.team == 'Red3' || scout.team == 'Red2' || scout.team == 'Red1'}
                                                <td class="bg-rose-700">{scout.team}</td>
                                            {/if}
                                        </tr>
                                    {/each}
                                </table>
                            </td>
                            {#if backupCheck()}
                                <td>
                                    <div class="flex-col">
                                        {#each backups as backup}
                                            {#if backup.name == user.username}
                                                <div class="bg-slate-700">
                                                    {findName(backup.name)}
                                                </div>
                                            {:else}
                                                <div>
                                                    {findName(backup.name)}
                                                </div>
                                            {/if}
                                        {/each}
                                    </div>
                                </td>
                            {/if}
                        </tr>
                    </table>
                </tr>
            </table>
        </div>
    {/if}
    {#if upcomingLead.name != ''}
        <div class="p-2 bg-slate-800 rounded-xl">
            <table>
                <tr>
                    <th>Next Shift</th>
                </tr>
                <tr>
                    <th>{format(upcomingLead.start)} to {format(upcomingLead.end)}</th>
                </tr>
                <tr>
                    <table>
                        <tr>
                            <th>Scouts</th>
                            {#if backupCheck()}
                                <th>Backups</th>
                            {/if}
                        </tr>
                        <tr>
                            <td>
                                <table>
                                    <tr>
                                        <th>Name</th>
                                        <th>Team</th>
                                    </tr>
                                    {#each upcomingScouts as scout}
                                        <tr>
                                            {#if scout.name == user.username}
                                                <td class="bg-slate-700">{findName(scout.name)}</td>
                                            {:else}
                                                <td>{findName(scout.name)}</td>
                                            {/if}
                                            {#if scout.team == 'Blue3' || scout.team == 'Blue2' || scout.team == 'Blue1'}
                                                <td class="bg-sky-700">{scout.team}</td>
                                            {:else if scout.team == 'Red3' || scout.team == 'Red2' || scout.team == 'Red1'}
                                                <td class="bg-rose-700">{scout.team}</td>
                                            {/if}
                                        </tr>
                                    {/each}
                                </table>
                            </td>
                            {#if backupCheck()}
                                <td>
                                    <div class="flex-col">
                                        {#each upcomingBackups as backup}
                                            {#if backup.name == user.username}
                                                <div class="bg-slate-700">
                                                    {findName(backup.name)}
                                                </div>
                                            {:else}
                                                <div>
                                                    {findName(backup.name)}
                                                </div>
                                            {/if}
                                        {/each}
                                    </div>
                                </td>
                            {/if}
                        </tr>
                    </table>
                </tr>
            </table>
        </div>
    {/if} -->
</middle>
<style>
    /* table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
    }

    td, th {
        border: 2px solid black;
        text-align: center;
        padding: 8px;
    } */
</style>