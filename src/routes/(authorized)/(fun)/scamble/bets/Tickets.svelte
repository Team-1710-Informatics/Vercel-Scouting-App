<script>
    import { fly, fade } from "svelte/transition";
    import Ticket from "./Ticket.svelte";

    export let tickets;

    let show = false;
</script>

{#if show}
    <div transition:fade on:click={()=>{show=false}} on:keydown={e=>{show=false}} class="bg-white opacity-50 m-0 fixed top-0 z-50" style="height:100vh; width:100vw"/>
    <div class="bg-slate-800 overflow-y-scroll fixed right-0 top-0 z-50" style="height:100vh" transition:fly={{x:200}}>
        <p class="p-3 font-bold text-xl">Your bets</p>
        <div class="w-64 h-0"/>
        {#each tickets as ticket}
            <Ticket {ticket}/>
        {:else}
            <p class="opacity-50 p-3">No bets were found</p>
        {/each}
    </div>
{/if}

<button class="rounded-lg my-2 bg-gradient-to-br from-slate-800 to-slate-900 w-60" on:click={()=>{show=true}}>My bets</button>
