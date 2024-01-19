<script lang="ts">
    import Pre from "./Pre.svelte";
    import Match from "./Match.svelte";
    import Post from "./Post.svelte";

    export let data;

    let step = 0;

    function safetynet(e:Event){
        e.preventDefault();
        
        return "Are you sure you want to leave? Scouting data will be lost."
    }

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
        preload: Boolean
    }={
        startPosition:{x:NaN,y:NaN},
        preload: false
    };

    let game:any={};

    let postgame:any={};

    //all of these positions are compiled in postgame component upon submission
</script>

<svelte:window on:beforeunload={safetynet}/> <!--prevents data loss on page reload-->
<main style="overflow-y:hidden;">
<center class="h-screen"  style="background-image:linear-gradient(0.3turn, #363131, #242a34, #000000);">
    {#if step == 0}
        <Pre bind:meta={meta} events={data.events} bind:pregame={pregame} on:advance={()=>{step++}}/>
    {:else if step == 1}
        <Match on:advance={()=>{step++}}/>
    {:else if step == 2}
        <Post/>
    {/if}
</center>
</main>

