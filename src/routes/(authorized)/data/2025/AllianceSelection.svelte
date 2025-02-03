<script>
    import tba from "$lib/modules/tba"; 
    import { onMount } from 'svelte';
    import List from '$lib/components/ui/List.svelte'

    export let event_key;

    let rankings;
    let reference;
    let picked={rankings: [[], [], [], [], [], [], [], []]};
    let i=0;
    let down = true;
    let selection = true;
    let rounds = 1;
    let accept = true;

    let selected_team = null;

    let selecting = false;

    function changeMode() {
        selection = !selection
    }

    async function getRankings() {
        rankings = await tba('event/' + event_key + '/rankings');
        console.log(rankings);
        console.log(reference)

        for (let z = 0; z < 8; z++) {
            console.log(z)

            rankings.rankings[z].rejected = false;

            picked.rankings[z].push(rankings.rankings[0])
            rankings.rankings.splice(0, 1)
        }
        reference = rankings;

        rankings = rankings;
        picked = picked; 
        console.log(picked)
    }

    function pickTeam(ranking) {
            if (selection && rounds<5) {
                let index = rankings.rankings.indexOf(ranking);
                picked.rankings[i].push(ranking)
                if (down == true){
                    i++;
                }
                else {
                    i--;
                }
                if(i > 7){
                    i = 7;
                    down = false;
                    rounds++;
                }
                if(i < 0){
                    i = 0;
                    down = true;
                    rounds++;
                }
                rankings.rankings.splice(index, 1)
                rankings = rankings;
                picked = picked; 
            }
            else {

            }
        console.log(picked)
        selecting = false
    }
    // accept and decline
    // variable true for decline/accept
    //reject team function
    //select variable on click true
    
    function decline(team) {
        team.rejected = true;
        team=team
        console.log(team)
        rankings.rankings[rankings.rankings.indexOf(team)].rejected = true
    }

    function compareRank(a, b) {
        return a.rank - b.rank;
    }

    function undo(){
        if(down == true) {
            if (rounds == 1 && i == 0) {
                
            }
            else{
                if(i>0) {
                    i--
                    let length = picked.rankings[i].length
                    rankings.rankings.push(picked.rankings[i][length-1])
                    picked.rankings[i].pop()
                    rankings = rankings;
                    picked = picked; 
                }
                else {
                    let length = picked.rankings[i].length
                    rankings.rankings.push(picked.rankings[i][length-1])
                    picked.rankings[i].pop()
                    rankings = rankings;
                    picked = picked; 
                    down = false
                    rounds--
                }
            }
        }
        else {
            if(i<7) {
                i++
                let length = picked.rankings[i].length
                rankings.rankings.push(picked.rankings[i][length-1])
                picked.rankings[i].pop()
                rankings = rankings;
                picked = picked; 
            }
            else {
                let length = picked.rankings[i].length
                rankings.rankings.push(picked.rankings[i][length-1])
                picked.rankings[i].pop()
                rankings = rankings;
                picked = picked; 
                down = true
                rounds--
            }
        }
        rankings.rankings.sort(compareRank)
        rankings = rankings
    }

    onMount(() => {
        getRankings();
    });
</script>

<center>
<div class="flex flex-cols-2">
    {#if rankings}
        <div class="basis-1/2">
            <h1 class="text-lg">Available Teams</h1>
            <div style="height: 80vh;" class="overflow-auto">
                {#each rankings.rankings as ranking}
                    {#if ranking.rejected==false}
                        <li><button on:click={() => {selecting = true; selected_team = ranking}}>{ranking.team_key}</button></li>
                    {/if}
                {/each}
            </div>
            <!-- <List items={rankings.rankings} /> -->
        </div>
        <div class="basis-1/2">
            <h1 class="text-lg">Picked Teams</h1>
            <!-- <button class="h-10 my-2 px-2 bg-sky-800" on:click={changeMode}>Power with power {selection}</button> -->
            <button on:click={undo}>Undo</button>
            <div style="height: 72vh;" class="overflow-auto">
                {#each picked.rankings as alliance}
                    {#if picked.rankings.indexOf(alliance) == i && selection}
                        <div class="w-fit h-fit px-4 rounded-md bg-slate-600">
                            <h1 class="text-lg font-bold">Alliance {picked.rankings.indexOf(alliance) + 1}</h1>
                            {#each alliance as team}
                                <li class="list-none"><button>{team.team_key}</button></li>
                            {/each}
                            {#if selecting}
                                <button class="bg-green-500 rounded-md" on:click={ pickTeam(selected_team) }>Accept</button>
                                <button class="bg-red-500 rounded-md" on:click={ decline(selected_team)}>Decline</button>
                            {/if}
                        </div>
                    {:else}
                        <h1 class="text-md">Alliance {picked.rankings.indexOf(alliance) + 1}</h1>
                        {#each alliance as team}
                            <li class="list-none"><button>{team.team_key}</button></li>
                        {/each}
                    {/if}
                {/each}
            </div>
        </div>
    {/if}
</div>
</center>