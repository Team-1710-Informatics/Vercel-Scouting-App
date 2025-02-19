<script lang="ts">
    export let state: any & {
        time: number
        started: boolean
        start: number
    }

    let interval: NodeJS.Timer
    function start() {
        state.start = Date.now()
        state.started = true
        state.time = 153
        interval = setInterval(() => {
            if (state.time > 0) state.time--
            else clearInterval(interval)
        }, 1000)
    }

    $: if (interval && state.started == false) clearInterval(interval) //clearInterval not working, this does for some reason
    $: if (state.time > 135 && state.started) state.phase = 'auto'
    else if (state.time <= 135 && state.started) state.phase = 'teleOp'
    else if (!state.started) state.phase = 'pregame' //tell game phase

    function toTimer(seconds: number) {
        if (seconds > 138) seconds -= 138
        else if (seconds > 135) seconds -= 135
        let min = Math.trunc(seconds / 60)
        let sec = seconds - min * 60
        if (sec >= 10) return `${min}:${sec}`
        else return `${min}:0${sec}`
    }

    let h: number
</script>

<div class="flex flex-row justify-center w-36 mt-1 h-10">
    {#if !state.started}
        <button
            style="height:{h}px; background-color:#F5885F; background-image:none;"
            on:click={start}
            class="basis-3/4 bg-gradient-to-br text-lg border rounded border-orange-600 p-1 text-white"
            >Start</button
        >
    {:else if state.time > 138}
        <div
            style="width:150px; height:{h}px"
            class="basis-3/4 text-center text-lg bg-yellow-400 align-middle border border-yellow-600 p-1"
        >
            <p class="text-black font-bold">Auto</p>
        </div>
    {:else if state.time > 135}
        <div
            style="width:150px; height:{h}px"
            class="basis-3/4 text-center text-lg bg-red-400 align-middle border rounded border-red-600 p-1 text-white"
        >
            <p class="text-black font-bold">Pause</p>
        </div>
    {:else}
        <div
            style="width:150px; height:{h}px"
            class="basis-3/4 text-center text-lg bg-green-500 align-middle border rounded border-green-700 p-1"
        >
            <p class="font-bold">TeleOp</p>
        </div>
    {/if}
    <p
        class="basis-1/4 bg-white border border-black p-1 rounded text-black font-extrabold text-xl px-1"
        bind:offsetHeight={h}
    >
        {toTimer(state.time)}
    </p>
</div>
