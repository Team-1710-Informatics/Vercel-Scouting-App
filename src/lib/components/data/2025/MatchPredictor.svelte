<script>
    import { ApiService } from '$lib/components/data/2025/MatchPredictor.js'

    export let event
    export let teams

    let data
    // data = {"matches":[{"red":0,"blue":7,"winner":"red"},{"red":1,"blue":6,"winner":"red"},{"red":2,"blue":5,"winner":"red"},{"red":3,"blue":4,"winner":"blue"},{"red":7,"blue":6,"winner":"red"},{"red":5,"blue":4,"winner":"blue"},{"red":0,"blue":1,"winner":"red"},{"red":2,"blue":3,"winner":"red"},{"red":5,"blue":1,"winner":"blue"},{"red":7,"blue":3,"winner":"red"},{"red":0,"blue":2,"winner":"red"},{"red":5,"blue":7,"winner":"blue"},{"red":2,"blue":5,"winner":"red"},{"red":0,"blue":2,"winner":"red"}],"teams":[["frc7021","frc2129","frc9576"],["frc1710","frc2194","frc967"],["frc8802","frc4230","frc537"],["frc2704","frc7103","frc1675"],["frc2830","frc525","frc8701"],["frc2826","frc1625","frc5586"],["frc6166","frc3082","frc171"],["frc5903","frc6223","frc2202"]]}

    async function eventPrediciton(){
        // const response = await ApiService.event(event)
        // data = await response
        data = {"matches":[{"red":0,"blue":7,"winner":"red"},{"red":1,"blue":6,"winner":"red"},{"red":2,"blue":5,"winner":"red"},{"red":3,"blue":4,"winner":"blue"},{"red":7,"blue":6,"winner":"red"},{"red":5,"blue":4,"winner":"blue"},{"red":0,"blue":1,"winner":"red"},{"red":2,"blue":3,"winner":"red"},{"red":5,"blue":1,"winner":"blue"},{"red":7,"blue":3,"winner":"red"},{"red":0,"blue":2,"winner":"red"},{"red":5,"blue":7,"winner":"blue"},{"red":2,"blue":5,"winner":"red"},{"red":0,"blue":2,"winner":"red"}],"teams":[["frc7021","frc2129","frc9576"],["frc1710","frc2194","frc967"],["frc8802","frc4230","frc537"],["frc2704","frc7103","frc1675"],["frc2830","frc525","frc8701"],["frc2826","frc1625","frc5586"],["frc6166","frc3082","frc171"],["frc5903","frc6223","frc2202"]]}
    }

    async function teamPrediciton(){
        const response = await ApiService.team(teams)
        data = await response
    }

    let x = -430;
    let y = -156;
    let scale = 0.3;
    let dragging = false;
    let startX, startY;

    function handleMouseDown(event) {
        dragging = true;
        startX = (event.clientX - x);
        startY = (event.clientY - y);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    }

    function handleMouseMove(event) {
        if (dragging) {
            x = (event.clientX) - startX;
            y = (event.clientY) - startY;
        }
    }

    function handleMouseUp() {
        dragging = false;
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    }

    function resetPosition() {
        x = -430;
        y = -156;
    }

    function increaseScale() {
        scale = Math.min(1.0, scale + 0.05);
    }

    function decreaseScale() {
        scale = Math.max(0.1, scale - 0.05);
    }

    export let width, height;
</script>
<div style="height: 300px; width: 600px;">
    <div class="flex flex-row mb-4" style="width: 600px;">
        <button on:click={resetPosition}>Reset</button>
        <button on:click={decreaseScale}>-</button>
        <input type="range" min="0.1" max="1.0" step="0.001" bind:value={scale} />
        <button on:click={increaseScale}>+</button>
        <div class="grow"></div>
        <button on:click={eventPrediciton}>Event</button>
        <button on:click={teamPrediciton}>Teams</button>
    </div>
    <div class="draggable-container border-8 border-black rounded-3xl overflow-hidden relative">
        {#if data}
            <div
                 class="wrapper draggable"
                 style="top: {y}px; left: {x}px; scale: {scale*100}%"
                 on:mousedown={handleMouseDown}
            >
                <div class="item">
                    <div class="item-parent">
                        <div class="display">
                            <div class="font-bold text-lg">Finals</div>
                            {#if data.matches[13].winner === "red"}
                                <div class="red-win">
                                    {#each data.teams[data.matches[13].red] as team, i}
                                        {team}{#if i < 2}, {/if}
                                    {/each}
                                </div>
                                <div class="blue-glow">
                                    {#each data.teams[data.matches[13].blue] as team, i}
                                        {team}{#if i < 2}, {/if}
                                    {/each}
                                </div>
                            {:else}
                                <div class="red-glow">
                                    {#each data.teams[data.matches[13].red] as team, i}
                                        {team}{#if i < 2}, {/if}
                                    {/each}
                                </div>
                                <div class="blue-win">
                                    {#each data.teams[data.matches[13].blue] as team, i}
                                        {team}{#if i < 2}, {/if}
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    </div>
                    <div class="item-childrens">
                        <div class="item-child">
                            <div class="item">
                                <div class="item-parent">
                                    <div class="display">
                                        <div class="font-bold text-lg">Match 11</div>
                                        {#if data.matches[10].winner === "red"}
                                            <div class="red-win">
                                                {#each data.teams[data.matches[10].red] as team, i}
                                                    {team}{#if i < 2}, {/if}
                                                {/each}
                                            </div>
                                            <div class="blue-glow">
                                                {#each data.teams[data.matches[10].blue] as team, i}
                                                    {team}{#if i < 2}, {/if}
                                                {/each}
                                            </div>
                                        {:else}
                                            <div class="red-glow">
                                                {#each data.teams[data.matches[10].red] as team, i}
                                                    {team}{#if i < 2}, {/if}
                                                {/each}
                                            </div>
                                            <div class="blue-win">
                                                {#each data.teams[data.matches[10].blue] as team, i}
                                                    {team}{#if i < 2}, {/if}
                                                {/each}
                                            </div>
                                        {/if}
                                    </div>
                                </div>
                                <div class="item-childrens">
                                    <div class="item-child">
                                        <div class="item">
                                            <div class="item-parent">
                                                <div class="display">
                                                    <div class="font-bold text-lg">Match 7</div>
                                                    {#if data.matches[6].winner === "red"}
                                                        <div class="red-win">
                                                            {#each data.teams[data.matches[6].red] as team, i}
                                                                {team}{#if i < 2}, {/if}
                                                            {/each}
                                                        </div>
                                                        <div class="blue-glow">
                                                            {#each data.teams[data.matches[6].blue] as team, i}
                                                                {team}{#if i < 2}, {/if}
                                                            {/each}
                                                        </div>
                                                    {:else}
                                                        <div class="red-glow">
                                                            {#each data.teams[data.matches[6].red] as team, i}
                                                                {team}{#if i < 2}, {/if}
                                                            {/each}
                                                        </div>
                                                        <div class="blue-win">
                                                            {#each data.teams[data.matches[6].blue] as team, i}
                                                                {team}{#if i < 2}, {/if}
                                                            {/each}
                                                        </div>
                                                    {/if}
                                                </div>
                                            </div>
                                            <div class="item-childrens">
                                                <div class="item-child">
                                                    <div class="display">
                                                        <div class="font-bold text-lg">Match 1</div>
                                                        {#if data.matches[0].winner === "red"}
                                                            <div class="red-win">
                                                                {#each data.teams[data.matches[0].red] as team, i}
                                                                    {team}{#if i < 2}, {/if}
                                                                {/each}
                                                            </div>
                                                            <div class="blue-glow">
                                                                {#each data.teams[data.matches[0].blue] as team, i}
                                                                    {team}{#if i < 2}, {/if}
                                                                {/each}
                                                            </div>
                                                        {:else}
                                                            <div class="red-glow">
                                                                {#each data.teams[data.matches[0].red] as team, i}
                                                                    {team}{#if i < 2}, {/if}
                                                                {/each}
                                                            </div>
                                                            <div class="blue-win">
                                                                {#each data.teams[data.matches[0].blue] as team, i}
                                                                    {team}{#if i < 2}, {/if}
                                                                {/each}
                                                            </div>
                                                        {/if}
                                                    </div>
                                                </div>
                                                <div class="item-child">
                                                    <div class="display">
                                                        <div class="font-bold text-lg">Match 2</div>
                                                        {#if data.matches[1].winner === "red"}
                                                            <div class="red-win">
                                                                {#each data.teams[data.matches[1].red] as team, i}
                                                                    {team}{#if i < 2}, {/if}
                                                                {/each}
                                                            </div>
                                                            <div class="blue-glow">
                                                                {#each data.teams[data.matches[1].blue] as team, i}
                                                                    {team}{#if i < 2}, {/if}
                                                                {/each}
                                                            </div>
                                                        {:else}
                                                            <div class="red-glow">
                                                                {#each data.teams[data.matches[1].red] as team, i}
                                                                    {team}{#if i < 2}, {/if}
                                                                {/each}
                                                            </div>
                                                            <div class="blue-win">
                                                                {#each data.teams[data.matches[1].blue] as team, i}
                                                                    {team}{#if i < 2}, {/if}
                                                                {/each}
                                                            </div>
                                                        {/if}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item-child">
                                        <div class="item">
                                            <div class="item-parent">
                                                <div class="display">
                                                    <div class="font-bold text-lg">Match 8</div>
                                                    {#if data.matches[7].winner === "red"}
                                                        <div class="red-win">
                                                            {#each data.teams[data.matches[7].red] as team, i}
                                                                {team}{#if i < 2}, {/if}
                                                            {/each}
                                                        </div>
                                                        <div class="blue-glow">
                                                            {#each data.teams[data.matches[7].blue] as team, i}
                                                                {team}{#if i < 2}, {/if}
                                                            {/each}
                                                        </div>
                                                    {:else}
                                                        <div class="red-glow">
                                                            {#each data.teams[data.matches[7].red] as team, i}
                                                                {team}{#if i < 2}, {/if}
                                                            {/each}
                                                        </div>
                                                        <div class="blue-win">
                                                            {#each data.teams[data.matches[7].blue] as team, i}
                                                                {team}{#if i < 2}, {/if}
                                                            {/each}
                                                        </div>
                                                    {/if}
                                                </div>
                                            </div>
                                            <div class="item-childrens">
                                                <div class="item-child">
                                                    <div class="display">
                                                        <div class="font-bold text-lg">Match 3</div>
                                                        {#if data.matches[2].winner === "red"}
                                                            <div class="red-win">
                                                                {#each data.teams[data.matches[2].red] as team, i}
                                                                    {team}{#if i < 2}, {/if}
                                                                {/each}
                                                            </div>
                                                            <div class="blue-glow">
                                                                {#each data.teams[data.matches[2].blue] as team, i}
                                                                    {team}{#if i < 2}, {/if}
                                                                {/each}
                                                            </div>
                                                        {:else}
                                                            <div class="red-glow">
                                                                {#each data.teams[data.matches[2].red] as team, i}
                                                                    {team}{#if i < 2}, {/if}
                                                                {/each}
                                                            </div>
                                                            <div class="blue-win">
                                                                {#each data.teams[data.matches[2].blue] as team, i}
                                                                    {team}{#if i < 2}, {/if}
                                                                {/each}
                                                            </div>
                                                        {/if}
                                                    </div>
                                                </div>
                                                <div class="item-child">
                                                    <div class="display">
                                                        <div class="font-bold text-lg">Match 4</div>
                                                        {#if data.matches[3].winner === "red"}
                                                            <div class="red-win">
                                                                {#each data.teams[data.matches[3].red] as team, i}
                                                                    {team}{#if i < 2}, {/if}
                                                                {/each}
                                                            </div>
                                                            <div class="blue-glow">
                                                                {#each data.teams[data.matches[3].blue] as team, i}
                                                                    {team}{#if i < 2}, {/if}
                                                                {/each}
                                                            </div>
                                                        {:else}
                                                            <div class="red-glow">
                                                                {#each data.teams[data.matches[3].red] as team, i}
                                                                    {team}{#if i < 2}, {/if}
                                                                {/each}
                                                            </div>
                                                            <div class="blue-win">
                                                                {#each data.teams[data.matches[3].blue] as team, i}
                                                                    {team}{#if i < 2}, {/if}
                                                                {/each}
                                                            </div>
                                                        {/if}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item-child">
                            <div class="item">
                                <div class="item-parent">
                                    <div class="display">
                                        <div class="font-bold text-lg">Match 13</div>
                                        {#if data.matches[12].winner === "red"}
                                            <div class="red-win">
                                                {#each data.teams[data.matches[12].red] as team, i}
                                                    {team}{#if i < 2}, {/if}
                                                {/each}
                                            </div>
                                            <div class="blue-glow">
                                                {#each data.teams[data.matches[12].blue] as team, i}
                                                    {team}{#if i < 2}, {/if}
                                                {/each}
                                            </div>
                                        {:else}
                                            <div class="red-glow">
                                                {#each data.teams[data.matches[12].red] as team, i}
                                                    {team}{#if i < 2}, {/if}
                                                {/each}
                                            </div>
                                            <div class="blue-win">
                                                {#each data.teams[data.matches[12].blue] as team, i}
                                                    {team}{#if i < 2}, {/if}
                                                {/each}
                                            </div>
                                        {/if}
                                    </div>
                                </div>
                                <div class="item-childrens">
                                    <div class="item-child">
                                        <div class="item-child">
                                            <div class="item">
                                                <div class="item-parent">
                                                    <div class="display">
                                                        <div class="font-bold text-lg">Match 12</div>
                                                        {#if data.matches[11].winner === "red"}
                                                            <div class="red-win">
                                                                {#each data.teams[data.matches[11].red] as team, i}
                                                                    {team}{#if i < 2}, {/if}
                                                                {/each}
                                                            </div>
                                                            <div class="blue-glow">
                                                                {#each data.teams[data.matches[11].blue] as team, i}
                                                                    {team}{#if i < 2}, {/if}
                                                                {/each}
                                                            </div>
                                                        {:else}
                                                            <div class="red-glow">
                                                                {#each data.teams[data.matches[11].red] as team, i}
                                                                    {team}{#if i < 2}, {/if}
                                                                {/each}
                                                            </div>
                                                            <div class="blue-win">
                                                                {#each data.teams[data.matches[11].blue] as team, i}
                                                                    {team}{#if i < 2}, {/if}
                                                                {/each}
                                                            </div>
                                                        {/if}
                                                    </div>
                                                </div>
                                                <div class="item-childrens">
                                                    <div class="item-child">
                                                        <div class="item">
                                                            <div class="item-parent">
                                                                <div class="display">
                                                                    <div class="font-bold text-lg">Match 10</div>
                                                                    {#if data.matches[9].winner === "red"}
                                                                        <div class="red-win">
                                                                            {#each data.teams[data.matches[9].red] as team, i}
                                                                                {team}{#if i < 2}, {/if}
                                                                            {/each}
                                                                        </div>
                                                                        <div class="blue-glow">
                                                                            {#each data.teams[data.matches[9].blue] as team, i}
                                                                                {team}{#if i < 2}, {/if}
                                                                            {/each}
                                                                        </div>
                                                                    {:else}
                                                                        <div class="red-glow">
                                                                            {#each data.teams[data.matches[9].red] as team, i}
                                                                                {team}{#if i < 2}, {/if}
                                                                            {/each}
                                                                        </div>
                                                                        <div class="blue-win">
                                                                            {#each data.teams[data.matches[9].blue] as team, i}
                                                                                {team}{#if i < 2}, {/if}
                                                                            {/each}
                                                                        </div>
                                                                    {/if}
                                                                </div>
                                                            </div>
                                                            <div class="item-childrens">
                                                                <div class="item-child">
                                                                    <div class="display">
                                                                        <div class="font-bold text-lg">Match 5</div>
                                                                        {#if data.matches[4].winner === "red"}
                                                                            <div class="red-win">
                                                                                {#each data.teams[data.matches[4].red] as team, i}
                                                                                    {team}{#if i < 2}, {/if}
                                                                                {/each}
                                                                            </div>
                                                                            <div class="blue-glow">
                                                                                {#each data.teams[data.matches[4].blue] as team, i}
                                                                                    {team}{#if i < 2}, {/if}
                                                                                {/each}
                                                                            </div>
                                                                        {:else}
                                                                            <div class="red-glow">
                                                                                {#each data.teams[data.matches[4].red] as team, i}
                                                                                    {team}{#if i < 2}, {/if}
                                                                                {/each}
                                                                            </div>
                                                                            <div class="blue-win">
                                                                                {#each data.teams[data.matches[4].blue] as team, i}
                                                                                    {team}{#if i < 2}, {/if}
                                                                                {/each}
                                                                            </div>
                                                                        {/if}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item-child">
                                                        <div class="item">
                                                            <div class="item-parent">
                                                                <div class="display">
                                                                    <div class="font-bold text-lg">Match 9</div>
                                                                    {#if data.matches[8].winner === "red"}
                                                                        <div class="red-win">
                                                                            {#each data.teams[data.matches[8].red] as team, i}
                                                                                {team}{#if i < 2}, {/if}
                                                                            {/each}
                                                                        </div>
                                                                        <div class="blue-glow">
                                                                            {#each data.teams[data.matches[8].blue] as team, i}
                                                                                {team}{#if i < 2}, {/if}
                                                                            {/each}
                                                                        </div>
                                                                    {:else}
                                                                        <div class="red-glow">
                                                                            {#each data.teams[data.matches[8].red] as team, i}
                                                                                {team}{#if i < 2}, {/if}
                                                                            {/each}
                                                                        </div>
                                                                        <div class="blue-win">
                                                                            {#each data.teams[data.matches[8].blue] as team, i}
                                                                                {team}{#if i < 2}, {/if}
                                                                            {/each}
                                                                        </div>
                                                                    {/if}
                                                                </div>
                                                            </div>
                                                            <div class="item-childrens">
                                                                <div class="item-child">
                                                                    <div class="display">
                                                                        <div class="font-bold text-lg">Match 6</div>
                                                                        {#if data.matches[5].winner === "red"}
                                                                            <div class="red-win">
                                                                                {#each data.teams[data.matches[5].red] as team, i}
                                                                                    {team}{#if i < 2}, {/if}
                                                                                {/each}
                                                                            </div>
                                                                            <div class="blue-glow">
                                                                                {#each data.teams[data.matches[5].blue] as team, i}
                                                                                    {team}{#if i < 2}, {/if}
                                                                                {/each}
                                                                            </div>
                                                                        {:else}
                                                                            <div class="red-glow">
                                                                                {#each data.teams[data.matches[5].red] as team, i}
                                                                                    {team}{#if i < 2}, {/if}
                                                                                {/each}
                                                                            </div>
                                                                            <div class="blue-win">
                                                                                {#each data.teams[data.matches[5].blue] as team, i}
                                                                                    {team}{#if i < 2}, {/if}
                                                                                {/each}
                                                                            </div>
                                                                        {/if}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>
<style lang="scss">
    $side-margin: 50px;
    $vertical-margin: 10px;

    .wrapper{
        display: flex;
        height: 600px;
        justify-content: center;
    }

    .item{
        display: flex;
        flex-direction: row-reverse;
        .display{
            width: 250px;
            padding: 10px;
            margin: 0;
            border: black 4px solid;
            border-radius: 10px;
            background-color: rgba(34, 34, 34, 0.35);
            box-shadow: #060606 2px 2px 10px;
        }

        &-parent{
            position: relative;
            margin-left: $side-margin;
            display: flex;
            align-items: center;
            &:after{
                position: absolute;
                content: '';
                width: $side-margin/2;
                height: 2px;
                left: 0;
                top: 50%;
                background-color: #fff;
                transform: translateX(-100%);
            }
        }
        &-childrens{
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        &-child{
            display: flex;
            align-items: flex-start;
            justify-content: flex-end;
            margin-top: $vertical-margin;
            margin-bottom: $vertical-margin;
            position: relative;
            &:before{
                content: '';
                position: absolute;
                background-color: #fff;
                right: 0;
                top: 50%;
                transform: translateX(100%);
                width: 25px;
                height: 2px;
            }
            &:after{
                content: '';
                position: absolute;
                background-color: #fff;
                right: -$side-margin / 2;
                height: calc(50% + 22px) ;
                width: 2px;
                top: 50%;
            }
            &:last-child{
                &:after{
                    transform: translateY(-100%);
                }
            }
            &:only-child:after{
                display: none;
            }
        }
    }
    .red-glow{
         text-shadow: 0 0 30px #f00;
         color: rgba(255, 255, 255, 0.4);
    }
    .red-win{
         text-shadow: 0 0 5px #fff, 0 0 10px #f00, 0 0 20px #f00, 0 0 30px #f00 , 0 0 40px #f00 , 0 0 50px #f00, 0 0 60px #f00, 0 0 70px #f00;
    }
    .blue-glow{
        text-shadow: 0 0 30px #00f;
        color: rgba(255, 255, 255, 0.4);
    }
    .blue-win{
        text-shadow: 0 0 5px #fff, 0 0 10px #00f, 0 0 20px #00f, 0 0 30px #00f , 0 0 40px #00f , 0 0 50px #00f, 0 0 60px #00f, 0 0 70px #00f;
    }
    .draggable {
        user-select: none; /* Prevents text selection */
        -webkit-user-select: none; /* For Safari */
        -moz-user-select: none; /* For Firefox */
        -ms-user-select: none; /* For older IE */
        position: absolute;
        cursor: grab;
    }
    .draggable-container{
        background-color: rgba(0, 0, 0, 0.2);
        box-shadow: inset 0 20px 40px 0 rgb(0 0 0 / 0.5);
        width: 100%;
        height: 100%;
    }
</style>