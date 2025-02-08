<script lang="ts">

    import {decompress} from '$lib/modules/jsoncompress'
    import { Html5Qrcode } from 'html5-qrcode'
    import { onMount } from 'svelte'
    import { enhance } from '$app/forms'
    import { json } from '@sveltejs/kit'

    let scanning = false

    export let data;

    let html5Qrcode

    onMount(init)

    function init() {
        html5Qrcode = new Html5Qrcode("reader")
        start()
    }

    function start() {
        html5Qrcode.start(
            { facingMode: 'environment' },
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
            },
            onScanSuccess,
            onScanFailure
        )
        scanning = true
    }

    async function stop() {
        await html5Qrcode.stop()
        scanning = false
    }

    let text = ""

    function onScanSuccess(decodedText, decodedResult) {
        text = decodedText
        console.log(text)

    }

    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`)
    }

    $: final = JSON.stringify(text)

</script>

<reader id="reader"/>
<div class="w-screen justify-center">
    {#if scanning}
        <button class="w-screen bg-red-600 fill-red-600" on:click={stop}>Stop Camera</button>
    {:else}
        <button class="w-screen bg-green-500" on:click={start}>Start Camera</button>
    {/if}
</div>

<form method="POST" class="mx-auto w-fit m-2">
    <input hidden name="data" type="text" bind:value={final} />
    <button class="submit mx-auto rounded-md" disabled={!text} >Submit</button>
</form>

<div>
    <p class="underline font-extrabold mx-auto w-fit m-2">Data:</p>
    {text}
</div>
