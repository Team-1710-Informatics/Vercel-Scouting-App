<script lang="ts">
    import Pre from "./pre.svelte";
    import Match from "./match.svelte";
    import Post from "./post.svelte";

    export let data;

    let step = 0;

    function safetynet(e:Event){
        e.preventDefault();
        
        return "Are you sure you want to leave? Scouting data will be lost."
    }

    console.log(data.competition);

    let meta:{ //meta is all background data
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
    };

    let pregame:{
        startPosition:{x:number,y:number},
        preload:"cube"|"cone"|"none"|null
    }={
        startPosition:{x:NaN,y:NaN},
        preload:null
    };

    let game:any={};

    let postgame:any={};

    //all of these positions are compiled in postgame component upon submission
</script>

<svelte:window on:beforeunload={safetynet}/>
<center class="h-screen"  style="background-image:linear-gradient(0.3turn, #363131, #242a34, #000000);">
    {#if step == 0}
        <Pre bind:meta={meta} events={data.events} on:advance={()=>{step++}}/>
    {:else if step == 1}
        <Match on:advance={()=>{step++}}/>
    {:else if step == 2}
        <Post/>
    {/if}
</center>

