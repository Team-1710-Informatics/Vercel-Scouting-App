<script>
    import Teach from './Teach.svelte'

    import teamKeys from '../../(api)/api/key/team/info.js'
    import eventKeys from '../../(api)/api/key/event/info.js'

    import teams from '../../(api)/api/frc[team]/info.js'

    import event from '../../(api)/api/[event=eventKey]/info.js'
    import eventTeam from '../../(api)/api/[event=eventKey]/frc[team]/info.js'
    import match from '../../(api)/api/[event=eventKey]/[match]/info.js'
    import matchTeam from '../../(api)/api/[event=eventKey]/[match]/frc[team]/info.js'

    import arrow from '$lib/assets/icons/caret.svg'
    import { slide } from 'svelte/transition'

    const eventRoutes = [event, eventTeam, match, matchTeam]
    const teamRoutes = [teams]
    const keys = [teamKeys, eventKeys]
</script>

<center>
    <div>
        <span style="font-size:xx-large;"
            ><u><strong>Scouting API</strong></u></span
        >
        <p style="width: 50vw" class="box box-extension">
            The Team 1710 scouting API is a web-based API that allows access to
            viewing of scouting data. You can integrate scouting information
            into your own applications via HTTP request.
        </p>
        <br />
        <h1>Parameters</h1>
        <p style="width: 50vw" class="box box-extension">
            With each HTTP request for scouting data, the parameters and result
            is explained below. Each parameter is shown/explained in curly
            brackets.
        </p>
        <br />
        <Teach {arrow} newBox="newBox" />
        <h1 style="font-size:larger;">Server:</h1>
        <strong style="color:beige;">www.scouting.team1710.com/api</strong
        >

        <h1 style="font-size:x-large;">Event</h1>
        {#each eventRoutes as route}
            <button
                on:click={() => {
                    route.checked = !route?.checked
                }}
                class="event-route"
            >
                <img
                    src={arrow}
                    style={route?.checked ? '' : 'transform:rotate(-90deg);'}
                    alt=""
                />
                {route.url}
            </button>
            {#if route?.checked}
                <div class="extended" transition:slide>
                    {route.desc}
                    <br />
                    <u>Example route:</u>
                    <div class="urlEx">
                        {route.ex}
                    </div>
                </div>
            {/if}
        {/each}

        <h1 style="font-size:x-large;">Team</h1>
        {#each teamRoutes as route}
            <button
                on:click={() => {
                    route.checked = !route?.checked
                }}
                class="team-route"
            >
                <img
                    src={arrow}
                    style={route?.checked ? '' : 'transform:rotate(-90deg);'}
                    alt=""
                />
                {route.url}
            </button>
            {#if route?.checked}
                <div class="extended" transition:slide>
                    {route.desc}
                    <br />
                    <u>Example route:</u>
                    <div class="urlEx">
                        {route.ex}
                    </div>
                </div>
            {/if}
        {/each}

        <h1 style="font-size:x-large;">Keys</h1>
        {#each keys as route}
            <button
                on:click={() => {
                    route.checked = !route?.checked
                }}
                class="key-route"
            >
                <img
                    src={arrow}
                    style={route?.checked ? '' : 'transform:rotate(-90deg);'}
                    alt=""
                />
                {route.url}
            </button>
            {#if route?.checked}
                <div class="extended" transition:slide>
                    {route.desc}
                </div>
            {/if}
        {/each}
    </div>
</center>

<style>
    .event-route {
        margin-top: 1vh;
        margin-bottom: 0px;
        border-width: 4px;
        border-radius: 15px;
        border-color: white;
        width: 80vw;
        font-size: x-large;
        font-weight: 700;
        color: beige;
        background-color: rgb(31, 75, 118);
        background-image: none;
        box-shadow: 10px 5px 5px rgb(39, 43, 48);
    }
    .team-route {
        margin-top: 1vh;
        margin-bottom: 0px;
        border-radius: 15px;
        border-color: white;
        border-width: 4px;
        width: 80vw;
        font-size: x-large;
        font-weight: 700;
        color: beige;
        background-color: rgb(15, 25, 111);
        background-image: none;
        box-shadow: 10px 5px 5px rgb(39, 43, 48);
    }
    .key-route {
        margin-top: 1vh;
        margin-bottom: 0px;
        border-radius: 15px;
        border-color: white;
        border-width: 4px;
        width: 80vw;
        font-size: x-large;
        font-weight: 700;
        color: beige;
        background-color: rgb(76, 16, 75);
        background-image: none;
        box-shadow: 10px 5px 5px rgb(39, 43, 48);
    }
    .extended {
        border-width: 4px;
        border-radius: 10px;
        border-top: none;
        border-color: white;
        width: 75vw;
        padding: 2vw;
        background-color: rgb(69, 116, 162);
        box-shadow: 10px 2px 5px rgb(39, 43, 48);
    }
    .urlEx {
        border-width: 2px; /*route.ex which shows an example route*/
        background-color: black;
        padding: 2vh;
        color: yellow;
    }
    .box-extension {
        border-width: 4px;
        box-shadow: 10px 7px 5px rgb(39, 43, 48);
    }
</style>
