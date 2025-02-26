<script>
    import startingAlgae from '$lib/assets/scout/2025/algaetransparent.png'
    import startingCoral from '$lib/assets/scout/2025/transparentCoral.png'

    let startingPositions = {
        left: ['coral', 'algae'],
        middle: ['coral', 'algae'],
        right: ['coral', 'algae'],
    }

    export let selected;
    export let item;

    function select(location, sublocation, selected_item) {
        console.log(startingPositions)
        selected = {location: ''}
        selected.location = location

        if (location !== "alliance") {
            item = "coral"
        } else {
            selected.ground_piece = sublocation
            item = selected_item;
            startingPositions = startingPositions;
        }
    }

    export function intakeEvent(coral, algae) {
        if (selected.location === "coral_station_left" || selected.location === "coral_station_right") {
            return true
        }

        if (startingPositions[selected.ground_piece].includes(item)) {
            if (coral === true && item === "coral") {
                return false
            }
            if (algae === true && item === "algae") {
                return false
            }
            startingPositions[selected.ground_piece] = startingPositions[selected.ground_piece].filter((i) => i !== item)
            startingPositions = startingPositions
            console.log(startingPositions)
            return true
        }
        console.log(startingPositions)
        return false
    }
</script>

<div class="basis-1/5 h-full bg-slate-800 angled-corner flex flex-row justify-center items-center opacity-40 hover:opacity-60 transition-opacity ease-in"
     class:brightness-200={selected.location==="coral_station_left"}
     on:click={() => {select("coral_station_left", 1)}}>
    <img class="h-16 w-16 mr-12" src={startingCoral}>
    <p class="-ml-14 mr-8 -mt-1 mb-3">
        Far
    </p>
</div>
<div class="basis-3/5 h-full w-full flex flex-row justify-around">
    {#if startingPositions.left.length > 0}
        <div class="flex flex-row shadow-md shadow-black/25 rounded-2xl py-2.5 h-14 justify-center mt-2">
            {#if startingPositions.left.includes("coral")}
                <img alt="" class="w-14 h-14 -m-2.5 hover:opacity-80 transition-opacity ease-in"
                     on:click={() => {select("alliance", "left", "coral")}}
                     class:opacity-100={selected.location==="alliance" ? selected.ground_piece==="left" ? item==="coral" : false : false }
                     class:opacity-40={selected.location==="alliance" ? selected.ground_piece==="left" ? item==="algae" : true : true }
                     src={startingPositions.left.includes("coral") ? startingCoral : null}>
            {/if}
            {#if startingPositions.left.includes("algae")}
                <img alt="" class="w-14 h-14 -m-3 -mr-1 -mt-2.5 hover:opacity-80 transition-opacity ease-in"
                     on:click={() => {select("alliance", "left", "algae")}}
                     class:opacity-100={selected.location==="alliance" ? selected.ground_piece==="left" ? item==="algae" : false : false }
                     class:opacity-40={selected.location==="alliance" ? selected.ground_piece==="left" ? item==="coral" : true : true }
                     src={startingPositions.left.includes("algae") ? startingAlgae : null}>
            {/if}
        </div>
    {/if}
    {#if startingPositions.middle.length > 0}
        <div class="flex flex-row shadow-md shadow-black/25 rounded-2xl py-2.5 h-14 justify-center mt-2">
            {#if startingPositions.middle.includes("coral")}
                <img alt="" class="w-14 h-14 -m-2.5 hover:opacity-80 transition-opacity ease-in"
                     on:click={() => {select("alliance", "middle", "coral")}}
                     class:opacity-100={selected.location==="alliance" ? selected.ground_piece==="middle" ? item==="coral" : false : false }
                     class:opacity-40={selected.location==="alliance" ? selected.ground_piece==="middle" ? item==="algae" : true : true }
                     src={startingPositions.middle.includes("coral") ? startingCoral : null}>
            {/if}
            {#if startingPositions.middle.includes("algae")}
                <img alt="" class="w-14 h-14 -m-3 -mr-1 -mt-2.5 hover:opacity-80 transition-opacity ease-in"
                     on:click={() => {select("alliance", "middle", "algae")}}
                     class:opacity-100={selected.location==="alliance" ? selected.ground_piece==="middle" ? item==="algae" : false : false }
                     class:opacity-40={selected.location==="alliance" ? selected.ground_piece==="middle" ? item==="coral" : true : true }
                     src={startingPositions.middle.includes("algae") ? startingAlgae : null}>
            {/if}
        </div>
    {/if}
    {#if startingPositions.right.length > 0}
        <div class="flex flex-row shadow-md shadow-black/25 rounded-2xl py-2.5 h-14 justify-center mt-2">
            {#if startingPositions.right.includes("coral")}
                <img alt="" class="w-14 h-14 -m-2.5 hover:opacity-80 transition-opacity ease-in"
                     on:click={() => {select("alliance", "right", "coral")}}
                     class:opacity-100={selected.location==="alliance" ? selected.ground_piece==="right" ? item==="coral" : false : false }
                     class:opacity-40={selected.location==="alliance" ? selected.ground_piece==="right" ? item==="algae" : true : true }
                     src={startingPositions.right.includes("coral") ? startingCoral : null}>
            {/if}
            {#if startingPositions.right.includes("algae")}
                <img alt="" class="w-14 h-14 -m-3 -mr-1 -mt-2.5 hover:opacity-80 transition-opacity ease-in"
                     on:click={() => {select("alliance", "right", "algae")}}
                     class:opacity-100={selected.location==="alliance" ? selected.ground_piece==="right" ? item==="algae" : false : false }
                     class:opacity-40={selected.location==="alliance" ? selected.ground_piece==="right" ? item==="coral" : true : true }
                     src={startingPositions.right.includes("algae") ? startingAlgae : null}>
            {/if}
        </div>
    {/if}
</div>
<div class="basis-1/5 h-full bg-slate-800 angled-corner-left rounded-tr-3xl flex flex-row justify-center items-center opacity-40 hover:opacity-60 transition-opacity ease-in"
     class:brightness-200={selected.location==="coral_station_right"}
     on:click={() => {select("coral_station_right", 1)}}>
    <p class="ml-8 -mr-14 -mt-1 mb-3">
        Near
    </p>
    <img class="h-16 w-16 ml-12" src={startingCoral}>
</div>

<style>
    .angled-corner {
        clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 4rem) 100%, 0 100%);
    }

    .angled-corner-left {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 4rem 100%, 0 calc(100% - 2rem));
    }
</style>