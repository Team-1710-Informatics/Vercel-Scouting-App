<script>
    import CompetitionSelector from '$lib/components/search/CompetitionSelector.svelte'
    import tba from '$lib/modules/tba'
    import rules from './Rules.ts'

    // get data
    export let data

    let teams = []
    let event = data.current?.key ?? undefined

    // check that TBA is accessible
    async function teamRes(eventKey) {
        if (eventKey) {
            teams = await tba(`event/${eventKey}/teams/simple`)
        }
    }

    // check is team has been scouted
    function scouted(team) {
        let scouted = false
        data.scouted.forEach((e) => {
            console.log(e.team, "team")
            console.log(e.event, "event")
            if (e.team == team && e.event == event) {
                scouted = true
            }
        })
        return scouted
    }

    $: teamRes(event)
</script>

<center class="py-10 px-8">
    <h6>Pit Scouting</h6>
    <div
            class="m-2 w-fit bg-gradient-to-br from-slate-900 to-slate-800 text-center p-4 rounded-lg"
    >
        <h6>Rules</h6>
        <div class="text-left">
            {#each rules as rule}
                {rule}<br/>
            {/each}
        </div>
    </div>
    <div
            class="m-2 w-fit bg-gradient-to-br from-slate-900 to-slate-800 text-center p-4 rounded-lg"
    >
        <h6>Competition</h6>
        <CompetitionSelector bind:event events={data.events}/>
    </div>
    <br/>
    <p>Already scouted:</p>
    <div class="grid grid-cols-3 gap-2 w-fit">
        {#each data.scouted as team}
            {#if team.team > 0 && team.event === event}
                <div>
                    <a
                            href="../data/2024/team/{team.event}/{team.team}"
                            class="text-blue-500 underline hover:text-white"
                    >{team.team}</a
                    >
                </div>
            {/if}
        {/each}
    </div>
    <br/>
    <p>Not Scouted:</p>
    <div class="grid grid-cols-3 gap-2 w-fit">
        {#each teams as team}
            {#if !scouted(team.team_number)}
                <div>
                    <a
                            class="text-blue-500 underline hover:text-white"
                            href="/pit-scout/{event}/scout/{team.team_number}"
                    >{team.team_number}</a
                    >
                </div>
            {/if}
        {/each}
    </div>
    <br/>
</center>
