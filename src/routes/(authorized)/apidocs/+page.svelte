<script>
    import teams from "../../(api)/api/frc[team]/info.js";
    import event from "../../(api)/api/[event=eventKey]/info.js";
    import eventTeam from "../../(api)/api/[event=eventKey]/frc[team]/info.js";
    import match from "../../(api)/api/[event=eventKey]/[match]/info.js";
    import matchTeam from "../../(api)/api/[event=eventKey]/[match]/frc[team]/info.js";

    const routes = [
        teams,
        event,
        eventTeam,
        match,
        matchTeam,
    ]
</script>
<center>
<div>
    <h1>Scouting API</h1>
    <p>
        The scouting API allows access to viewing of scouting data.
    </p>
    {#each routes as route}
        <button>
            <img src="$lib/assets/icons/arrowDown.svg" alt="">
            <span class="route"> 
                <!-- {condition?if_true:if_false} -->
                {route.url}
            </span>
        </button>
        <br>
    {/each}
</div>
</center>

<style>
    .route{
        border-radius: 3px;
        border: 3px white;
        width: 80vw;
    }
</style>