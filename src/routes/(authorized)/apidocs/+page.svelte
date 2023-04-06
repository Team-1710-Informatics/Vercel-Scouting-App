<script>
    import teams from "../../(api)/api/frc[team]/info.js";
    import event from "../../(api)/api/[event=eventKey]/info.js";
    import eventTeam from "../../(api)/api/[event=eventKey]/frc[team]/info.js";
    import match from "../../(api)/api/[event=eventKey]/[match]/info.js";
    import matchTeam from "../../(api)/api/[event=eventKey]/[match]/frc[team]/info.js";
    import arrow from "$lib/assets/icons/caret.svg";
    import { slide } from 'svelte/transition';

    const eventRoutes = [
        event,
        eventTeam,
        match,
        matchTeam,
    ]
    const teamRoutes = [
        teams,
    ]
</script>
<center>
<div>
    <span style="font-size:xx-large;"><u>Scouting API</u></span>
    <p>
        The scouting API allows access to viewing of scouting data.
    </p>
    <h1>Event</h1>
    {#each eventRoutes as route}
        <button on:click={route.checked=!route?.checked}>
            <div class="event-route"> 
            <img src={arrow} style='align-items: center; {route?.checked?"":"transform:rotate(-90deg);"}' alt="">
                {route.url}
            </div>
        </button>
        {#if route?.checked}
            this route
        {/if}
        <br>
    {/each}
    <h1>Team</h1>
    {#each teamRoutes as route}
        <button>
            <img src={arrow} alt="">
            <div class="team-route"> 
                <!-- {condition?if_true:if_false} -->
                {route.url}
            </div>
        </button>
        <br>
    {/each}
</div>
</center>

<style>
    .event-route{
        border-radius: 3px;
        border: 3px white;
        width: 80vw;
        font-size:x-large;
        font-weight:700;
        background-color:indigo;
    }
    .team-route{
        border-radius: 3px;
        border: 3px white;
        width: 80vw;
        font-size:x-large;
        font-weight:700;
        background-color:black;
    }
</style>