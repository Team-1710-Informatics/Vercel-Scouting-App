<script>
    import barge from '$lib/assets/scout/2025/barge.png'
    import processor from '$lib/assets/scout/2025/processor.png'

    export let selected
    export let item

    function select(location) {
        selected = {location: ''}
        selected.location = location
        item = 'algae'
    }
</script>

<div class="flex flex-col h-full basis-1/6">
    <button class="basis-1/4 w-full bg-slate-600 text-center hover:brightness-110 rounded-tl-3xl"
            class:brightness-120={selected.location==="processor"}
            on:click={() => {select("processor")}}>
        PROCESSOR
    </button>
    <button class="basis-3/4 w-full bg-slate-500 text-center hover:brightness-110 rounded-tr-2xl vertical-text"
            class:brightness-120={selected.location==="barge"}
            on:click={() => {select("barge")}}>
        BARGE
    </button>
</div>

<style>
    .vertical-text {
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        text-align: center;
    }
</style>