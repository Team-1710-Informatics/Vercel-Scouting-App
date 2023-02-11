<script>
    import { slide } from "svelte/transition";
    import check from "$lib/assets/icons/check.svg";
    import x from "$lib/assets/icons/x.svg";

    export let state;

    let questions = [
        {q:"Completely left COMMUNITY during AUTO?", name:"mobile", answer:null, time:153},
        {q:"Robot DOCKED at end of AUTO?", name:"docked-auto", answer:null, time:138},
        {q:"CHARGING STATION ENGAGED at end of AUTO?", name:"engaged-auto", answer:null, time:138},
        {q:"Robot DOCKED at end of MATCH?", name:"docked-match", answer:null, time:0},
        {q:"CHARGING STATION ENGAGED at end of MATCH?", name:"engaged-match", answer:null, time:0},
        {q:"Robot PARKED in COMMUNITY at end of MATCH?", name:"parked", answer:null, time:0, exclusive:"docked-match"},
    ]

    let output = {};
    $: {
        questions.forEach(query=>{
            if(query?.exclusive){
                if(output[query?.exclusive]===true){
                    query.answer = false;
                }
            }
            output[query.name] = query.answer;
        })
    }

    let showAnswered = false;
</script>

<div class="box divide-gray-300 divide-y" style="max-width:90%;">
    <div class="grid grid-cols-2">
        <p>Questions</p>
        <label class="text-xs mt-1">
            <input type="checkbox" bind:checked={showAnswered}>
            Show Answered
        </label>
    </div>
    {#each questions as query (query.name)}
        {#if (query.answer === null || showAnswered) && state.time <= query.time && output[query?.exclusive] != true}
            <div class="grid grid-cols-4 p-1" transition:slide class:opacity-50={!state.started}>
                <p class="col-span-3 px-1 text-start text-sm h-10">{query.q}</p>
                <div class="flex flex-row gap-0 justify-items-start">
                    <button on:click={()=>{query.answer = true ;}} disabled={query.answer===true ||!state.started}  class="text-center w-10 h-10 bg-gradient-to-tr from-emerald-500 to-violet-400 border-cyan-600 rounded-r-none rounded-l-full"><center><img style="filter:invert(100%)" width=20px src={check} alt="Y"/></center></button>
                    <button on:click={()=>{query.answer = false;}} disabled={query.answer===false||!state.started} class="text-center w-10 h-10 bg-gradient-to-tl from-rose-400 to-amber-300 border-rose-500 rounded-l-none rounded-r-full text-black"><center><img style="filter:invert(100%)" width=20px src={x}     alt="N"/></center></button>
                </div>
            </div>
        {/if}
    {/each}
</div>