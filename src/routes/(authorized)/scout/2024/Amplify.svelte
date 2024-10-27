<script>
    export let amplified = false;
    export let state;

    let h;
    let timer = 10;
    let ampTimer;

    function amplify(){
        amplified=true;
        ampTimer = setInterval(()=>{
            if(timer>0)timer--;
            else if(timer===0){
                amplified=false;
                timer=10;
                clearInterval(ampTimer);
            }
        }, 1000);
    }

    $: if(ampTimer && amplified===false){
        clearInterval(ampTimer);
        timer=10;
    }
</script>

{#if state.time <= 135 && state.started}
    <div class="flex flex-row w-max mb-3">
        <button style="height:{h}px;" class="px-2 border-2 rounded border-gray-500 p-1 {amplified?"amplified":"not-amplified"}" on:click={amplified?()=>{amplified=false}:amplify}>Amplify</button>
        {#if amplified}
            <div class="px-2 p-1 bg-white border rounded text-black" bind:offsetHeight={h}>{timer} seconds</div>
        {/if}
    </div>
{/if}

<style>
    button{
        background-image:none;
    }
    .amplified{
        background-image:linear-gradient(green, #D2D2D2);
    }
    .not-amplified{
        background-image:linear-gradient(#ffaeae, red);
    }
</style>