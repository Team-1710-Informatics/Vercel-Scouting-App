<script>
    export let selected
    export let item

    function select(location) {
        selected = {location: ''}
        selected.location = location
        item = 'algae'
    }
</script>

<div class="flex flex-col h-full basis-1/6">
    <button class="basis-1/4 w-full bg-slate-600 text-center hover:bg-slate-500 rounded-tl-3xl"
            on:click={() => {select("processor")}}>
        PROCESSOR
    </button>
    <button class="basis-3/4 w-full bg-slate-500 text-center hover:bg-slate-400 rounded-bl-2xl"
            on:click={() => {select("barge")}}>
        BARGE
    </button>
</div>