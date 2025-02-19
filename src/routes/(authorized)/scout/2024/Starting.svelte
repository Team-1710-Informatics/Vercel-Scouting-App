<script>
    import blueStart from '$lib/assets/scout/2024/blue_starting.png'
    import redStart from '$lib/assets/scout/2024/red_starting.png'
    import dozer from '$lib/assets/scout/dozer.png'

    const imgs = {
        red: redStart,
        blue: blueStart,
    }

    export let alliance
    export let disabled = false

    export let startValue = {
        x: NaN,
        y: NaN,
    }

    let innerHeight
    let active = false

    let start
    let dozerCoords
    let pointer = {
        x: undefined,
        y: undefined,
    }

    let styleAdd

    $: style = `
        width:80px;
        height:80px;
        pointer-events: none;`

    let rect

    function setStarting(event) {
        if (disabled) return
        if (!active) return
        console.log(startValue.x, startValue.y)
        rect = start.getBoundingClientRect()
        startValue.x = Math.trunc(event.clientX - rect.left)
        startValue.y = Math.abs(Math.trunc(event.clientY - rect.bottom))

        pointer = {
            x: event.clientX,
            y: event.clientY,
        }

        if (pointer.x < rect.left) pointer.x = rect.left
        if (pointer.x > rect.right) pointer.x = rect.right
        if (pointer.y < rect.top) pointer.y = rect.top
        if (pointer.y > rect.bottom) pointer.y = Match.floor(rect.bottom)

        styleAdd = `
            position:absolute;
            top:${pointer.y - 2}px;
            left:${pointer.x - 5}px;
            pointer-events: none;
            touch-action: none;
        `
        style = `
            position:absolute;
            top:${pointer.y - 40}px;
            left:${pointer.x - 40}px;
            width:80px;
            height:80px;
            pointer-events: none;
            touch-action: none;
            `
    }
</script>

<svelte:window bind:innerHeight />

{#if !disabled}
    <h1 class="text-xl mt-2 mb-4"><b>Select Starting Position</b></h1>
    <img
        class="img"
        alt=""
        src={imgs[alliance]}
        draggable="false"
        bind:this={start}
        on:pointerdown={() => {
            active = true
        }}
        on:touchstart={() => {
            active = true
        }}
        on:pointerup={() => {
            active = false
        }}
        on:touchend={() => {
            active = false
        }}
        on:pointermove={setStarting}
    />
    <h1 class="text-xs">Drag on the Field to Place Robot</h1>
    {#if pointer.y}
        <img
            id="dozer"
            {style}
            alt=""
            draggable="false"
            src={dozer}
            bind:this={dozerCoords}
        />
        <div
            class="rounded-full w-2 h-2 {alliance == 'red'
                ? 'bg-red-600'
                : 'bg-blue-600'} border-2 border-black"
            style={styleAdd}
        />
    {/if}
{/if}

<style>
    .img {
        height: 250px;
        width: 100px;
        touch-action: none;
    }
</style>
