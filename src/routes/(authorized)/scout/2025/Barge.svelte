<script>
    import barge from '$lib/assets/scout/2025/barge.png'
    import processor from '$lib/assets/scout/2025/processor.png'

    export let selected
    export let item
    export let log
    export let algae
    export let state
    export let flip = true

    function select(location) {
        if (!state.started) return
        selected = {location: ''}
        selected.location = location
        item = 'algae'

        if (algae) {
            algae = false

            log.push({
                time: state.time,
                action: 'score',
                ...selected,
                phase: state.phase,
                item: item,
            })
        }
    }
</script>

<div class="flex h-full basis-1/6 {flip ? 'flex-col' : 'flex-col-reverse'}">
    <button
            class="basis-1/4 w-full bg-slate-600 text-center hover:brightness-110 {flip
            ? 'rounded-tl-3xl'
            : 'rounded-br-3xl'}"
            class:brightness-120={selected.location === 'processor'}
            on:click={() => {
            select('processor')
        }}
    >
        PROCESSOR
    </button>
    <button
            class="basis-3/4 w-full bg-slate-500 text-center hover:brightness-110 {flip
            ? 'rounded-bl-3xl'
            : 'rounded-tr-3xl'} vertical-text"
            class:brightness-120={selected.location === 'barge'}
            on:click={() => {
            select('barge')
        }}
    >
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
