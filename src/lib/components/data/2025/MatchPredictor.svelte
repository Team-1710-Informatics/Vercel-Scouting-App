<script>
    import { ApiService } from '$lib/components/data/2025/MatchPredictor.js'
    import flip from '$lib/assets/icons/flip.svg'
    import { onMount } from 'svelte'

    export let event
    export let teams

    let data
    // data = {"matches":[{"red":0,"blue":7,"winner":"red"},{"red":1,"blue":6,"winner":"red"},{"red":2,"blue":5,"winner":"red"},{"red":3,"blue":4,"winner":"blue"},{"red":7,"blue":6,"winner":"red"},{"red":5,"blue":4,"winner":"blue"},{"red":0,"blue":1,"winner":"red"},{"red":2,"blue":3,"winner":"red"},{"red":5,"blue":1,"winner":"blue"},{"red":7,"blue":3,"winner":"red"},{"red":0,"blue":2,"winner":"red"},{"red":5,"blue":7,"winner":"blue"},{"red":2,"blue":5,"winner":"red"},{"red":0,"blue":2,"winner":"red"}],"teams":[["frc7021","frc2129","frc9576"],["frc1710","frc2194","frc967"],["frc8802","frc4230","frc537"],["frc2704","frc7103","frc1675"],["frc2830","frc525","frc8701"],["frc2826","frc1625","frc5586"],["frc6166","frc3082","frc171"],["frc5903","frc6223","frc2202"]]}

    export async function eventPrediction(){
        const response = await ApiService.event(event)
        data = await response
        // data = {"matches":[{"red":0,"blue":7,"winner":"red"},{"red":1,"blue":6,"winner":"red"},{"red":2,"blue":5,"winner":"red"},{"red":3,"blue":4,"winner":"blue"},{"red":7,"blue":6,"winner":"red"},{"red":5,"blue":4,"winner":"blue"},{"red":0,"blue":1,"winner":"red"},{"red":2,"blue":3,"winner":"red"},{"red":5,"blue":1,"winner":"blue"},{"red":7,"blue":3,"winner":"red"},{"red":0,"blue":2,"winner":"red"},{"red":5,"blue":7,"winner":"blue"},{"red":2,"blue":5,"winner":"red"},{"red":0,"blue":2,"winner":"red"}],"teams":[["frc7021","frc2129","frc9576"],["frc1710","frc2194","frc967"],["frc8802","frc4230","frc537"],["frc2704","frc7103","frc1675"],["frc2830","frc525","frc8701"],["frc2826","frc1625","frc5586"],["frc6166","frc3082","frc171"],["frc5903","frc6223","frc2202"]]}
    }

    async function teamPrediction(){
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
    $: number = 0
    async function flipMatch(match) {
        data = await ApiService.flip(match, data)
    }

    let controlPanelHeight = 0;

    onMount(() => {
        const controlPanel = document.querySelector('.options');
        controlPanelHeight = controlPanel.offsetHeight;
    });
</script>
<div class="w-full basis-1/2">
    <div class="flex flex-row mb-2 options rounded-lg border-0 border-black">
        <button on:click={resetPosition}>Reset</button>
        <button on:click={decreaseScale}>-</button>
        <input type="range" min="0.1" max="1.0" step="0.001" bind:value={scale} />
        <button on:click={increaseScale}>+</button>
        <div class="grow"></div>
        <button on:click={eventPrediction}>Event</button>
        <button on:click={teamPrediction}>Teams</button>
    </div>
    <div class="draggable-container border-0 border-black rounded-lg overflow-hidden relative" style="height: calc(100% - 0.5rem - {controlPanelHeight}px); ">
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
                                <div class="red-win flex flex-row">
                                    {#each data.teams[data.matches[13].red] as team, i}
                                        {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                    {/each}
                                </div>
                                <button on:click={()=>{flipMatch(13)}} class="blue-glow flex flex-row">
                                    {#each data.teams[data.matches[13].blue] as team, i}
                                        {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                    {/each}
                                </button>
                            {:else}
                                <button on:click={()=>{flipMatch(13)}} class="red-glow flex flex-row">
                                    {#each data.teams[data.matches[13].red] as team, i}
                                        {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                    {/each}
                                </button>
                                <div class="blue-win flex flex-row">
                                    {#each data.teams[data.matches[13].blue] as team, i}
                                        {#if i < 3}{team}{#if i < 2}, {/if}{/if}
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
                                            <div class="red-win flex flex-row">
                                                {#each data.teams[data.matches[10].red] as team, i}
                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                {/each}
                                            </div>
                                            <button on:click={()=>{flipMatch(10)}} class="blue-glow flex flex-row">
                                                {#each data.teams[data.matches[10].blue] as team, i}
                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                {/each}
                                            </button>
                                        {:else}
                                            <button on:click={()=>{flipMatch(10)}} class="red-glow flex flex-row">
                                                {#each data.teams[data.matches[10].red] as team, i}
                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                {/each}
                                            </button>
                                            <div class="blue-win flex flex-row">
                                                {#each data.teams[data.matches[10].blue] as team, i}
                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
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
                                                        <div class="red-win flex flex-row">
                                                            {#each data.teams[data.matches[6].red] as team, i}
                                                                {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                            {/each}
                                                        </div>
                                                        <button on:click={()=>{flipMatch(6)}} class="blue-glow flex flex-row">
                                                            {#each data.teams[data.matches[6].blue] as team, i}
                                                                {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                            {/each}
                                                        </button>
                                                    {:else}
                                                        <button on:click={()=>{flipMatch(6)}} class="red-glow flex flex-row">
                                                            {#each data.teams[data.matches[6].red] as team, i}
                                                                {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                            {/each}
                                                        </button>
                                                        <div class="blue-win flex flex-row">
                                                            {#each data.teams[data.matches[6].blue] as team, i}
                                                                {#if i < 3}{team}{#if i < 2}, {/if}{/if}
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
                                                            <div class="red-win flex flex-row">
                                                                {#each data.teams[data.matches[0].red] as team, i}
                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                {/each}
                                                            </div>
                                                            <button on:click={()=>{flipMatch(0)}} class="blue-glow flex flex-row">
                                                                {#each data.teams[data.matches[0].blue] as team, i}
                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                {/each}
                                                            </button>
                                                        {:else}
                                                            <button on:click={()=>{flipMatch(0)}} class="red-glow flex flex-row">
                                                                {#each data.teams[data.matches[0].red] as team, i}
                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                {/each}
                                                            </button>
                                                            <div class="blue-win flex flex-row">
                                                                {#each data.teams[data.matches[0].blue] as team, i}
                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                {/each}
                                                            </div>
                                                        {/if}
                                                    </div>
                                                </div>
                                                <div class="item-child">
                                                    <div class="display">
                                                        <div class="font-bold text-lg">Match 2</div>
                                                        {#if data.matches[1].winner === "red"}
                                                            <div class="red-win flex flex-row">
                                                                {#each data.teams[data.matches[1].red] as team, i}
                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                {/each}
                                                            </div>
                                                            <button on:click={()=>{flipMatch(1)}} class="blue-glow flex flex-row">
                                                                {#each data.teams[data.matches[1].blue] as team, i}
                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                {/each}
                                                            </button>
                                                        {:else}
                                                            <button on:click={()=>{flipMatch(1)}} class="red-glow flex flex-row">
                                                                {#each data.teams[data.matches[1].red] as team, i}
                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                {/each}
                                                            </button>
                                                            <div class="blue-win flex flex-row">
                                                                {#each data.teams[data.matches[1].blue] as team, i}
                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
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
                                                        <div class="red-win flex flex-row">
                                                            {#each data.teams[data.matches[7].red] as team, i}
                                                                {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                            {/each}
                                                        </div>
                                                        <button on:click={()=>{flipMatch(7)}} class="blue-glow flex flex-row">
                                                            {#each data.teams[data.matches[7].blue] as team, i}
                                                                {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                            {/each}
                                                        </button>
                                                    {:else}
                                                        <button on:click={()=>{flipMatch(7)}} class="red-glow flex flex-row">
                                                            {#each data.teams[data.matches[7].red] as team, i}
                                                                {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                            {/each}
                                                        </button>
                                                        <div class="blue-win flex flex-row">
                                                            {#each data.teams[data.matches[7].blue] as team, i}
                                                                {#if i < 3}{team}{#if i < 2}, {/if}{/if}
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
                                                            <div class="red-win flex flex-row">
                                                                {#each data.teams[data.matches[2].red] as team, i}
                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                {/each}
                                                            </div>
                                                            <button on:click={()=>{flipMatch(2)}} class="blue-glow flex flex-row">
                                                                {#each data.teams[data.matches[2].blue] as team, i}
                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                {/each}
                                                            </button>
                                                        {:else}
                                                            <button on:click={()=>{flipMatch(2)}} class="red-glow flex flex-row">
                                                                {#each data.teams[data.matches[2].red] as team, i}
                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                {/each}
                                                            </button>
                                                            <div class="blue-win flex flex-row">
                                                                {#each data.teams[data.matches[2].blue] as team, i}
                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                {/each}
                                                            </div>
                                                        {/if}
                                                    </div>
                                                </div>
                                                <div class="item-child">
                                                    <div class="display">
                                                        <div class="font-bold text-lg">Match 4</div>
                                                        {#if data.matches[3].winner === "red"}
                                                            <div class="red-win flex flex-row">
                                                                {#each data.teams[data.matches[3].red] as team, i}
                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                {/each}
                                                            </div>
                                                            <button on:click={()=>{flipMatch(3)}} class="blue-glow flex flex-row">
                                                                {#each data.teams[data.matches[3].blue] as team, i}
                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                {/each}
                                                            </button>
                                                        {:else}
                                                            <button on:click={()=>{flipMatch(3)}} class="red-glow flex flex-row">
                                                                {#each data.teams[data.matches[3].red] as team, i}
                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                {/each}
                                                            </button>
                                                            <div class="blue-win flex flex-row">
                                                                {#each data.teams[data.matches[3].blue] as team, i}
                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
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
                                            <div class="red-win flex flex-row">
                                                {#each data.teams[data.matches[12].red] as team, i}
                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                {/each}
                                            </div>
                                            <button on:click={()=>{flipMatch(12)}} class="blue-glow flex flex-row">
                                                {#each data.teams[data.matches[12].blue] as team, i}
                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                {/each}
                                            </button>
                                        {:else}
                                            <button on:click={()=>{flipMatch(12)}} class="red-glow flex flex-row">
                                                {#each data.teams[data.matches[12].red] as team, i}
                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                {/each}
                                            </button>
                                            <div class="blue-win flex flex-row">
                                                {#each data.teams[data.matches[12].blue] as team, i}
                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
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
                                                            <div class="red-win flex flex-row">
                                                                {#each data.teams[data.matches[11].red] as team, i}
                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                {/each}
                                                            </div>
                                                            <button on:click={()=>{flipMatch(11)}} class="blue-glow flex flex-row">
                                                                {#each data.teams[data.matches[11].blue] as team, i}
                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                {/each}
                                                            </button>
                                                        {:else}
                                                            <button on:click={()=>{flipMatch(11)}} class="red-glow flex flex-row">
                                                                {#each data.teams[data.matches[11].red] as team, i}
                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                {/each}
                                                            </button>
                                                            <div class="blue-win flex flex-row">
                                                                {#each data.teams[data.matches[11].blue] as team, i}
                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
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
                                                                        <div class="red-win flex flex-row">
                                                                            {#each data.teams[data.matches[9].red] as team, i}
                                                                                {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                            {/each}
                                                                        </div>
                                                                        <button on:click={()=>{flipMatch(9)}} class="blue-glow flex flex-row">
                                                                            {#each data.teams[data.matches[9].blue] as team, i}
                                                                                {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                            {/each}
                                                                        </button>
                                                                    {:else}
                                                                        <button on:click={()=>{flipMatch(9)}} class="red-glow flex flex-row">
                                                                            {#each data.teams[data.matches[9].red] as team, i}
                                                                                {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                            {/each}
                                                                        </button>
                                                                        <div class="blue-win flex flex-row">
                                                                            {#each data.teams[data.matches[9].blue] as team, i}
                                                                                {#if i < 3}{team}{#if i < 2}, {/if}{/if}
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
                                                                            <div class="red-win flex flex-row">
                                                                                {#each data.teams[data.matches[4].red] as team, i}
                                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                                {/each}
                                                                            </div>
                                                                            <button on:click={()=>{flipMatch(4)}} class="blue-glow flex flex-row">
                                                                                {#each data.teams[data.matches[4].blue] as team, i}
                                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                                {/each}
                                                                            </button>
                                                                        {:else}
                                                                            <button on:click={()=>{flipMatch(4)}} class="red-glow flex flex-row">
                                                                                {#each data.teams[data.matches[4].red] as team, i}
                                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                                {/each}
                                                                            </button>
                                                                            <div class="blue-win flex flex-row">
                                                                                {#each data.teams[data.matches[4].blue] as team, i}
                                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
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
                                                                        <div class="red-win flex flex-row">
                                                                            {#each data.teams[data.matches[8].red] as team, i}
                                                                                {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                            {/each}
                                                                        </div>
                                                                        <button on:click={()=>{flipMatch(8)}} class="blue-glow flex flex-row">
                                                                            {#each data.teams[data.matches[8].blue] as team, i}
                                                                                {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                            {/each}
                                                                        </button>
                                                                    {:else}
                                                                        <button on:click={()=>{flipMatch(8)}} class="red-glow flex flex-row">
                                                                            {#each data.teams[data.matches[8].red] as team, i}
                                                                                {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                            {/each}
                                                                        </button>
                                                                        <div class="blue-win flex flex-row">
                                                                            {#each data.teams[data.matches[8].blue] as team, i}
                                                                                {#if i < 3}{team}{#if i < 2}, {/if}{/if}
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
                                                                            <div class="red-win flex flex-row">
                                                                                {#each data.teams[data.matches[5].red] as team, i}
                                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                                {/each}
                                                                            </div>
                                                                            <button on:click={()=>{flipMatch(5)}} class="blue-glow flex flex-row">
                                                                                {#each data.teams[data.matches[5].blue] as team, i}
                                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                                {/each}
                                                                            </button>
                                                                        {:else}
                                                                            <button on:click={()=>{flipMatch(5)}} class="red-glow flex flex-row">
                                                                                {#each data.teams[data.matches[5].red] as team, i}
                                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
                                                                                {/each}
                                                                            </button>
                                                                            <div class="blue-win flex flex-row">
                                                                                {#each data.teams[data.matches[5].blue] as team, i}
                                                                                    {#if i < 3}{team}{#if i < 2}, {/if}{/if}
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
        justify-content: center;
    }

    .item{
        display: flex;
        flex-direction: row-reverse;
        .display{
            width: 285px;
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
                width: ($side-margin/2)+1;
                height: 4px;
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
                width: 24.8px;
                height: 4px;
            }
            &:after{
                content: '';
                position: absolute;
                background-color: #fff;
                right: -$side-margin / 2;
                height: calc(50% + 30px) ;
                width: 4px;
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
    .red-glow:hover{
      text-shadow: 0 0 5px rgba(255, 255, 255, 0.75), 0 0 10px rgba(255, 0, 0, 0.75), 0 0 20px rgba(255, 0, 0, 0.75);
      color: rgba(255, 255, 255, 0.4);
    }
    .red-win{
         text-shadow: 0 0 5px #fff, 0 0 10px #f00, 0 0 20px #f00, 0 0 30px #f00 , 0 0 40px #f00 , 0 0 50px #f00, 0 0 60px #f00, 0 0 70px #f00;
    }
    .blue-glow{
        text-shadow: 0 0 30px #00f;
        color: rgba(255, 255, 255, 0.4);
    }
    .blue-glow:hover{
      text-shadow: 0 0 5px rgba(255, 255, 255, 0.75), 0 0 10px rgba(0, 0, 255, 0.75), 0 0 20px rgba(0, 0, 255, 0.75);
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
    }
    .options{
      background-color: rgba(0, 0, 0, 0.5);
    }
</style>