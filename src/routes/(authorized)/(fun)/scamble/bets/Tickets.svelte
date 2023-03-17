<script>
    import { fly, slide } from "svelte/transition";
    import Ticket from "./Ticket.svelte";

    export let tickets;

    let show = false;
</script>

{#if show}
    <div class="fixed top-0 left-0 flex flex-row w-full z-10">
        <div on:click={()=>{show=false}} class="bg-white opacity-50 m-0 flex-grow" style="height:100vh;"/>
        <div class="bg-slate-800 overflow-y-scroll" style="height:100vh" transition:fly={{x:200}}>
            <p class="p-3 font-bold text-xl">Your bets</p>
            {#each tickets as ticket}
                <Ticket {ticket}/>
            {/each}
        </div>
    </div>
{/if}

<button on:click={()=>{show=true}}>My bets</button>
