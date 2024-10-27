<script>
    import Timer from "./Timer.svelte";
    import Action from "./Action.svelte";
    import Amplify from "./Amplify.svelte";
    import Questions from "./Questions.svelte";
    import Inventory from "./Inventory.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let meta;
    export let pregame;
    export let game;
    export let amplified;

    let inv = pregame.preload;
    let log = [];
    let untimed = {};

    $: answered = (()=>{
        let res=true;
        ["exitAuto","parkMatch","hangMatch","spotlight","spotlightAttempt","harmony"].forEach(q=>{
            if(untimed?.[q]==null) res = false;
        })
        return res;
    })();

    function undo(){
        if(log.length == 1){ //restart timer if only one thing has been done and is in auto
            if(log[0].time == -1){
                state.start=0;
                state.time=0;
                state.started=false;
                return;
            }
        }else if(log.length == 0){ //restart timer if nothing has been done
            state.start=0;
            state.time=0;
            state.started=false;
            return;
        }
        log.pop();
        inv=!inv;
        log = log;
    }

    if(pregame.preload){
        log.push({
            time:-1,
            action:"intake",
            location:"preload",
            phase:"pregame"
        });

        log = log;
    }

    let state = {
        time: 0,
        started: false,
        start: 0,
        phase: "preGame"
    }
</script>

<h5>Scouting {meta.team}</h5>
<Timer bind:state/> <br>
<Amplify bind:amplified {state}/>
<Inventory {inv} />
<Action bind:log bind:inv {amplified} {state} {meta}/>
<Questions {state} bind:answers={untimed} />
<button on:click={()=>{
        game = {
            start:state.start,
            actions:log,
            untimed:untimed
        };
        console.log(game);
        dispatch("advance");
    }}
    class="submit my-2" disabled={!(state.started&&state.time==0)||!answered}
>
    {(state.started&&state.time==0)?"Next":(state.started)?state.time:"Next"}
</button>

<button disabled={!state.started} on:click={undo} class="fixed top-0 right-0 bg-gradient-to-bl border-red-700 from-red-600 to-red-400">
    Undo
</button>
