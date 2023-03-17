<script>
    import { slide } from "svelte/transition";
    import check from "$lib/assets/icons/check.svg";
    import x from "$lib/assets/icons/x-lg.svg";

    export let state;
    export let answers={};

    let questions = [
        {q:"Completely left starting area during AUTO?", name:"mobile", answer:null, time:153},
        {q:"Was your robot fully on CHARGING STATION at end of AUTO?", name:"dockedAuto", answer:null, time:138},
        {q:"Was the CHARGING STATION balanced at the end of AUTO?", name:"engageAuto", answer:null, time:138,dependent:"dockedAuto"},
        {q:"Was your robot fully on CHARGING STATION at end of MATCH?", name:"dockedMatch", answer:null, time:0},
        {q:"Was the CHARGING STATION balanced at end of MATCH?", name:"engageMatch", answer:null, time:0, dependent:"dockedMatch"},
        {q:"Robot parked in starting area at end of MATCH?", name:"parked", answer:null, time:0, exclusive:"dockedMatch"},
    ]

    $: {
        questions.forEach(query=>{
            if(query?.exclusive){
                if(answers[query?.exclusive]===true){
                    query.answer = false; 
                }
            }
            if(query?.dependent){
                if(answers[query?.dependent]===false){
                    query.answer = false; 
                }
            }
            answers[query.name] = query.answer;
            answers = answers
        })
    }

    let showAnswered = false;
</script>

<div class="box divide-gray-300 divide-y" style="max-width:97%;">
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
                <p class="col-span-3 px-1 text-start text-sm h-10">{query.q}</p>
                <div class="flex flex-row gap-0 justify-items-start">
                    <button on:click={()=>{query.answer = true ;}} disabled={query.answer===true ||!state.started} class="text-center w-10 h-10 bg-gradient-to-tr from-emerald-500 to-violet-400 border-cyan-600 rounded-r-none rounded-l-full">
                        <center><img style="filter:invert(100%)" width=20px src={check} alt="Y"/></center>
                    </button>
                    <button on:click={()=>{query.answer = false;}} disabled={query.answer===false||!state.started} class="text-center w-10 h-10 bg-gradient-to-tl from-rose-400 to-amber-300 border-rose-500 rounded-l-none rounded-r-full text-black">
                        <center><img style="filter:invert(100%)" width=20px src={x} alt="N"/></center>
                    </button>
                </div>
            </div>
        {/if}
    {/each}
</div>