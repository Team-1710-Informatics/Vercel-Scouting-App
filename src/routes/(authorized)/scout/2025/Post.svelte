<script>
    import {enhance} from '$app/forms'
    import QRCode from '$lib/components/ui/QR.svelte'
    import StarRating from '$lib/components/ui/StarRating.svelte'
    import {dev} from '$app/environment'
    import QRcode from '$lib/components/ui/QR.svelte'
    import { onMount } from 'svelte'
    import { compress } from '$lib/modules/jsoncompress.js'

    export let meta, pregame, game, postgame, form

    const strategies = [
        ['🔄 Full Cycle', 'cycle', false, '#0078d7'],
        ['Prioritizes Coral', 'coral', false, '#959595'],
        ['Prioritizes Algae', 'algae', false, '#288e28'],
        ['Station Feeder', 'feeder', false, '#772fa6'],
        ['Floor Pickup', 'pickup', false, '#86adcc'],
        ['🧱 Defense', 'defense', false, '#f7894a'],
        ['💞 Moral Support', 'moral', false],
        ['💔 Broke Down', 'breakdown', false],
        ['🚫 No Show', 'noShow', false],
    ]

    let thoughts, rating, driverSkill, speed, defense

    $: postgame = {
        strategy: (function () {
            let x = []
            for (let i = 0; i < strategies.length; i++)
                if (strategies[i][2]) x.push(strategies[i][1])
            return x
        })(),
        rating,
        driverSkill,
        defenseSkill: (function () {
            if (strategies[3][2]) return defense
            else return null
        })(),
        speed,
        thoughts: (function () {
            if (thoughts !== '' && thoughts) return thoughts
            else return null
        })(),
    }

    $: final = JSON.stringify({
        ...meta,
        pregame,
        ...game,
        postgame,
    })

    export let team

    let loading = false

    let showcode = false;
    let qrdata;

    onMount(() => {
        generateQrcode();
    });

    function generateQrcode() {
        qrdata = compress('{"_id":{"$oid":"679e831380c02b50bc084ff2"},"event":"2024practice","match":{"$numberInt":"11"},"alliance":"blue","team":{"$numberInt":"1"},"scout":"674bdm18","pregame":{"startPosition":{"x":{"$numberInt":"70"},"y":{"$numberInt":"149"}},"preload":true},"start":{"$numberDouble":"1738441329036.0"},"actions":[{"time":{"$numberInt":"-1"},"action":"intake","location":"preload","phase":"pregame"},{"time":{"$numberInt":"149"},"action":"score","location":"reef","branch":{"$numberInt":"2"},"level":{"$numberInt":"3"},"phase":"auto"},{"time":{"$numberInt":"147"},"action":"intake","location":"reef","branch":{"$numberInt":"2"},"level":{"$numberInt":"3"},"phase":"auto"},{"time":{"$numberInt":"143"},"action":"score","location":"reef","branch":{"$numberInt":"2"},"level":{"$numberInt":"3"},"phase":"auto"},{"time":{"$numberInt":"141"},"action":"intake","location":"reef","branch":{"$numberInt":"2"},"level":{"$numberInt":"3"},"phase":"auto"},{"time":{"$numberInt":"140"},"action":"intake","location":"reef","branch":{"$numberInt":"2"},"level":{"$numberInt":"2"},"phase":"auto"},{"time":{"$numberInt":"138"},"action":"score","location":"reef","branch":{"$numberInt":"2"},"level":{"$numberInt":"2"},"phase":"auto"},{"time":{"$numberInt":"137"},"action":"miss","location":"reef","branch":{"$numberInt":"2"},"level":{"$numberInt":"2"},"phase":"auto"},{"time":{"$numberInt":"113"},"action":"score","location":"barge","phase":"teleOp"},{"time":{"$numberInt":"109"},"action":"intake","location":"alliance","ground_piece":"left","phase":"teleOp"},{"time":{"$numberInt":"108"},"action":"intake","location":"alliance","ground_piece":"middle","phase":"teleOp"},{"time":{"$numberInt":"106"},"action":"score","location":"alliance","ground_piece":"middle","phase":"teleOp"},{"time":{"$numberInt":"104"},"action":"score","location":"reef","branch":{"$numberInt":"0"},"level":{"$numberInt":"3"},"phase":"teleOp"},{"time":{"$numberInt":"98"},"action":"score","location":"barge","phase":"teleOp"},{"time":{"$numberInt":"91"},"action":"miss","location":"barge","phase":"teleOp"},{"time":{"$numberInt":"91"},"action":"miss","location":"barge","phase":"teleOp"},{"time":{"$numberInt":"91"},"action":"miss","location":"barge","phase":"teleOp"},{"time":{"$numberInt":"91"},"action":"miss","location":"barge","phase":"teleOp"},{"time":{"$numberInt":"91"},"action":"intake","location":"barge","phase":"teleOp"},{"time":{"$numberInt":"88"},"action":"score","location":"reef","branch":{"$numberInt":"2"},"phase":"teleOp"},{"time":{"$numberInt":"87"},"action":"intake","location":"reef","branch":{"$numberInt":"2"},"phase":"teleOp"},{"time":{"$numberInt":"85"},"action":"intake","location":"alliance","ground_piece":"right","phase":"teleOp"},{"time":{"$numberInt":"85"},"action":"score","location":"alliance","ground_piece":"right","phase":"teleOp"},{"time":{"$numberInt":"79"},"action":"score","location":"reef","branch":{"$numberInt":"2"},"level":{"$numberInt":"3"},"phase":"teleOp"},{"time":{"$numberInt":"77"},"action":"score","location":"barge","phase":"teleOp"},{"time":{"$numberInt":"63"},"action":"intake","location":"barge","phase":"teleOp"},{"time":{"$numberInt":"62"},"action":"intake","location":"alliance","ground_piece":"right","phase":"teleOp"},{"time":{"$numberInt":"61"},"action":"intake","location":"alliance","ground_piece":"left","phase":"teleOp"},{"time":{"$numberInt":"60"},"action":"score","location":"alliance","ground_piece":"left","phase":"teleOp"},{"time":{"$numberInt":"59"},"action":"score","location":"barge","phase":"teleOp"},{"time":{"$numberInt":"56"},"action":"score","location":"barge","phase":"teleOp"},{"time":{"$numberInt":"52"},"action":"score","location":"reef","branch":{"$numberInt":"0"},"level":{"$numberInt":"2"},"phase":"teleOp"},{"time":{"$numberInt":"34"},"action":"score","location":"barge","phase":"teleOp"},{"time":{"$numberInt":"32"},"action":"intake","location":"alliance","ground_piece":"middle","phase":"teleOp"},{"time":{"$numberInt":"30"},"action":"score","location":"barge","phase":"teleOp"},{"time":{"$numberInt":"25"},"action":"miss","location":"reef","branch":{"$numberInt":"3"},"phase":"teleOp"},{"time":{"$numberInt":"25"},"action":"score","location":"reef","branch":{"$numberInt":"3"},"phase":"teleOp"},{"time":{"$numberInt":"24"},"action":"score","location":"reef","branch":{"$numberInt":"3"},"level":{"$numberInt":"2"},"phase":"teleOp"},{"time":{"$numberInt":"22"},"action":"intake","location":"reef","branch":{"$numberInt":"3"},"level":{"$numberInt":"2"},"phase":"teleOp"},{"time":{"$numberInt":"20"},"action":"score","location":"coral_station_right","phase":"teleOp"},{"time":{"$numberInt":"20"},"action":"intake","location":"coral_station_right","phase":"teleOp"},{"time":{"$numberInt":"18"},"action":"score","location":"coral_station_right","phase":"teleOp"},{"time":{"$numberInt":"17"},"action":"score","location":"coral_station_right","phase":"teleOp"},{"time":{"$numberInt":"17"},"action":"score","location":"reef","branch":{"$numberInt":"3"},"level":{"$numberInt":"2"},"phase":"teleOp"},{"time":{"$numberInt":"15"},"action":"score","location":"barge","phase":"teleOp"}],"climb":{"time":{"$numberDouble":"0.768"},"type":"deep"},"postgame":{"strategy":["moral"],"rating":{"$numberInt":"5"},"driverSkill":{"$numberInt":"5"},"speed":{"$numberInt":"5"},"thoughts":null},"__v":{"$numberInt":"0"}}');
    }

    function qrcode() {
        generateQrcode();
        showcode = !showcode;
    }

    let online = true;

</script>

<svelte:window bind:online/>

<center class="w-full py-10">
    <h5 class="mb-2">Submit Entry</h5>
    {#if team !== 'practice'}
        <h5 class="mb-4"><b>Team {team.slice(3)}</b></h5>
    {:else}
        <h5 class="mb-4"><b>Practice</b></h5>
    {/if}
    <div class="boxing">
        <div class="grid grid-cols-1 justify-items-start pb-2 px-10">
            <h6 class="justify-self-center underline">Robot Strategy</h6>
            {#each strategies as s}
                <label>
                    <input type="checkbox" bind:checked={s[2]}/>
                    <span style="color:{s?.[3]}">{s[0]}</span>
                </label>
            {/each}
        </div>
        <div class="py-1">
            <h6>Your Rating</h6>
            <StarRating editable bind:rating/>
        </div>
        <div class="py-1">
            <h6>Driver Skill Rating</h6>
            <p class="text-xs opacity-50">Precision</p>
            <StarRating editable bind:rating={driverSkill}/>
        </div>
        <div class="py-1">
            <h6>Speed Rating</h6>
            <p class="text-xs opacity-50">Maneuverability</p>
            <StarRating editable bind:rating={speed}/>
        </div>
        {#if postgame.strategy.includes('defense')}
            <div class="py-1">
                <h6>Defense Rating</h6>
                <StarRating editable bind:rating={defense}/>
            </div>
        {/if}
        <div class="flex flex-col pt-2">
            <h6>Final Thoughts</h6>
            <textarea class="h-20" bind:value={thoughts}/>
        </div>
        <form
            method="POST"
            use:enhance={(cancel) => {
                   loading = true
                   //@ts-ignore
                   if (!online && !dev) {
                       qrDisable = false
                        cancel()
                   }
                   return async ({ update, cancel }) => {
                       await update()
                       loading = false
                   }
            }}
        >
            <input type="text" hidden name="data" value={final}/>
                <button
                    disabled={loading || postgame.strategy.length == 0}
                    on:click={() => {
                    console.log(final)
                    }}
                    class="mt-2 submit"
                >{loading ? 'Loading...' : 'Submit'}</button
                >
        </form>
        <button
            on:click={qrcode}
            class="fixed top-0 left-0 bg-gradient-to-bl border-red-700 from-red-600 to-red-400 w-16 text-xs h-10"
            class:w-screen={showcode}>

            Show QR Code
            {#if showcode}
                <QRcode data={qrdata}/>
            {/if}
        </button>
            <a href="/hub" class="rounded border-2 p-2 submit">Hub</a>
    </div>
</center>

<style>
    .boxing {
        margin-top: 1rem;
        margin-bottom: 1rem;
        border: 5px #363131;
        border-radius: 8%;
        background-color: #171c26;
        padding: 0.75rem;
        width: fit-content;
        opacity: 80%;

        box-shadow: 0px 0px 3px 1px black;
    }
</style>
