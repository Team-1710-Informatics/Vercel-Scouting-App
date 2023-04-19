<script>
    import CompetitionSelector from '$lib/components/search/CompetitionSelector.svelte';
    import tba from '$lib/modules/tba';
    import rules from "./Rules.ts";

    export let data;

    let teams=[];
    let event = data.current?.key??undefined
    async function teamRes(eventKey){
        teams = await tba(`event/${eventKey}/teams/simple`);
    }

    function scouted(team){
        let scouted = false;
        data.scouted.forEach(e=>{
            if(e.team == team && e.event == event){
                scouted = true;
            }
        })
        return scouted;
    }

    $: teamRes(event);
</script>

<center class="py-10">
    <h6>Pit Scouting</h6>
    <div class="box p-1 mb-4 mx-1">
        <h6>Rules</h6>
        <div class="text-left">
            {#each rules as rule}
                {rule}<br>
            {/each}
        </div>
    </div>
    <div class="box">
        <h6>Competition</h6>
        <CompetitionSelector bind:event={event} events={data.events}/>
    </div>
    <br>
    <p>Already scouted:</p>
    <div class="grid grid-cols-3 gap-2 w-fit">
        {#each data.scouted as team}
            {#if team.team > 0 && team.event === event}
                <div><a href="../data/2023/team/{team.event}/{team.team}" class="text-blue-500 underline hover:text-white">{team.team}</a></div>
            {/if}
        {/each}
    </div>
    <br>
    <p>Not Scouted:</p>
    <div class="grid grid-cols-3 gap-2 w-fit">
        {#each teams as team}
            {#if !scouted(team.team_number)}
                <div><a class="text-blue-500 underline hover:text-white" href="/pit-scout/{team.team_number}">{team.team_number}</a></div>
            {/if}
        {/each}
    </div>
    <br>
    <a href="./" class="pt-5"><button class="submit">Pit Scout!</button></a>
</center>