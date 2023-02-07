<script lang=ts>
    import cube from "$lib/assets/scout/2023/cube.png";
    import cone from "$lib/assets/scout/2023/cone.png";
    import output from "$lib/assets/icons/output-green.svg";
    import input from "$lib/assets/icons/input.svg";
    //@ts-ignore
    import slide from 'svelte-slidediag-transition';
    import { getIntake, deleteIntake } from './Inventory.svelte';

    const imgs = {
        cube:cube,
        cone:cone,
        none:""
    }

    export let state:any;
    export let pos:{x:number, y:number};
    let type:"cube"|"cone"|"hybrid";

    const grid = [
        ['^','c','^','^','c','^','^','c','^'],
        ['^','c','^','^','c','^','^','c','^'],
        ['h','h','h','h','h','h','h','h','h'],
    ]

    switch(grid[pos.y][pos.x]){
        case '^': type = "cone";break;
        case 'c': type = "cube";break;
        default: type = "hybrid";break;
    }

    function available(){
        let a = false;
        state.inventory.forEach((item:any) => {
            if(item.type == type || type == "hybrid") a = true;
        });
        return a;
    }

    function place(type:"cone"|"cube") {
        state.actions.push({
            action:"place",
            time:state.time,
            type:type,
            node:{x:pos.x,y:pos.y}
        })
        state.actions = state.actions;

        for(let i = state.inventory.length-1; i >= 0; i--){
            if(state.inventory[i].type == type){
                state.inventory.splice(i,1);
                state.inventory = state.inventory;
                return;
            }
        }
    }

    function hasPiece(){
        let foo:"cube"|"cone"|"none" = "none";
        state.actions.forEach((action:any)=>{
            if(action.action == "place" && action.node.x == pos.x && action.node.y == pos.y) {
                foo = action.type;
            }
            if(action.action == "intake" && action.location?.x == pos.x && action.location?.y == pos.y) {
                foo = "none";
            }
        });
        return foo;
    }

    function intakeStep2(location:"zone"|"midfield"|{x:number,y:number}){
        let intake = getIntake();
        intake.location=location;
        state.inventory.push(intake);
        state.inventory=state.inventory;
        
        let foo:any = {action:"intake", ...intake}
        delete foo.id;
        state.actions.push(foo);
        deleteIntake();
    }

    let currentPiece:"cube"|"cone"|"none" = "none";
    $: if(state.actions){currentPiece = hasPiece()}
</script>
<div class="w-12 h-12 relative">
    {#key state.inventory && state.actions}
        {#if type === "cube"}
            <div class="bg-gray-400 h-full w-full border-x-4 border-white">
                {#if getIntake()?.type == "cube"}
                    <button class="w-7 hover:bg-white/20 opacity-95" on:click={()=>{intakeStep2({x:pos.x, y:pos.y})}}><img alt="Take" class="w-7" src={output}></button>
                {:else}
                    <button on:click={()=>{place("cube")}} disabled={!state.started} class="hover:bg-white/20 w-7 opacity-50" class:opacity-95={available()}><img alt="V" style="filter:invert(100%)" width=28px src={input}></button>
                {/if}
            </div>
        {:else if type === "cone"}
            <div class="w-full h-full border-y border-y-gray-500 relative" class:bg-black={pos.x >= 3 && pos.x <= 5} class:bg-blue-700={!(pos.x >= 3 && pos.x <= 5) && state.alliance=="blue"} class:bg-red-600={!(pos.x >= 3 && pos.x <= 5) && state.alliance=="red"}>
                <div class="bg-gray-600 absolute" style="top:20px; left:20px; width:8px; height:8px; border-radius:50%;"></div>
                {#if getIntake()?.type == "cone"}
                    <button class="w-7 hover:bg-white/20 opacity-95" on:click={()=>{intakeStep2({x:pos.x, y:pos.y})}} style="margin-left:0.8px;"><img alt="Take" class="w-7" src={output}></button>
                {:else}
                    <button on:click={()=>{place("cone")}} disabled={!state.started} class="hover:bg-white/20 w-7 opacity-50" class:opacity-95={available()} style="margin-left:0.8px;"><img alt="V" width=28px src={input}></button>
                {/if}
            </div>
        {:else}
            <div class="border-x-4 border-white w-full h-full">
                {#if getIntake()?.type}
                    <button class="w-7 hover:bg-white/20 opacity-95" on:click={()=>{intakeStep2({x:pos.x, y:pos.y})}}><img alt="Take" class="w-7" src={output}></button>
                {:else}
                    <button disabled={!state.started} class="hover:bg-white/20 w-7 opacity-50" class:opacity-95={available()}><img class="bg-none" alt="V" width=28px src={input}></button>
                {/if}
            </div>
        {/if}
        {#if currentPiece != "none"}
            <img transition:slide|local style="position:absolute; left:4px; top:36px; width:12px; height:12px;" src={imgs[currentPiece]} alt={currentPiece}/>
        {/if}
    {/key}
</div>

<style>
    button {
        background: none;
        border: none;
        z-index: 10;
        padding:0px;
        padding-bottom:2px;
        border-radius:0px;
        margin-top:5px;
    }
</style>