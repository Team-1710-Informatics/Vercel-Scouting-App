<script>
    import reefRed from '$lib/assets/scout/2025/reef.png'
    import branchRight3 from '$lib/assets/scout/2025/branchright3.png'
    import branchRight2 from '$lib/assets/scout/2025/branchright2.png'
    import branchRight1 from '$lib/assets/scout/2025/branchright1.png'
    import branchRight0 from '$lib/assets/scout/2025/branchright0.png'

    let activeSlice = null

    export let selected
    export let item
    export let log
    export let algae
    export let state
    export let flip = true

    const numSlices = 6
    const radius = 50 // Radius of the hexagon (half of SVG viewBox size)
    const angleStep = (2 * Math.PI) / numSlices

    const slices = Array.from({ length: numSlices }, (_, i) => {
        const startAngle = i * angleStep
        const nextAngle = (i + 1) * angleStep

        const x1 = Math.cos(startAngle) * radius
        const y1 = Math.sin(startAngle) * radius
        const x2 = Math.cos(nextAngle) * radius
        const y2 = Math.sin(nextAngle) * radius

        // Create a path for a straight-edged hexagon slice
        return `
      M 0 0
      L ${x1} ${y1}
      L ${x2} ${y2}
      Z
    `
    })

    const hexagonPath = Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI / 3) * i + Math.PI / 6 // Rotate by 30 degrees
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        return `${x},${y}`
    }).join(' ')

    export let reefActive = false

    let hoveredSlice

    $: if (selected.location !== 'reef') {
        hoveredSlice = null
    }

    const handleClick = (index) => {
        hoveredSlice = index
        activeSlice = index - 2
        if (activeSlice < 0) {
            if (activeSlice === -1) {
                activeSlice = 5
            } else if (activeSlice === -2) {
                activeSlice = 4
            } else {
                activeSlice = 3
            }
        }

        reefActive = true
        item = 'algae'
        selected = { location: 'reef', branch: activeSlice }
    }

    function intakeAlgae() {
        if (!state.started) return
        item = 'algae'
        if (!algae) {
            log.push({
                time: state.time,
                action: 'intake',
                ...selected,
                phase: state.phase,
                item: item,
            })
            algae = true
        }
    }
</script>

<div
    class="flex flex-row h-full items-center basis-3/4 justify-center"
    class:flex-row-reverse={!flip}
    style="max-height: 100%"
>
    <div class="flex flex-col gap-2 justify-center items-center">
        <div
            class="hexagon-container flex flex-col items-center justify-center"
        >
            <div class="image-container">
                <img alt="Reef Red" class="hexagon-image" src={reefRed} />
            </div>
            <svg class="hexagon" viewBox="-50 -50 100 100">
                <g class="slices">
                    {#each slices as path, index}
                        <path
                            class="slice"
                            d={path}
                            on:click={() => handleClick(index)}
                            class:selected={hoveredSlice === index}
                            on:keypress={() => handleClick(index)}
                        />
                    {/each}
                </g>
            </svg>
        </div>
        <div
            class="rounded-md shadow-xl bg-green-500 p-2 w-36 h-10"
            class:disabled={!state.started}
            on:click={intakeAlgae}
        >
            Intake Algae
        </div>
    </div>
    <div class="flex flex-col" style="flex-basis: 25%">
        <img
            class="branch branch-right"
            class:selected_2={selected.level === 4}
            class:flip-horizontal={!flip}
            src={branchRight3}
        />
        <img
            class="branch branch-right"
            class:selected_2={selected.level === 3}
            class:flip-horizontal={!flip}
            src={branchRight2}
        />
        <img
            class="branch branch-right"
            class:selected_2={selected.level === 2}
            class:flip-horizontal={!flip}
            src={branchRight1}
        />
        <img
            class="branch branch-right"
            class:selected_2={selected.level === 1}
            class:flip-horizontal={!flip}
            src={branchRight0}
        />
    </div>
</div>

<style>
    @keyframes slideOutLeft {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-100%);
            opacity: 0;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .hexagon-container {
        position: relative;
        width: 14rem;
        height: 14rem;
    }

    .image-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        clip-path: polygon(var(--hexagon-path));
    }

    .hexagon-image {
        width: 114%;
        height: 114%;
        object-fit: scale-down;
        transform: translate(-50%, -50%) scale(0.8) rotate(300deg); /* Rotate by 300 degrees (or -60 degrees) */
        position: absolute;
        top: 50%;
        left: 50%;
    }

    .hexagon {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2;
    }

    .slice {
        fill: transparent;
        transition: fill 0.3s;
        cursor: pointer;
        transform: rotate(30deg); /* Rotate by 30 degrees */
    }

    .slice:hover {
        fill: rgba(175, 175, 221, 0.47);
        opacity: 0.5;
    }

    .selected {
        fill: rgba(144, 144, 202, 0.47);
        filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.75));
        opacity: 0.5;
    }

    .branch {
        width: 100%; /* Ensure all images have the same width */
        height: auto; /* Maintain aspect ratio */
        object-fit: cover; /* Scale the image to fill the space */
        opacity: 0; /* Hidden by default */
        animation-duration: 0.5s; /* Animation duration */
        animation-fill-mode: forwards; /* Keep the final state */
        filter: brightness(75%);
        transition: filter 0.3s ease;
    }

    .branch-left {
        animation-name: slideInRight;
    }

    .branch-right {
        animation-name: slideInLeft;
    }

    .selected_2 {
        filter: brightness(150%);
        filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.75));
    }

    @keyframes slideInLeft {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .disabled {
        opacity: 0.5;
        filter: brightness(0.5);
        cursor: not-allowed;
    }

    .flip-horizontal {
        transform: scaleX(-1) !important;
    }
</style>
