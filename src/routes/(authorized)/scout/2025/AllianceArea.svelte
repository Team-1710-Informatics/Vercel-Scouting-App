<script>
    import startingCoral from '$lib/assets/scout/2025/transparentCoral.png'

    export let coral
    export let log
    export let selected
    export let state
    export let flip = true

    let scores = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ]

    function score(level, success) {
        if (!state.started) return
        console.log('scoring')
        console.log(scores)
        if (coral) {
            selected = { location: 'reef', level: level }
            let action = 'score'
            if (success) {
                scores[level - 1][0]++
            } else {
                scores[level - 1][1]++
                action = 'miss'
            }
            log.push({
                time: state.time,
                action: action,
                ...selected,
                phase: state.phase,
                item: 'coral',
            })
            coral = false
        }
        scores = scores
    }

    function select(location) {
        if (!state.started) return
        selected = { location: '' }
        selected.location = location

        if (!coral) {
            coral = true

            log.push({
                time: state.time,
                action: 'intake',
                ...selected,
                phase: state.phase,
                item: 'coral',
            })
        }
    }
</script>

<div
    class="basis-1/5 bg-slate-800 flex flex-row justify-center items-center opacity-80 hover:opacity-100 transition-opacity ease-in
    {flip
        ? 'angled-corner rounded-tr-3xl'
        : 'flipped-angled-corner-bottom rounded-tl-3xl'}
"
    class:brightness-200={selected.location === 'coral_station_left'}
    class:disabled={!state.started}
    on:click={() => {
        select('coral_station_left')
    }}
    style="width: 70%"
>
    <p class="ml-8 -mr-14 -mt-1 mb-3">Far</p>
    <img class="h-16 w-16 ml-12" src={startingCoral} />
</div>
<div class="basis-3/5 flex flex-col justify-between w-full my-1">
    <div
        class="bg-blue-800 flex my-1 rounded-md w-auto {flip
            ? 'mr-2 flex-row'
            : 'ml-2 flex-row-reverse'}"
        style="height:20%"
    >
        <button
            class="text-xs basis-1/2 {flip
                ? 'border-r-2'
                : 'border-l-2'} border-black"
            on:click={() => {
                score(4, true)
            }}
        >
            Score L4
            {scores[3][0]}
        </button>
        <button
            class="text-xs basis-1/2"
            on:click={() => {
                score(4, false)
            }}
        >
            Miss L4
            {scores[3][1]}
        </button>
    </div>
    <div
        class="bg-blue-600 flex my-1 rounded-md w-auto {flip
            ? 'mr-2 flex-row'
            : 'ml-2 flex-row-reverse'}"
        style="height:20%"
    >
        <button
            class="text-xs basis-1/2 {flip
                ? 'border-r-2'
                : 'border-l-2'} border-black"
            on:click={() => {
                score(3, true)
            }}
        >
            Score L3
            {scores[2][0]}
        </button>
        <button
            class="text-xs basis-1/2"
            on:click={() => {
                score(3, false)
            }}
        >
            Miss L3
            {scores[2][1]}
        </button>
    </div>
    <div
        class="bg-blue-800 flex my-1 rounded-md w-auto {flip
            ? 'mr-2 flex-row'
            : 'ml-2 flex-row-reverse'}"
        style="height:20%"
    >
        <button
            class="text-xs basis-1/2 {flip
                ? 'border-r-2'
                : 'border-l-2'} border-black"
            on:click={() => {
                score(2, true)
            }}
        >
            Score L2
            {scores[1][0]}
        </button>
        <button
            class="text-xs basis-1/2"
            on:click={() => {
                score(2, false)
            }}
        >
            Miss L2
            {scores[1][1]}
        </button>
    </div>
    <div
        class="bg-blue-600 flex my-1 rounded-md w-auto {flip
            ? 'mr-2 flex-row'
            : 'ml-2 flex-row-reverse'}"
        style="height:20%"
    >
        <button
            class="text-xs basis-1/2 {flip
                ? 'border-r-2'
                : 'border-l-2'} border-black"
            on:click={() => {
                score(1, true)
            }}
        >
            Score L1
            {scores[0][0]}
        </button>
        <button
            class="text-xs basis-1/2"
            on:click={() => {
                score(1, false)
            }}
        >
            Miss L1
            {scores[0][1]}
        </button>
    </div>
</div>
<div
    class="basis-1/5 bg-slate-800 angled-corner-bottom rounded-br-3xl flex flex-row justify-center items-center opacity-80 hover:opacity-100 transition-opacity ease-in
{flip
        ? 'angled-corner-bottom rounded-br-3xl'
        : 'flipped-angled-corner rounded-bl-3xl'}"
    class:brightness-200={selected.location === 'coral_station_right'}
    class:disabled={!state.started}
    on:click={() => {
        select('coral_station_right')
    }}
    style="width: 70%"
>
    <p class="ml-8 -mr-14 mt-3 mb-1">Near</p>
    <img class="h-16 w-16 ml-12" src={startingCoral} />
</div>

<style>
    .angled-corner {
        clip-path: polygon(
            0 0,
            100% 0,
            100% 100%,
            4rem 100%,
            0 calc(100% - 2rem)
        );
    }

    .angled-corner-bottom {
        clip-path: polygon(0 2rem, 4rem 0, 100% 0, 100% 100%, 0 100%);
    }

    .flipped-angled-corner {
        clip-path: polygon(
            0 0,
            calc(100% - 4rem) 0,
            100% 2rem,
            100% 100%,
            0 100%
        );
    }

    .flipped-angled-corner-bottom {
        clip-path: polygon(
            0 0,
            100% 0,
            100% calc(100% - 2rem),
            calc(100% - 4rem) 100%,
            0 100%
        );
    }

    .disabled {
        opacity: 0.5;
        filter: brightness(0.5);
        cursor: not-allowed;
    }
</style>
