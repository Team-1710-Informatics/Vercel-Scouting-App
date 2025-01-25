<script>
    import startingAlgae from '$lib/assets/scout/2025/startingAlgae.png'
    import startingCoral from '$lib/assets/scout/2025/startingCoral.png'
    import coralStationLeft from '$lib/assets/scout/2025/coralStationLeft.png'
    import coralStationRight from '$lib/assets/scout/2025/coralStationRight.png'
    import {start_hydrating} from "svelte/internal";

    let startingPositions = {
        left: ['coral', 'algae'],
        middle: ['coral', 'algae'],
        right: ['coral', 'algae'],
    }

    export let selected;
    export let item;

    function select(location, sublocation) {
        console.log(startingPositions)
        selected = {location: ''}
        selected.location = location

        if (location !== "alliance") {
            item = "coral"
        } else {
            selected.ground_piece = sublocation
            item = startingPositions[sublocation][startingPositions[sublocation].length - 1]
            startingPositions = startingPositions;
        }
    }

</script>

<div class="flex flex-row gap-4 justify-center">
    <button on:click={() => {select("coral_station_left", 1)}}>
        <img alt="" class="w-32 h-32 opacity-40 hover:opacity-60 transition-opacity ease-in"
             class:brightness-200={selected.location==="coral_station_left"}
             src={coralStationLeft}>
    </button>
    {#if startingPositions.left.length > 0}
        <button on:click={() => {select("alliance", "left")}}>
            <img alt="" class="w-20 h-20 mt-8 opacity-40 hover:opacity-60 transition-opacity ease-in"
                 class:brightness-200={selected.location==="alliance" ? selected.ground_piece==="left" : null }
                 src={startingPositions.left.includes("algae") ? startingAlgae : startingCoral}>
        </button>
    {/if}
    {#if startingPositions.middle.length > 0}
        <button on:click={() => {select("alliance", "middle")}}>
            <img alt="" class="w-20 h-20 mt-8 opacity-40 hover:opacity-60 transition-opacity ease-in"
                 class:brightness-200={selected.location==="alliance" ? selected.ground_piece==="middle" : null}
                 src={startingPositions.left.includes("algae") ? startingAlgae : startingCoral}>
        </button>
    {/if}
    {#if startingPositions.right.length > 0}
        <button on:click={() => {select("alliance", "right")}}>
            <img alt="" class="w-20 h-20 mt-8 opacity-40 hover:opacity-60 transition-opacity ease-in"
                 class:brightness-200={selected.location==="alliance" ? selected.ground_piece==="right" : null}
                 src={startingPositions.left.includes("algae") ? startingAlgae : startingCoral}>
        </button>
    {/if}
    <button on:click={() => {select("coral_station_right", 1)}}>
        <img alt="" class="w-32 h-32 opacity-40 hover:opacity-60 transition-opacity ease-in"
             class:brightness-200={selected.location==="coral_station_right"}
             src={coralStationRight}>
    </button>

</div>

<style>
</style>