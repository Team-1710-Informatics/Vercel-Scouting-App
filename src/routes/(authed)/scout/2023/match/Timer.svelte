<script lang="ts">
    import { setContext, getContext } from 'svelte';

    let time:number;
    let started:boolean;

    const timer = {
        time:0,
        started: false
    };

    setContext("timer", ()=>timer);

   /* export let state:{
        pre:any,
        time:number;
        started:boolean;
        inventory:{time:number, type:string, region:string, method:string}[];
        actions:any[];
    };
    */

    function start(){
        timer.started = false;
        timer.time = 153
        setInterval(()=>{
            if(timer.time > 0)
                timer.time--;
        }, 1000);
    }

    function toTimer(seconds:number){
        if(seconds > 138) seconds -= 138;
        else if(seconds > 135) seconds -= 135;
        let min = Math.trunc(seconds/60);
        let sec = seconds - min*60;
        if(sec >= 10)
            return `${min}:${sec}`;
        else
            return `${min}:0${sec}`;
    }
</script>

<div class="flex flex-row justify-center mt-10">
    {#if !timer.started}
        <button on:click={start} class="bg-orange-400 bg-gradient-to-br from-orange-600 to-orange-400 text-lg border rounded border-orange-600 p-1 text-white">Start Match</button>
    {:else if timer.time > 138}
        <div style="width:102px" class="text-center text-lg bg-yellow-400 align-middle border rounded border-yellow-600 p-1"><p class="text-black font-bold">Auto</p></div>
    {:else if timer.time > 135}
        <div style="width:102px" class="text-center text-lg bg-red-400 align-middle border rounded border-red-600 p-1"><p class="text-black font-bold">Pause</p></div>
    {:else}
        <div style="width:102px" class="text-center text-lg bg-green-500 align-middle border rounded border-green-700 p-1"><p class="font-bold">TeleOp</p></div>
    {/if}
    <p class = "bg-white border border-black rounded p-1 text-black font-extrabold text-xl">{toTimer(timer.time)}</p>
</div>