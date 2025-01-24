<script>
    import Timer from './Timer.svelte';
    import Reef from './Reef.svelte';
    import AllianceArea from "./AllianceArea.svelte";

    import {createEventDispatcher} from "svelte";
    import Action from "./Action.svelte";


    const dispatch = createEventDispatcher();

    export let meta;
    export let pregame;
    export let game;

    let inv = pregame.preload;
    let log = [];
    let untimed = {};

    $: answered = (() => {
        let res = true;
        ['exitAuto', 'parkMatch', 'hangMatch', 'cageLevel'].forEach((q) => {
            if (untimed?.[q] == null) res = false;
        });
        return res;
    })();

    function undo() {
        if (log.length === 1) {
            if (log[0].time === -1) {
                state.start = 0;
                state.time = 0;
                state.started = false;
                return;
            }
        } else if (log.length === 0) {
            state.start = 0;
            state.time = 0;
            state.started = false;
            return;
        }
        log.pop();
        inv = !inv;
        log = log;
    }

    if (pregame.preload) {
        log.push({
            time: -1,
            action: 'intake',
            location: 'preload',
            phase: 'pregame',
        });
        log = log;
    }

    let state = {
        time: 0,
        started: false,
        start: 0,
        phase: 'preGame',
    };


</script>

<Timer bind:state/> <br/>
<Action/>

<button
        class="submit my-2"
        disabled={!(state.started && state.time == 0) || !answered}
        on:click={() => {
        game = {
            start: state.start,
            actions: log,
            untimed: untimed,
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
