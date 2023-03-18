<script>
    import MatchSelector from "$lib/components/search/MatchSelector.svelte";
    import { page } from "$app/stores";
    import Timeline from "$lib/components/data/2023/Timeline.svelte";
    import AutoAnalysis from "$lib/components/data/2023/AutoAnalysis.svelte";
    import {teamScore, gridLayout} from "../spreadsheet/[event]/statistics";
    import StarRating from "$lib/components/ui/StarRating.svelte";
    import cube from "$lib/assets/scout/2023/cube.png";
    import cone from "$lib/assets/scout/2023/cone.png";
    import Status from "$lib/components/function/Status.svelte";
    import Starting from "../../../scout/2023/Starting.svelte";

    export let data;
    
    let match = null;

    let team = null;
    console.log(data.competition.key)
    function getYTlink(match){
        for(let i = 0; i < match.videos.length; i++){
            if(match.videos[i].type=="youtube"){
                return "https://youtube.com/watch?v="+match.videos[i].key;
            }
        }

        return false;
    }
</script>

<center class="pt-5">
    <p class="text-xl font-bold">Find match</p>
    <div class="box">
        <MatchSelector 
            event={data.competition.key} 
            events={data.events} 
            bind:match={match} 
        />
    </div>
    <hr class="w-3/4 sm:w-1/2 my-3">
    {#if match} 
        <div class="grid grid-cols-1 gap-0 w-fit">
            {#each ["red","blue"] as alliance}
                <div class={`grid grid-cols-3 w-fit p-2 pb-3 gap-1 ${alliance==="red"?"bg-red-500 rounded-t-lg":"bg-blue-500 rounded-b-lg"}`}>
                    {#each match.alliances[alliance].team_keys as t}
                        <div class="relative w-14 h-8">
                            <button on:click={()=>{team=+t.substring(3)}} 
                                style={+t.substring(3)==team?"top:4px":"box-shadow: 0px 4px black"} 
                                class={`font-bold left-0 w-14 h-8 absolute bg-none border-none rounded-none ${alliance=="red"?"bg-red-700":"bg-blue-700"}`}
                            >
                                {t.substring(3)}
                            </button>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>

        {#if match.videos.length > 0}
            <a href={getYTlink(match)}><button class="submit my-2">Watch match</button></a>
        {/if}

        {#if team}
            <br>
            {#await fetch(`https://${$page.url.host}/internal-api/data/${match.event_key}/${match.match_number}/${team}`)}
                <p>Loading...</p>
            {:then res}{#await res.json() then res}
                {#each res.data as entry}
                    <middle class="box m-6">
                        <p>Scouted by <span class="font-bold">{entry.scout}</span></p>
                        <p>Approx. Scouted score: {teamScore(entry)}</p>
                        <div class="w-fit"><StarRating rating={entry.postgame.rating}/></div>
                        {#if entry.postgame?.driverSkill}
                            <div class="w-fit"><StarRating rating={entry.postgame.driverSkill}/></div>
                        {/if}
                        {#if entry.postgame.thoughts}<p>Scout thoughts: {entry.postgame.thoughts}</p>{/if}
                        <div class="flex flex-row items-middle gap-2">
                            <div class="grid grid-cols-9">
                                {#each gridLayout(entry) as row}
                                    {#each row as node}
                                        <div class="w-8 h-8 border-white border">
                                            {#if node==="cube"}
                                                <img src={cube}/>
                                            {:else if node==="cone"}
                                                <img src={cone}/>
                                            {/if}
                                        </div>
                                    {/each}
                                {/each}
                            </div>
                            <!-- <Starting alliance={entry.alliance} value={entry.pregame.start} display={true}/> -->
                        </div>
                        <!-- <p class="text-xs">{JSON.stringify(entry)}</p> -->
                    </middle>
                {:else}
                    <p class="opacity-50">No entries found</p>
                {/each}
            {/await}{/await}
        {/if}
    {/if}

</center>

