<script lang="ts">
    import Pre from "./Pre.svelte";
    import Match from "./Match.svelte";
    import Post from "./Post.svelte";

    export let data, form;

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
        preload: true
    };

    let game:any={};

    let postgame:any={};

    $: h = 0;

    //all of these positions are compiled in postgame component upon submission
</script>

<svelte:window on:beforeunload={safetynet} bind:innerHeight={h}/> <!--prevents data loss on page reload-->

<center class="h-full background overflow-y-hidden" style="min-height:{h}px">
    {#if step == 0}
        <Pre bind:meta={meta} events={data.events} bind:pregame={pregame} on:advance={()=>{step++}}/>
    {:else if step == 1}
        <Match bind:meta bind:pregame bind:game on:advance={()=>{step++}}/>
    {:else if step == 2}
        <Post bind:meta bind:pregame bind:game bind:postgame {form}/>
    {/if}
</center>

<style>
    .background{
        background-image:linear-gradient(0.3turn, #363131, #242a34, #000000);
    }
</style>