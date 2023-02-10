<script lang=ts>
    //@ts-ignore;
    import Countdown from "$lib/components/Countdown.svelte";

    type Competition = {
        name:string,
        date:number,
        end:number
    }

    export let events:Competition[];

    function nextComp() : Competition | null {
        let next = null;
        let now = Date.now();
        events.forEach(e=>{
            if(e.date>now){
                if(next == null) next = e;
                else if(next.date>e.date) next = e;
            }
        });
        return next;
    }

    function currComp() : [Competition, string] | null {
        let curr = null;
        let now = Date.now();
        events.forEach(e=>{
            if(e.date <= now && e.end > now)
                curr = e;
        });

        if(!curr) return null;

        let elapsed = now - curr.date;
        let n = Math.floor(elapsed / (1000 * 3600 * 24)) + 1;
        let day:string;
        switch(n){
            // I don't think comps are ever this long, but may as well cover all the bases
            case 1: day = "one";break;
            case 2: day = "two";break;
            case 3: day = "three";break;
            case 4: day = "four";break;
            case 5: day = "five";break;
            case 6: day = "six";break;
            case 7: day = "seven";break;
            case 8: day = "eight";break;
            case 9: day = "nine";break;
            default: day = n.toString();break;
        }

        return [curr,day];
    }
</script>

<middle class="text-center">
    {#if currComp() != null}
        <b>{currComp()[0].name}</b>
        <p class="text-2xl">Day <b>{currComp()[1]}</b></p>
    {:else if nextComp() != null}
        <Countdown until={nextComp().date} />
        <p style="color:rgb(174, 172, 172); font-size:10px">until</p>
        <b>{nextComp().name}</b>
    {/if}
</middle>