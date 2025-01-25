<script>
    export let selected
    export let item

    function select(location) {
        selected = {location: ''}
        selected.location = location
        item = 'algae'
    }
</script>

<div class="flex flex-row">
    <button class="basis-1/4 h-20 bg-slate-600 m-4 text-center hover:bg-slate-500"
            on:click={() => {select("processor")}}>
        PROCESSOR
    </button>
    <button class="basis-3/4 h-20 bg-slate-500 m-4 text-center hover:bg-slate-400"
            on:click={() => {select("barge")}}>
        BARGE
    </button>
</div>