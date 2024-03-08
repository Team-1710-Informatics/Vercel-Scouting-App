<script>
    import { slide } from "svelte/transition";
    import intake from "$lib/assets/icons/input.svg";
    import x from "$lib/assets/icons/x.svg";
    import output from "$lib/assets/icons/output.svg";
    import { onMount } from "svelte";

    import center from "$lib/assets/scout/2024/center.png";

    import redAmp from "$lib/assets/scout/2024/redAmp.png";
    import redSource from "$lib/assets/scout/2024/redSource.png";
    import redSpeaker from "$lib/assets/scout/2024/redSpeaker.png";
    import redTrap from "$lib/assets/scout/2024/redTrap.png";

    import blueAmp from "$lib/assets/scout/2024/blueAmp.png";
    import blueSource from "$lib/assets/scout/2024/blueSource.png";
    import blueSpeaker from "$lib/assets/scout/2024/blueSpeaker.png";
    import blueTrap from "$lib/assets/scout/2024/blueTrap.png";

    export let log = [];
    export let inv;
    export let state;
    export let amplified = false;
    export let meta;

    let location;

    // const actions = [
    //     {
    //         name:"intake",
    //         location:[
    //             "source","center","amp","speaker","other"
    //         ],
    //         start:"col-start-1",
    //         src:intake,

    //     },{
    //         name:"drop",
    //         location:[
    //             "source","center","amp", "speaker", "other/miss"
    //         ],
    //         start:"col-start-2",
    //         src:x,
    //     },{
    //         name:"score",
    //         location:[
    //             "amp","speaker","trap"
    //         ],
    //         start:"col-start-3",
    //         src:output
    //     }
    // ];

    function behavior(actionType){
        if(actionType=="score"){
            log.push({
                time:state.time,
                action:actionType,
                location,
                amplified:amplified,
                phase:state.phase
            });
            inv=false;
            inv=inv;
        } else {
            log.push({
                time:state.time,
                action:actionType,
                location,
                amplified:amplified,
                phase:state.phase
            });
            if(actionType=="drop"||actionType=="miss"){inv=false;inv=inv;}
            else if(actionType=="intake"){inv=true;inv=inv;}
        }
    }
</script>

<div class="grid grid-cols-2 w-4/5">
    <div class="grid grid-rows-2">
        <button on:click={()=>{behavior("intake")}} class="bg-sky-800 actionButton" disabled={!state.started || !location || inv}>Intake<img src={intake} class="opacity-40 ml-2" alt=""/></button>
        <button on:click={()=>{behavior("drop")}} class="bg-slate-700 actionButton" disabled={!state.started || !location || !inv}>Drop<img src={x} class="opacity-40 x ml-2" alt=""/></button>
    </div>
    <div class="grid grid-rows-2">
        <button on:click={()=>{behavior("score")}} class="bg-orange-900 actionButton" disabled={!state.started || !location || location=="center" || location=="source" || !inv}>Score<img src={output} class="opacity-40 otherIcons ml-2" alt=""/></button>
        <button on:click={()=>{behavior("miss")}} class="bg-stone-700 actionButton" disabled={!state.started || !location  || !inv}>Miss<img src={x} class="opacity-40 x ml-2" alt=""/></button>
    </div>
</div>

<div class="mt-4 border-2 rounded w-fit p-4 bg-slate-800">
    <u>Select position:</u>
    {#if location}{location}{/if}
    <div class="grid grid-cols-4 z-10 w-full mt-2" style="max-width:600px;">
        {#if meta.alliance == "blue"}
            <div class="grid-rows-2 col-span-2">
                <button class="button w-full" style={location==="amp"?"filter:invert(25%);":""} on:click={()=>location="amp"}><img src={blueAmp} alt="blue amp"/></button>
                <div class="grid grid-cols-2 -mt-1">
                    <button class="button w-full h-full" style={location==="speaker"?"filter:invert(25%);":""} on:click={()=>location="speaker"}><img src={blueSpeaker} alt="blue speaker"/></button>
                    <button class="button h-full" style={location==="trap"?"filter:invert(25%);":""} on:click={()=>location="trap"}><img src={blueTrap} alt="blue trap" class="h-full"/></button>
                </div>
            </div>
            <button class="button" style={location==="center"?"filter:invert(25%);":""} on:click={()=>location="center"}><img src={center} alt="center" class="h-full"/></button>
            <button class="button" style={location==="source"?"filter:invert(25%);":""} on:click={()=>location="source"}><img src={blueSource} alt="blue source" class="h-full"/></button>
        {:else if meta.alliance == "red"}
            <button class="button" style={location==="source"?"filter:invert(25%);":""} on:click={()=>location="source"}><img src={redSource} alt="red source" class="h-full"/></button>
            <button class="button" style={location==="center"?"filter:invert(25%);":""} on:click={()=>location="center"}><img src={center} alt="center" class="h-full"/></button>
            <div class="grid-rows-2 col-span-2">
                <button class="button w-full" style={location==="amp"?"filter:invert(25%);":""} on:click={()=>location="amp"}><img src={redAmp} alt="red amp"/></button>
                <div class="grid grid-cols-2 -mt-1">
                    <button class="button w-full" style={location==="trap"?"filter:invert(25%);":""} on:click={()=>location="trap"}><img src={redTrap} alt="red trap" class="h-full"/></button>
                    <button class="button w-full h-full" style={location==="speaker"?"filter:invert(25%);":""} on:click={()=>location="speaker"}><img src={redSpeaker} alt="red speaker"/></button>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .button{
        @apply p-0 m-0;
    }
    .button:hover{
        filter:invert(20%)
    }
    .actionButton{
        @apply m-2 rounded border-2 border-black flex flex-row justify-center;
    }
    .x{
        filter: brightness(0) saturate(100%) invert(22%) sepia(99%) saturate(6156%) hue-rotate(356deg) brightness(96%) contrast(117%);
    }
    .otherIcons{
        filter: saturate(100%) invert(50%) sepia(99%) saturate(6156%) hue-rotate(180deg) brightness(96%) contrast(117%);
    }
</style>

<!-- <div class="grid grid-cols-3">
    {#each actions as action, i}
        <button class="button1" on:click={()=>{active_action=i+1}} disabled={(action.name=="intake"?inv==true:inv==false)}>
            <b class="font-serif text-sky-100 text-sm">{action.name}</b>
            <img src={action.src} class="h-5 mx-auto opacity-40 {action.name==="drop"?"x":"otherIcons"}" alt=""/>
        </button>
    {/each}
</div>
<div class="grid grid-cols-3 w-full fixed z-10 pointer-events-none">
    {#if active_action}
        <div style="grid-column-start:{active_action};" transition:slide use:clickOutside on:click_outside={()=>{active_action=0;}}>
            {#each actions[active_action-1].location as location, i}
                <button style="min-width:85%;" class="button2 {i===0?"rounded-t":""}" on:click={()=>behavior(location)} disabled={!state.started}>{location}</button>
            {/each}
        </div>
    {/if}
</div>

<style>
    button{
        background-image:none;
    }
    button:hover{
        /* background-color:cadetblue; */
        border-color:white;
    }
    .button1{
        min-width: 95%;
        border-top-width:3px;
        border-left-width:3px;
        border-right-width:3px;
        background-color:#242436;
        @apply mx-auto py-3 rounded-none border-black border-b-0 flex flex-col;
    }
    .button2{
        background-color:#353547;
        @apply pointer-events-auto m-auto py-2 text-sm rounded-none relative border-neutral-900 px-0 border-x-4 border-y-2;
    }
    .x{
        filter: brightness(0) saturate(100%) invert(22%) sepia(99%) saturate(6156%) hue-rotate(356deg) brightness(96%) contrast(117%);
    }
    .otherIcons{
        filter: saturate(100%) invert(50%) sepia(99%) saturate(6156%) hue-rotate(180deg) brightness(96%) contrast(117%);
    }
</style> -->