<script>
    import { enhance } from '$app/forms'
    import StarRating from '$lib/components/ui/StarRating.svelte'
    import { dev } from '$app/environment'
    import QRcode from "$lib/components/ui/QR.svelte"
    import { onMount } from 'svelte'
    import { compress, decompress } from '$lib/modules/jsoncompress.js'

    export let meta, pregame, game, postgame, form

    const strategies = [
        ['🔄 FULL CYCLE', 'cycle', false, '#0078d7'],
        ['🤝 RECIEVE & PLACE', 'place', false, '#33cc33'],
        ['🚚 TRANSPORTER', 'transport', false, '#f03a17'],
        ['🧱 DEFENSE', 'defense', false, '#f7894a'],
        ['💞 Moral Support', 'moral', false],
        ['💔 Brokedown', 'breakdown', false],
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

    $: final = {
        ...meta,
        pregame,
        game,
        postgame,
    }

    let showcode = false;
    let qrdata;

    onMount(() => {
        generateQrcode();
    });

    function generateQrcode() {
        console.log(final);
        qrdata = compress(final);
        console.log(qrdata);
    }

    function qrcode() {
        generateQrcode();
        showcode = !showcode;
    }

    let loading = false

    let online = false
    let qrDisable = false
</script>

<svelte:window bind:online />

<center class="w-full py-10">
    <h5 class="mb-2">Submit Entry</h5>
    <div class="boxing">
        <div class="grid grid-cols-1 justify-items-start pb-2 px-10">
            <h6 class="justify-self-center underline">Robot Strategy</h6>
            {#each strategies as s}
                <label>
                    <input type="checkbox" bind:checked={s[2]} />
                    <span style="color:{s?.[3]}">{s[0]}</span>
                </label>
            {/each}
        </div>
        <div class="py-1">
            <h6>Your Rating</h6>
            <StarRating editable bind:rating />
        </div>
        <div class="py-1">
            <h6>Driver Skill Rating</h6>
            <p class="text-xs opacity-50">Precision</p>
            <StarRating editable bind:rating={driverSkill} />
        </div>
        <div class="py-1">
            <h6>Speed Rating</h6>
            <p class="text-xs opacity-50">Maneuverability</p>
            <StarRating editable bind:rating={speed} />
        </div>
        {#if postgame.strategy.includes('defense')}
            <div class="py-1">
                <h6>Defense Rating</h6>
                <StarRating editable bind:rating={defense} />
            </div>
        {/if}
        <div class="flex flex-col pt-2">
            <h6>Final Thoughts</h6>
            <textarea class="h-20" bind:value={thoughts} />
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
                <input type="text" hidden name="data" value={JSON.stringify(final)} />
                <button
                    disabled={loading || postgame.strategy.length == 0}
                    on:click={() => {
                        console.log(final)
                    }}
                    class="mt-2 submit"
                    >{loading ? 'Loading...' : 'Submit'}</button>
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
        <br />
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
