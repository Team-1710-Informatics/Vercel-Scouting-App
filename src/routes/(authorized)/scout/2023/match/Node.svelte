<script lang=ts>
    import cube from "$lib/assets/scout/2023/cube.png";
    import cone from "$lib/assets/scout/2023/cone.png";
    import output from "$lib/assets/icons/output-green.svg";
    import input from "$lib/assets/icons/input.svg";
    //@ts-ignore
    import slide from 'svelte-slidediag-transition';
    import { getIntake, deleteIntake } from './Inventory.svelte';

    function clickOutside(node:any, onEventFunction:any) {
        const handleClick = (event:any) => {
            var path = event.composedPath();

            if (!path.includes(node)) {
                onEventFunction();
            }
        }

        document.addEventListener("click", handleClick);

        return {
            destroy() {
                document.removeEventListener("click", handleClick);
            }
        }
    }

    const imgs = {
        cube:cube,
        cone:cone,
        none:""
    }

    let L = 1;

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

    let selecting = false;
</script>
<div class="w-12 h-12 relative">
    {#key state.inventory && state.actions}
        {#if type === "cube"}
            <div class="bg-gray-400 h-full w-full border-x-4 border-white z-50">
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
                    <button disabled={!state.started} on:click={()=>{selecting=true}} class="hover:bg-white/20 w-7 opacity-50" class:opacity-95={available()}><img class="bg-none" alt="V" width=28px src={input}></button>
                {/if}
            </div>
        {/if}
    {/key}
    {#if currentPiece != "none"}
        <img transition:slide|local style="position:absolute; left:4px; top:36px; width:12px; height:12px;" src={imgs[currentPiece]} alt={currentPiece}/>
    {/if}
    {#if selecting}
        <div class="absolute box border-none flex flex-row w-16 h-11 top-1 z-10 -left-2" use:clickOutside={()=>{
            if(L % 2 == 0)
                selecting=false;
            L++;
        }}>
            <button class="p-0 bg-none border-none w-7 h-7 mt-0" on:click={()=>{place("cube");selecting=false}}><img width=28px height=28px src={cube} alt="c"/></button>
            <button class="p-0 bg-none border-none w-7 h-7 mt-0" on:click={()=>{place("cone");selecting=false}}><img width=28px height=28px src={cone} alt="^"/></button>
        </div>
    {/if}
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

    .box {
        padding-bottom:2px;
        padding-top:2px;
        padding-left:4px;
        padding-right:4px;
	    background-color: rgba(54, 59, 66, 0.95);

    }
</style>