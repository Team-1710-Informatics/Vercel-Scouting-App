<script>
    import startingCoral from '$lib/assets/scout/2025/transparentCoral.png'

    export let coral;
    export let log;
    export let selected;
    export let state;

    function select(location) {
        selected = {location: ''}
        selected.location = location

        if (!coral) {
            coral = true

            log.push({
                time: state.time,
                action: 'intake',
                ...selected,
                phase: state.phase,
                item: 'coral'
            });
        }
    }
</script>

<div class="basis-1/5 h-full bg-slate-800 angled-corner flex flex-row justify-center items-center opacity-40 hover:opacity-60 transition-opacity ease-in"
     class:brightness-200={selected.location==="coral_station_left"}
     on:click={() => {select("coral_station_left")}}>
    <img class="h-16 w-16 mr-12" src={startingCoral}>
    <p class="-ml-14 mr-8 -mt-1 mb-3">
        Far
    </p>
</div>
<div class="basis-3/5 h-full w-full flex flex-row justify-around">
</div>
<div class="basis-1/5 h-full bg-slate-800 angled-corner-left rounded-tr-3xl flex flex-row justify-center items-center opacity-40 hover:opacity-60 transition-opacity ease-in"
     class:brightness-200={selected.location==="coral_station_right"}
     on:click={() => {select("coral_station_right")}}>
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