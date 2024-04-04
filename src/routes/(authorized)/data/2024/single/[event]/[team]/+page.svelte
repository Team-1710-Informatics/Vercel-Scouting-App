<script>
    import { onMount } from 'svelte';

    import blueStartingPosition from "$lib/assets/scout/2024/blue_starting.png";
    import redStartingPosition from "$lib/assets/scout/2024/red_starting.png";
    import stats from "./individualStats.ts";

    export let data;

    let entries, startRed, startBlue, rectBlue, rectRed;
    let startPositionArray = [];

    function setStarting(){
        startPositionArray.forEach(e=>{
            if(e.alliance==="blue"){
                e.style+=`left:${e.position.x+rectBlue.left}px;top:${(250 - e.position.y)+rectBlue.top}px;`
            }else if(e.alliance==="red"){
                e.style+=`left:${e.position.x+rectRed.left}px;top:${(250 - e.position.y)+rectRed.top}px;`
            }
        });
    }

    onMount(()=>{
        rectRed = startRed.getBoundingClientRect();
        rectBlue = startBlue.getBoundingClientRect();
        entries = data.entries;
        startPositionArray = stats["StartPosition"](entries);
        setStarting();
    });

    let selectEl;

    function changeTeam(event) {
    const selectedValue = event.target.value;
    if (selectedValue !== '') {
      window.location.href = selectedValue;
    }
  }

  let innerWidth;
</script>

<svelte:window bind:innerWidth/>

<!-- dots on starting position -->
{#each startPositionArray as pos, i}
    <div class="rounded-full w-2 h-2 {pos.alliance=="red"?"bg-red-600":"bg-blue-600"} border-2 border-black fixed" style={pos.style}>{i+1}</div>
{/each}

{#if innerWidth<=800}
    *Warning: Page not designed for a mobile device*
{/if}
<!-- select team -->
<center class="my-4">
    {data.team}<br>
    <select bind:value={selectEl} on:change={changeTeam}>
        <option value={null}>select a team...</option>
        {#each data.teams as team}
            {#if team!=data.team}<option value={team}>{team}</option>{/if}
        {/each}
    </select>
</center>

<!-- stats analysis -->
<div class="flex flex-row text-black font-bold">
    <div class=" basis-2/3 bg-neutral-500 border-stone-800 border-2 rounded grid grid-cols-3"> <!-- grid cols 3, 2 for analysis, 1 for auto legend -->
        <div class="col-span-{innerWidth<=800 ? "3":"2"}">
            <div class="grid grid-cols-2 border-b-2 border-stone-800 h-fit"> <!--Scoring-->
                <h1 class="col-span-2 text-center underline font-bold text-xl">Scoring</h1>
                <div class="grid grid-rows-2 h-fit text-center">
                    <h1 class="p-2">Score : {Math.trunc(stats["AverageScore"](data.entries)*100)/100}</h1>
                    <h1 class="p-2">Standard Score Deviation: {Math.trunc(stats["StdDevScore"](data.entries)*100)/100}</h1>
                </div>
                <div class="grid grid-rows-2 h-fit text-center">
                    <div class="p-2">TeleOp Score : {Math.trunc(stats["TeleScore"](data.entries)*100)/100}</div>
                    <div class="p-2">Auto Score : {Math.trunc(stats["AutoScore"](data.entries)*100)/100}</div>
                </div>
            </div>
            <div class="grid grid-cols-2 border-b-2 border-stone-800 h-fit"> <!-- Phase Scoring -->
                <h1 class="col-span-2 text-center underline font-bold text-xl">Phase Scoring</h1>
                <div class="p-2 flex flex-col text-center">
                    <h1>Match Accuracy: {Math.trunc(stats["TotalAccuracy"](data.entries)*100)}%</h1>
                    <h1>Tele Accuracy: {Math.trunc(stats["TeleAccuracy"](data.entries)*100)}%</h1>
                    <h1>Auto Accuracy: {Math.trunc(stats["AutoAccuracy"](data.entries)*100)}%</h1>
                </div>
                <div class="text-center">
                    <h1>Shots Per Match: {Math.trunc(stats["TotalShot"](data.entries)*100)/100}</h1>
                    <h1>Shots Per Tele: {Math.trunc(stats["TeleShot"](data.entries)*100)/100}</h1>
                    <h1>Shots Per Auto: {Math.trunc(stats["AutoShot"](data.entries)*100)/100}</h1>
                </div>
            </div>
            <div class="grid grid-cols-2 border-b-2 border-stone-800 h-fit"> <!-- Location Scoring -->
                <h1 class="col-span-2 text-center underline font-bold text-xl">Location Scoring</h1>
                <div class="p-2 flex flex-col text-center">
                    <h1 class="text-center">Amp Scores: {Math.trunc(stats["AmpScore"](data.entries)*100)/100}</h1>
                    <h1 class="text-center">Amp Accuracy: {Math.trunc(stats["AmpAccuracy"](data.entries)*100)}%</h1>
                </div>
                <div class="p-2 flex flex-col text-center">
                    <h1 class="text-center">Speaker Scores: {Math.trunc(stats["SpeakerScore"](data.entries)*100)/100}</h1>
                    <h1 class="text-center">Speaker Accuracy: {Math.trunc(stats["SpeakerAccuracy"](data.entries)*100)}%</h1>
                </div>
            </div>
            <div class="grid grid-cols-2 border-b-2 border-stone-800 h-fit"> <!-- Cycles -->
                <h1 class="col-span-2 text-center underline font-bold text-xl">Cycles</h1>
                <div class="p-2 flex flex-col text-center">
                    <h1 class="text-center">Source-Speaker Cycletime: {Math.trunc(stats["SourceCycleTime"](data.entries)*100)/100}</h1>
                    <h1 class="text-center">Center-Speaker Cycletime: {Math.trunc(stats["CenterCycleTime"](data.entries)*100)/100}</h1>
                </div>
                <div class="p-2 flex flex-col text-center">
                    <h1 class="text-center">Source-Wing Drop Cycletime: {Math.trunc(stats["SourceDropCycle"](data.entries)*100)/100}</h1>
                    <h1 class="text-center">Auto Time to Center: {Math.trunc(stats["TimeToCenter"](data.entries)*100)/100}</h1>
                </div>
            </div>
            <div class="grid grid-cols-2 border-b-2 border-stone-800 h-fit"> <!-- Cycles -->
                <h1 class="col-span-2 text-center underline font-bold text-xl">Strategy</h1>
                <div class="p-2 flex flex-col text-center">
                    <h1 class="text-center">Main Strat: {stats["Strategy"](data.entries)}</h1>
                </div>
                <div class="p-2 flex flex-col text-center">
                    <h1 class="text-center">Breakdown: {Math.trunc(stats["BreakdownRate"](data.entries)*100)}%</h1>
                </div>
            </div>
            {#if data.pitData!=="none"} <!-- Pit -->
            <div class="grid grid-cols-2 border-b-2 border-stone-800 h-fit">
                <h1 class="col-span-2 text-center underline font-bold text-xl">Pit Scout</h1>
                <div class="p-2 flex flex-col text-center">
                    <h1 class="text-center">Height: {data?.pitData.height==undefined ? NaN : `${data?.pitData.height}${data?.pitData.sizeUnit}`}</h1>
                    <h1 class="text-center">Width: {data?.pitData.width==undefined ? NaN : `${data?.pitData.width}${data?.pitData.sizeUnit}`}</h1>
                </div>
                <div class="p-2 flex flex-col text-center">
                    <h1 class="text-center">Trap: {data?.pitData.ampScore==undefined ? NaN : data?.pitData.ampScore}</h1>
                    <h1 class="text-center">Amp: {data?.pitData.trapScore==undefined ? NaN : data?.pitData.trapScore}</h1>
                </div>
            </div>
            {/if}
        </div>

        {#if innerWidth>800} <!--startpositions calculations. Off for viewport size of <800 -->
        <div class="border-l-4 border-stone-800 grid grid-rows-{startPositionArray.length}"> 
            {#each startPositionArray as value, i}
                <div class="mx-auto text-center border-t-2 border-b-2 w-full border-stone-800"><h1 class="underline">Auto {i+1} : {value.match}</h1>
                    Score: {value.auto}<br>
                    attempted: {value.attempt}<br>
                    <div class="{innerWidth>=650?"grid grid-cols-2":""}">
                        <h1>Center:{value.center}</h1>
                        <h1>Wing:{value.wing}</h1>
                    </div>
                </div>
            {/each}
        </div>
        {/if}
    </div>
    <div class="flex flex-col gap-0 fixed -z-10" style="right:4.5%">
        <img class="m-auto" src={blueStartingPosition} alt="" bind:this={startBlue}/>
        <img class="m-auto" src={redStartingPosition} alt="" bind:this={startRed}/>
    </div>
</div>

<style>
    img{
        height:250px;
        width:100px;
    }
</style>