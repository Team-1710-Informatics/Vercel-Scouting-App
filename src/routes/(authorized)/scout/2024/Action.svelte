<script>
    import { slide } from "svelte/transition";
    import intake from "$lib/assets/icons/input.svg";
    import x from "$lib/assets/icons/x.svg";
    import output from "$lib/assets/icons/output.svg";
    import {clickOutside} from "$lib/modules/clickOutside";

    export let log = [];
    export let inv;
    export let state;
    export let amplified = false;

    const actions = [
        {
            name:"intake",
            location:[
                "source","center","amp","speaker","other"
            ],
            start:"col-start-1",
            src:intake,

        },{
            name:"drop",
            location:[
                "source","center","amp", "speaker", "other/miss"
            ],
            start:"col-start-2",
            src:x,
        },{
            name:"score",
            location:[
                "amp","speaker","trap"
            ],
            start:"col-start-3",
            src:output
        }
    ];

    function behavior(spot){
        let actionType=actions[active_action-1].name;
        if(actionType=="score"){
            log.push({
                time:state.time,
                action:actionType,
                location:spot,
                amplified:amplified,
                phase:state.phase
            });
            inv=false;
            inv=inv;
        } else {
            log.push({
                time:state.time,
                action:actionType,
                location:spot,
                amplified:amplified,
                phase:state.phase
            });
            if(actionType=="drop"){inv=false;inv=inv;}
            else if(actionType=="intake"){inv=true;inv=inv;}
        }
        active_action=0;
        active_action=active_action;
        console.log(log);
    }
    
    let active_action=0;
</script>

<div class="grid grid-cols-3">
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
</style>