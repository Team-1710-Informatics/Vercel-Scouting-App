<script lang=ts>
    import { onDestroy } from "svelte";

    export let until:number;

    let time = new Date(Date.now())
    const i = setInterval(()=>{time.setTime(Date.now()); time=time}, 1000);
    onDestroy(()=>{
        clearInterval(i);
    })

    function timer():string[]{
        let diff = until - time.getTime();
        let days = Math.floor(diff / (1000 * 3600 * 24));
        diff %= (1000 * 3600 * 24);
        let hours = Math.floor(diff / (1000 * 3600));
        diff %= (1000 * 3600);
        let minutes = Math.floor(diff / (1000 * 60));
        diff %= (1000 * 60);
        let seconds = Math.floor(diff / (1000));

        function norm(n:number):string{
            let out = `${n}`;
            if(n < 10)
                out = `0${n}`;
            return out;
        }

        return [norm(days),norm(hours),norm(minutes),norm(seconds)];
    }
</script>

{#key time}
<div class="flex flex-row" style="font-size:28px">
    <div class="grid grid-cols-1">
        <p class="timer">{timer()[0]}</p>
        <p class="notes">Days</p>
    </div>:
    <div class="grid grid-cols-1">
        <p class="timer">{timer()[1]}</p>
        <p class="notes">Hours</p>
    </div>:
    <div class="trid grid-cols-1`">
        <p class="timer">{timer()[2]}</p>
        <p class="notes">Minutes</p>
    </div>:
    <div class="grid grid-cols-1">
        <p class="timer">{timer()[3]}</p>
        <p class="notes">Seconds</p>
    </div>
</div>
{/key}

<style>
    @import url('https://fonts.cdnfonts.com/css/lcd');

    .timer {
        font-family: 'LCDMono', sans-serif;
        font-size: 28px;
        margin-bottom:0px;
    }

    .notes {
        color: rgb(174, 172, 172);
        font-size: 8px;
        text-align: center;
        margin-top:-8px;
    }
</style>