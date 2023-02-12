<script lang="ts">
    //@ts-ignore
    import slide from 'svelte-slidediag-transition';
    import { enhance } from '$app/forms';
    import Timer from './Timer.svelte';
    import Inventory, { getNextID } from './Inventory.svelte';
    import Grid from './Grid.svelte';
    import Questions from './Questions.svelte';
    import cube from "$lib/assets/scout/2023/cube.png";
    import cone from "$lib/assets/scout/2023/cone.png";

    export let data:any;

    type InventoryItem = {
        time:number,
        type:"cone"|"cube",
        substation:boolean,
        method:"shelf"|"chute"|"floor"|{x:number,y:number},
        id:number
    }

    let state:{
        alliance:"red"|"blue",
        time:number,
        started:boolean,
        inventory:InventoryItem[],
        actions:any[],
        answers:any
    } = {
        alliance:data.predata.alliance,
        time:0,
        started:false,
        inventory:[],
        actions:[],
        answers:{}
    }

    function drop(i:number){ 
        let dropped = state.inventory.splice(i,1)[0]; 
        state.inventory = state.inventory; 

        state.actions.push({
            action:"drop",
            time:state.time,
            type:dropped.type
        })
    }

    $: out = JSON.stringify({
        actions: state.actions,
        untimed: state.answers
    })

    let loading = false;
</script>

<center class="pt-10">
    <div>
        <p class="text-3xl">Scouting <b>{data.predata.team}</b></p>
        <Timer bind:state={state}/>
        <br>
        <Inventory bind:state={state}/>
        <div class="h-12">
            <div class="flex flex-row w-fit">
                {#each state.inventory as item, i (item.id)}
                    {#if item.type == "cone"}
                        <button class="bg-none border-none p-0" on:click={()=>{drop(i)}}><img alt="^" src={cone} width=32px transition:slide></button>
                    {:else if item.type == "cube"}
                        <button class="bg-none border-none p-0" on:click={()=>{drop(i)}}><img alt="C" src={cube} width=32px transition:slide></button>
                    {/if}
                {/each}
            </div>
            {#if state.inventory.length > 0}<p class="opacity-50 text-xs" transition:slide>Click to drop on floor</p>{/if}
        </div>
        <Grid bind:state={state}/>
        <br>
        <Questions bind:state={state}/>
    </div>
    <!-- {#each state.actions as a}
        {a.action}
    {/each} -->

    <form method="POST" use:enhance={() => {
        loading = true;
        //@ts-ignore
        return async ({ update }) => {
            await update();
            loading = false;
        };
    }}>
        <br>
        <input hidden type="text" name="data" bind:value={out} />
        <button transition:slide class="submit mb-2" disabled={loading || !(state.started&&state.time==0)}>
            {loading?"Loading...":(state.started&&state.time==0)?"Next":(state.started)?state.time:"Next"}
        </button>
    </form>
</center>

<button on:click={()=>{
    let res = state.actions.pop();
    if(res == undefined){
        state.time = 0;
        state.started = false;
    }else if(res.action == "intake"){
        state.inventory.pop();
    }else if(res.action == "place"){
        for(let i = state.actions.length-1; i >= 0; i--){
            if(state.actions[i].action == "intake" && state.actions[i].type == res.type){
                let n = JSON.parse(JSON.stringify(state.actions[i]));
                delete n.action;
                n.id = getNextID();
                state.inventory.push(n);
                break;
            }
        }
    }
    state.actions = state.actions;
    state.inventory = state.inventory;
}} class="fixed top-1 right-1 bg-gradient-to-br from-red-500 to-red-400 border-red-600">Undo</button>