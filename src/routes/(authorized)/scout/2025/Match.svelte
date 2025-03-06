<script>
    import Timer from './Timer.svelte'
    import Reef from './Reef.svelte'
    import AllianceArea from './AllianceArea.svelte'

    import { createEventDispatcher } from 'svelte'
    import Action from './Action.svelte'
    import Inventory from './Inventory.svelte'
    import Questions from './Questions.svelte'

    let algae
    let coral

    const dispatch = createEventDispatcher()

    export let meta
    export let pregame
    export let game
    export let team
    let scores = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ]

    let log = []
    let untimed = {}

    $: answered = (() => {
        let res = true
        ;['exitAuto', 'parkMatch'].forEach((q) => {
            if (untimed?.[q] == null) res = false
        })
        return res
    })()

    function undo() {
        if (log.length === 1) {
            if (log[0].time === -1) {
                state.start = 0
                state.time = 0
                state.started = false
                return
            }
        } else if (log.length === 0) {
            state.start = 0
            state.time = 0
            state.started = false
            return
        }

        let recent = log.pop()

        console.log(recent)

        if (recent.item === 'coral') {
            coral = !coral
            if (recent.action === 'score') {
                scores[recent.level - 1][0]--
            } else if (recent.action === 'miss') {
                scores[recent.level - 1][1]--
            }
        } else if (recent.item === 'algae') {
            algae = !algae
        }

        log = log
    }

    if (pregame.preload) {
        log.push({
            time: -1,
            action: 'intake',
            location: 'preload',
            item: 'coral',
            phase: 'pregame',
        })
        log = log
        coral = true
    }

    let state = {
        time: 0,
        started: false,
        start: 0,
        phase: 'preGame',
    }

    let climb
</script>

<Action
    bind:algae
    bind:climb
    bind:coral
    bind:log
    bind:state
    {team}
    bind:scores
/>
<Questions bind:answers={untimed} {state} />

<button
    class="submit fixed bottom-0 right-0"
    disabled={!(state.started && state.time == 0) || !answered}
    on:click={() => {
        game = {
            start: state.start,
            actions: log,
            untimed: untimed,
            climb: climb,
        }
        console.log(game)
        dispatch('advance')
    }}
>
    {state.started && state.time == 0
        ? 'Next'
        : state.started
          ? state.time
          : 'Next'}
</button>

<button
    class="fixed top-0 right-0 bg-gradient-to-bl border-red-700 from-red-600 to-red-400"
    disabled={!state.started}
    on:click={undo}
>
    Undo
</button>
