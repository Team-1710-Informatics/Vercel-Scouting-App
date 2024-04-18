<script>
    import { slide } from "svelte/transition";
    import check from "$lib/assets/icons/check.svg";
    import x from "$lib/assets/icons/x-lg.svg";
    import caret from "$lib/assets/icons/caret.svg";

    export let state;
    export let answers={};

    let questions = [
        {q:"Did your robot leave the starting zone during AUTO?", name:"exitAuto", answer:null, time:153},
        {q:"Is your robot parked in the stage zone by the end of the MATCH?", name:"parkMatch", exclusive:"hangMatch", answer:null, time:135},
        {q:"Is your robot hanging on the stage at the end of the MATCH?", name:"hangMatch", exclusive:"parkMatch", answer:null, time:135},
        {q:"Is your spotlight activated on the robot", name:"spotlight", dependent:"hangMatch", exclusive:"parkMatch", answer:null, time:135},
        {q:"Did your ROBOT'S TEAM'S HUMAN PLAYER attempt a spotlight?", name:"spotlightAttempt", answer:null, time:135},
        {q:"How many robots are hanging on the SAME chain as your robot?", name:"harmony", dependent:"hangMatch", exclusive:"parkMatch", input:true, temp:0, answer:null, time:135},
    ];

    $: {
        questions.forEach(query=>{
            if(query?.exclusive){
                if(answers[query?.exclusive]===true){
                    if(query.input)query.answer=null;
                    else query.answer = false; 
                }
            }
            if(query?.dependent){
                if(answers[query?.dependent]===false){
                    if(query.input)query.answer=0;
                    else query.answer = false; 
                }
            }
            answers[query.name] = query.answer;
            answers = answers;
        })
    }

    let showAnswered = false;
</script>

<div class="box divide-gray-300 divide-y mt-20" style="max-width:97%;">
    <div class="grid grid-cols-2">
        <p>Questions</p>
        <label class="text-xs mt-1">
            <input type="checkbox" bind:checked={showAnswered}>
            Show Answered
        </label>
    </div>
    {#each questions as query (query.name)}
        {#if (query.answer === null || showAnswered) && state.time <= query.time && answers[query?.exclusive] != true}
            <div class="grid grid-cols-4 p-1" transition:slide class:opacity-50={!state.started}>
                <p class="col-span-3 px-1 text-start text-sm">{query.q}</p>
                {#if !query.input}
                    <div class="flex flex-row gap-0 mx-auto">
                        <button on:click={()=>{query.answer = true ;}} disabled={query.answer===true ||!state.started} class="text-center w-10 h-10 bg-gradient-to-tr from-emerald-500 to-violet-400 border-cyan-600 rounded-r-none rounded-l-full">
                            <center><img style="filter:invert(100%)" width=20px src={check} alt="Y"/></center>
                        </button>
                        <button on:click={()=>{query.answer = false;}} disabled={query.answer===false||!state.started} class="text-center w-10 h-10 bg-gradient-to-tl from-rose-400 to-amber-300 border-rose-500 rounded-l-none rounded-r-full text-black">
                            <center><img style="filter:invert(100%)" width=20px src={x} alt="N"/></center>
                        </button>
                    </div>
                {:else if query.input}
                    <div class="grid grid-cols-3">
                        {#each [0, 1, 2] as value}
                            <button on:click={()=>{query.answer=value}} disabled={query.answer===value||!state.started} class="operator">
                                {value}
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>
        {/if}
    {/each}
</div>

<style>
    .operator{
        background-image:none;
        background-color:orange;
        border-color:orangered;
        height:min-content;
    }
</style>