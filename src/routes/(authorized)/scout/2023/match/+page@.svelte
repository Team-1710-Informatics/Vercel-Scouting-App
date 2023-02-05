<script lang="ts">
    import { slide } from 'svelte/transition';
    import Timer from './Timer.svelte';
    import Inventory from './Inventory.svelte';
    import Grid from './Grid.svelte';

    type InventoryItem = {
        time:number,
        type:"cone"|"cube",
        substation:boolean,
        method:"shelf"|"chute"|"floor"|{x:number,y:number}
    }

    let state:{
        time:number,
        started:boolean,
        inventory:InventoryItem[],
        actions:any[]
    } = {
        time:0,
        started:false,
        inventory:[],
        actions:[]
    }

    /**
     * To-do:
     * - Timer that the scout starts and tracks the match time
     * - System for the scout to track robot's input and output
     * - Grid for tracking robot's output, svelte each block
     * - Track balance thingy
     * 
     * - Track all actions in an array of objects
     * - each object should include the action and the time it occurred
    */
</script>

<center>
    <div class="mt-10">
        <Timer bind:state={state}/>
        <br>
        <Inventory bind:state={state}/>
    </div> 
</center>