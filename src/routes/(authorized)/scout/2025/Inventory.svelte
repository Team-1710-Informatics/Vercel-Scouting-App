<script>
    import coralImage from '$lib/assets/scout/2025/startingCoral.png'
    import algaeImage from '$lib/assets/scout/2025/Algae.png'

    export let coral
    export let algae
    export let state
    export let log

    function dropCoral() {
        if (!state.started) return

        if (coral) {
            log.push({
                time: state.time,
                action: 'drop',
                location: 'ground',
                phase: state.phase,
                item: 'coral',
            })
            coral = false
        }
    }

    function dropAlgae() {
        if (!state.started) return

        if (algae) {
            log.push({
                time: state.time,
                action: 'drop',
                location: 'ground',
                phase: state.phase,
                item: 'algae',
            })
            algae = false
        }
    }
</script>

<div class="flex flex-row justify-evenly h-fit gap-2">
    Drop:
    {#if coral}
        <div on:click={dropCoral}>
            <img class="h-10 -my-1" src={coralImage} alt=""/>
        </div>
    {:else}
        <div>
            <img class="h-10 -my-1 opacity-20" src={coralImage} alt=""/>
        </div>
    {/if}
    {#if algae}
        <div on:click={dropAlgae}>
            <img class="h-10 -my-1" src={algaeImage} alt=""/>
        </div>
    {:else}
        <div>
            <img class="h-10 -my-1 opacity-20" src={algaeImage} alt=""/>
        </div>
    {/if}

</div>