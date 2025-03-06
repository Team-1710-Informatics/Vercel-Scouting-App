<script>
    import startingArea from '$lib/assets/scout/2025/startingArea.png'
    import dozer from '$lib/assets/scout/dozer.png'

    const imgs = {
        red: startingArea,
        blue: startingArea,
    }

    export let team
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
    let rect
    let flipped = false

    $: style = `
        width:80px;
        height:80px;
        pointer-events: none;`

    function setStarting(event) {
        if (disabled) return
        if (!active) return
        rect = start.getBoundingClientRect()
        let x = Math.trunc(event.clientX - rect.left)
        let y = Math.abs(Math.trunc(event.clientY - rect.bottom))

        if (flipped) {
            x = rect.width - x
            y = rect.height - y
        }

        startValue.x = x
        startValue.y = y

        pointer = {
            x: event.clientX,
            y: event.clientY,
        }

        if (pointer.x < rect.left) pointer.x = rect.left
        if (pointer.x > rect.right) pointer.x = rect.right
        if (pointer.y < rect.top) pointer.y = rect.top
        if (pointer.y > rect.bottom) pointer.y = Math.floor(rect.bottom)

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

    function flipImage() {
        flipped = !flipped
    }
</script>

<svelte:window bind:innerHeight/>

{#if !disabled}
    <h1 class="text-xl mb-4"><b>Select Starting Position</b></h1>
    {#if team !== 'practice'}
        <h1 class="text-4xl mb-4"><b>Team {team.slice(3)}</b></h1>
    {:else}
        <h1 class="text-4xl mb-4"><b>Practice</b></h1>
    {/if}
    <div class="img-container">
        <img
                class="h-auto"
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
                style:transform={flipped ? 'scaleY(-1)' : 'none'}
        />
    </div>
    <button on:click={flipImage}>Flip Image</button>
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
                class="rounded-full w-2 h-2 {alliance == 'red' ? 'bg-red-600' : 'bg-blue-600'} border-2 border-black"
                style={styleAdd}
        />
    {/if}
{/if}

<style>
    .img-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: auto; /* Adjust height as needed */
        width: 250px; /* Adjust width as needed */
        overflow: hidden;
    }

    .img {
        height: 250px;
        width: 100px;
        touch-action: none;
        margin-bottom: 10px;
    }
</style>