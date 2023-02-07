<script lang="ts">
    //@ts-ignore
    import slide from 'svelte-slidediag-transition';
    import Timer from './Timer.svelte';
    import Inventory, { getNextID } from './Inventory.svelte';
    import Grid from './Grid.svelte';
    import cube from "$lib/assets/scout/2023/cube.png";
    import cone from "$lib/assets/scout/2023/cone.png";

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
        actions:any[]
    } = {
        alliance:"blue",
        time:0,
        started:false,
        inventory:[],
        actions:[]
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
</script>

<center>
    <div class="mt-10">
        <Timer bind:state={state}/>
        <br>
        <Inventory bind:state={state}/>
        <div class="h-10">
            <div class="flex flex-row w-fit">
                {#each state.inventory as item, i (item.id)}
                    {#if item.type == "cone"}
                        <button class="bg-none border-none p-0" on:click={()=>{drop(i)}}><img alt="^" src={cone} width=24px transition:slide></button>
                    {:else if item.type == "cube"}
                        <button class="bg-none border-none p-0" on:click={()=>{drop(i)}}><img alt="C" src={cube} width=24px transition:slide></button>
                    {/if}
                {/each}
            </div>
            {#if state.inventory.length > 0}<p class="opacity-50 text-xs" transition:slide>Click to drop on floor</p>{/if}
        </div>
        <br>
        <Grid bind:state={state}/>
    </div>
    <!-- {#each state.actions as a}
        {a.action}
    {/each} -->
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