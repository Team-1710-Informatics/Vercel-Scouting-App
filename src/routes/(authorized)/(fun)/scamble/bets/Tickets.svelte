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
            <div class="w-64 h-0"/>
            {#each tickets as ticket}
                <Ticket {ticket}/>
            {:else}
                <p class="opacity-50 p-3">No bets were found</p>
            {/each}
        </div>
    </div>
{/if}

<button class="rounded-t-none border-t-0 border-white bg-gradient-to-t from-slate-700 to-slate-800 w-60" on:click={()=>{show=true}}>My bets</button>
