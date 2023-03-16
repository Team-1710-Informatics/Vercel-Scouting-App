<script lang=ts>
    import Pre from "./Pre.svelte";
    import Match from "./Match.svelte";
    import Post from "./Post.svelte";
    import { fly } from "svelte/transition";
    import Status from "$lib/components/function/Status.svelte";

    export let data:any;

    function safetynet(e:Event){
        e.preventDefault();
        
        return "Are you sure you want to leave? Scouting data will be lost."
    }

    let step = 0;

    let meta:{
        scout: string,
        event: string,
        team: number|null,
        match: number|null,
        alliance: "red"|"blue"|null
    }={
        scout: data.scout,
        event: data.competition?.key??null,
        match: null,
        team: null,
        alliance: null
    }

    let pregame:{
        startPosition:{x:number,y:number},
        preload:"cube"|"cone"|"none"|null
    }={
        startPosition:{x:NaN,y:NaN},
        preload:null
    }

    let game:any={};

    let postgame:any={}
</script>

<svelte:window on:beforeunload={safetynet}></svelte:window>

<Status value="scouting" host={data.host}/>

<center class="pt-10">
    {#if step===0}
        <div in:fly={{duration:500, delay:500}} out:fly={{duration:500}}>
            <Pre bind:meta={meta} bind:pregame={pregame} events={data.events} on:advance={()=>{step++}}/>
        </div>
    {:else if step===1}
        <div in:fly={{duration:500, delay:500}} out:fly={{duration:500}}>
            <Match {meta} {pregame} bind:game={game} on:advance={()=>{step++}}/>
        </div>
    {:else if step===2}
        <div in:fly={{duration:500, delay:500}} out:fly={{duration:500}}>
            <Post bind:meta={meta} bind:pregame={pregame} bind:game={game} bind:postgame={postgame} />
        </div>
    {/if}
</center>
