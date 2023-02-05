<script lang="ts">
    import { slide } from "svelte/transition";
    import { setContext, getContext } from 'svelte';
    
    type Action = {
        action:string,
        type:string,
        position:{
            x:number,
            y:number
        }
        time:number
    }

    let actions:[] = []
    setContext("actions", ()=>actions)

    const timer = getContext<()=>any>("timer");

    let canvas:HTMLCanvasElement;
    let ctx:CanvasRenderingContext2D;

    const grid = [
        ['H','^','^'],
        ['H','C','C'],
        ['H','^','^'],
    ];
    //script that reverses if blue allience
    
    function logPlacement(type:string, x:number, y:number){
        //@ts-ignore
        actions.push({action:"place", type:type, position:{x:x, y:y}, time:timer.time});
        //actions = actions;
    }
</script>

<div hidden class="border-blue-500 border-red-500"></div>

<div class="grid grid-cols-3" style="width:114px; height:115px;">
    {#each grid as column, x}
        {#each column as node, y}
            {#if node == '^'}
                <button on:click={()=>{ logPlacement("cone", x, y) }} class="node cone border-/*state.pre.alliance*/-500"></button>
            {:else if node == 'C'}
                <button on:click={()=>{ logPlacement("cube", x, y) }} class="node cube border-/*state.pre.alliance*/-500"></button>
            {:else if node == 'H'}
                <div class="grid grid-cols-1 node border-/*state.pre.alliance*/-500">
                    <button on:click={()=>{ logPlacement("cube", x, y) }} class="node half cube border-b-0 border-/*state.pre.alliance*/-500"></button>
                    <button on:click={()=>{ logPlacement("cone", x, y) }} class="node half cone border-t-0 border-/*state.pre.alliance*/-500"></button>
                </div>
            {/if}
        {/each}
    {/each}
</div>
<br>
<div class="slidecontainer">
    <input type="range" min="1" max="3" value="50" class="slider" id="myRange">
</div>
<br>
<br>
<p>{JSON.stringify("actions")}</p>

<style>
    .node {
        height: 51.77777777777778px;
        width:38px;
        margin:0px;
        border-radius:0px;
    }
    .half {
        height: 25.88888888888889px;
        width: 38px;
    }
    .cube {
        background-image: linear-gradient(to bottom right, rgb(115, 8, 113), rgb(191, 17, 214));
    }
    .cone {
        background-image: linear-gradient(to bottom right, rgb(188, 162, 69), rgb(236, 220, 82));
    }
    .slidecontainer {
        width: 25%;
    }
    
</style>