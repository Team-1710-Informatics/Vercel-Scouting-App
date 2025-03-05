<script>
    import Reef from './Reef.svelte'
    import AllianceArea from './AllianceArea.svelte'
    import Barge from './Barge.svelte'
    import Inventory from './Inventory.svelte'
    import Timer from './Timer.svelte'
    import Endgame from './Endgame.svelte'

    export let team

    export let log = []
    export let algae = false
    export let coral = false
    let endgame = false
    export let state
    export let meta
    let item

    export let climb = {}

    let location

    let selected = {
        location: 'none',
    }

    function switchEndgame() {
        if (state.time < 30) {
            endgame = !endgame
        }
    }

    function behavior(actionType) {
        if (state.started) {
            if (actionType === 'algae') {
                if (!algae) {
                    selected.location = 'ground'
                    log.push({
                        time: state.time,
                        action: 'intake',
                        ...selected,
                        phase: state.phase,
                        item: 'algae',
                    })
                    algae = true
                }
            } else if (actionType === 'coral') {
                if (!coral) {
                    selected.location = 'ground'
                    log.push({
                        time: state.time,
                        action: 'intake',
                        ...selected,
                        phase: state.phase,
                        item: 'coral',
                    })
                    coral = true
                }
            }
        }
    }

    export let flip = true
</script>

<div class="flex flex-row w-screen h-screen items-center justify-center">
    <div class="basis-4/5 h-screen p-5">
        {#if flip}
            <div
                class="h-full flex flex-row justify-center rounded-3xl background shadow-2xl shadow-black/80"
            >
                <Barge
                    bind:algae
                    bind:item
                    bind:log
                    bind:selected
                    bind:state
                    class="basis-1/6"
                />
                <div
                    class="flex flex-row items-center justify-between basis-5/6"
                >
                    {#if endgame}
                        <Endgame bind:climb bind:endgame />
                    {/if}
                    {#if !endgame}
                        <Reef
                            bind:item
                            bind:selected
                            bind:log
                            bind:algae
                            bind:state
                        />
                    {/if}
                    <div
                        class="items-end justify-between h-full flex flex-col basis-1/2"
                    >
                        <AllianceArea
                            bind:coral
                            bind:item
                            bind:log
                            bind:selected
                            bind:state
                        />
                    </div>
                </div>
            </div>
        {:else}
            <div
                class="h-full flex flex-row justify-center rounded-3xl background shadow-2xl shadow-black/80"
            >
                <div class="justify-between h-full flex flex-col basis-1/2">
                    <AllianceArea
                        bind:coral
                        bind:item
                        bind:log
                        bind:selected
                        bind:state
                        bind:flip
                    />
                </div>
                {#if !endgame}
                    <Reef
                        bind:item
                        bind:selected
                        bind:log
                        bind:algae
                        bind:state
                        bind:flip
                    />
                {/if}
                {#if endgame}
                    <Endgame bind:climb bind:endgame bind:flip />
                {/if}
                <Barge
                    bind:algae
                    bind:item
                    bind:log
                    bind:selected
                    bind:state
                    class="basis-1/6"
                    bind:flip
                />
            </div>
        {/if}
    </div>
    <div class="flex flex-col gap-4 basis-1/5 w-fit">
        <div class="text-md w-fit -mb-5 -mt-2">
            {#if team !== 'practice'}
                Team {team.slice(3)}
            {:else}
                Practice
            {/if}
        </div>
        <Timer bind:state />
        <div class="flex items-center justify-center w-full w-36">
            <Inventory bind:algae bind:coral />
        </div>
        <div
            class="rounded-md shadow-xl bg-red-600 p-2 w-36 h-10"
            class:disabled={!state.started}
            on:click={() => {
                behavior('algae')
            }}
        >
            Ground Algae
        </div>
        <div
            class="rounded-md shadow-xl bg-yellow-400 p-2 w-36 h-10"
            class:disabled={!state.started}
            on:click={() => {
                behavior('coral')
            }}
        >
            Ground Coral
        </div>
        <button
            class="rounded-md shadow-xl bg-blue-400 p-2 h-10 w-36"
            class:disabled={(state.started && state.time > 40) ||
                !state.started}
            on:click={switchEndgame}
        >
            Endgame
            {#if state.time > 40}T-{state.time - 30}{/if}
        </button>
        <div
            class="rounded-md shadow-xl bg-fuchsia-500 p-2 w-36 h-10"
            on:click={() => {
                flip = !flip
            }}
        >
            Flip Field
        </div>
    </div>
</div>

<style>
    .background {
        background: linear-gradient(0.3turn, #242a34, #363840, #000000) fixed;
        /* Your main background gradient */
        /* linear-gradient(to right, black, black); */
    }

    .disabled {
        opacity: 0.5;
        filter: brightness(0.5);
        cursor: not-allowed;
    }
</style>
