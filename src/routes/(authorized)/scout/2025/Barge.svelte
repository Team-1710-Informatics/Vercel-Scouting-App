<script>
    import barge from '$lib/assets/scout/2025/barge.png'
    import processor from '$lib/assets/scout/2025/processor.png'

    export let selected
    export let item
    export let log
    export let algae
    export let state

    function select(location) {
        if (!state.started) return
        selected = {location: ''}
        selected.location = location
        item = 'algae'

        if (algae) {
            algae = false

            log.push({
                time: state.time,
                action: 'intake',
                ...selected,
                phase: state.phase,
                item: item
            });
        }
    }
</script>

<div class="flex flex-col h-full basis-1/6">
    <button class="basis-1/4 w-full bg-slate-600 text-center hover:brightness-110 rounded-tl-3xl"
            class:brightness-120={selected.location==="processor"}
            on:click={() => {select("processor")}}>
        PROCESSOR
    </button>
    <button class="basis-3/4 w-full bg-slate-500 text-center hover:brightness-110 rounded-bl-2xl vertical-text"
            class:brightness-120={selected.location==="barge"}
            on:click={() => {select("barge")}}>
        BARGE
    </button>
</div>

<style>
    .disabled {
        opacity: 0.5;
        filter: brightness(0.5);
        cursor: not-allowed;
    }
</style>