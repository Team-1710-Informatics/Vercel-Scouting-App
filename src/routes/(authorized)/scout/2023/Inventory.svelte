<script context="module">
    import { writable } from 'svelte/store'
    export let inv = writable([])
    export const nextID = (() => {
        let n = Math.trunc(Date.now() / 100000)

        return function () {
            return ++n
        }
    })()
</script>

<script>
    import { fly, slide } from 'svelte/transition'
    import { flip } from 'svelte/animate'
    import Locations from './Locations.svelte'
    import cube from '$lib/assets/scout/2023/cube.png'
    import cone from '$lib/assets/scout/2023/cone.png'
    const imgs = { cube, cone }

    export let log
    export let state

    let location

    function logIntake(type) {
        log.push({
            time: Date.now(),
            action: 'intake',
            type: type,
            location: location,
            id: nextID(),
        })

        log = log
    }

    function logDrop(type, id) {
        log.push({
            time: Date.now(),
            action: 'drop',
            type: type,
            id: id,
        })

        log = log
    }

    $: inventory = (() => {
        let list = []
        log.forEach((i) => {
            if (i.action == 'intake') {
                list.push({
                    type: i.type,
                    id: i.id,
                })
            }

            if (i.action == 'drop' || i.action == 'place') {
                let index
                for (let j = 0; j < list.length; j++) {
                    if (list[j].id == i.id) {
                        index = j
                        break
                    }
                }
                if (index != undefined) list.splice(index, 1)
            }
        })
        inv.set(list)
        return list
    })()
</script>

<div class="box">
    <b>Intake/Control</b>
    <div>
        {#each ['cube', 'cone'] as piece}
            <button
                disabled={!state.started}
                class="bg-none border-none"
                on:click={() => {
                    logIntake(piece)
                }}
            >
                <img width="48px" height="48px" src={imgs[piece]} alt={piece} />
            </button>
        {/each}
    </div>
    from
    <Locations bind:value={location} />
</div>

<div class="h-16">
    <div class="flex flex-row w-fit flex-wrap h-10">
        {#each $inv as i (i.id)}
            <button
                disabled={!state.started}
                animate:flip
                in:fly
                out:slide
                on:click={() => {
                    logDrop(i.type, i.id)
                }}
                class="bg-none border-none"
            >
                <img src={imgs[i.type]} alt={i.type} />
            </button>
        {/each}
    </div>
    {#if $inv.length > 0}
        <div transition:slide class="text-xs text-gray-400">
            Click piece if Dropped or Misplaced
        </div>
    {/if}
</div>
