<script>
    import arrowDown from "$lib/assets/icons/arrowDown.svg";
    import arrowRight from "$lib/assets/icons/arrowRight.svg";
    import match from "../api/[event=eventKey]/[match]/+server.js";
    import matchTeam from "../api/[event=eventKey]/frc[team]/+server.js";
    import { slide } from "svelte/transition";
    let routes = [
        match,
        matchTeam
    ]
</script>

<!-- <svelte:head><p class="bg-blue-500">API Routes</p></svelte:head> -->

<middle>
    <b style="font-size:x-large;">Team 1710 Scouting App API</b>
    <p>The Team 1710 API base path is team1710scouting.vercel.app/api</p>
    <!-- each route description is a component -->
    <span>
        {#each routes as route}
            <center>
                <button class="flex flex-row text-sky-400 font-sans capsulate" style="background-image:none;" on:click={()=>{route.checked = !route?.checked;}}>
                    <img class="mr-1" style="filter:invert(100%)" src={route?.checked?arrowDown:arrowRight} alt="collapse"><b>{route.url}</b>
                    
                </button>
                {#if route?.checked}
                    <div transition:slide class="description" style="color:beige;">
                        {route.desc}
                    </div>
                {/if}
            </center>
        {/each}
    </span>
</middle>

<style>
    .capsulate {
        background-color: rgb(31 41 55);
        border-radius: 15px;
        border-width: 4px;
        padding-right: 10px;
        padding-left: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
        width: 80vw;
        text-align: center;
        margin-top: 1vh;
    }

    .description {
        background-color: rgb(31 41 55);
        border-color:rgb(29, 78, 216);;
        border-radius: 15px;
        border-width: 4px;
        border-top-width: 0px;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        padding-right: 10px;
        padding-left: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-top:0px;
        width: calc(80vw - 30px);
    }

    button.capsulate:hover {
        border-color: white;
    }
</style>
