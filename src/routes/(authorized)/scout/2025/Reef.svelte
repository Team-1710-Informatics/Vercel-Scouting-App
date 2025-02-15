<script>
    import branchLeft3 from "$lib/assets/scout/2025/branchleft3.png";
    import branchLeft2 from "$lib/assets/scout/2025/branchleft2.png";
    import branchLeft1 from "$lib/assets/scout/2025/branchleft1.png";
    import branchLeft0 from "$lib/assets/scout/2025/branchleft0.png";
    import reefRed from "$lib/assets/scout/2025/reef.png";
    import branchRight3 from "$lib/assets/scout/2025/branchright3.png";
    import branchRight2 from "$lib/assets/scout/2025/branchright2.png";
    import branchRight1 from "$lib/assets/scout/2025/branchright1.png";
    import branchRight0 from "$lib/assets/scout/2025/branchright0.png";

    import algae from '$lib/assets/scout/2025/algaetransparent.png'

    let activeSlice = null;

    export let selected;
    export let item;

    const numSlices = 6;
    const radius = 50; // Radius of the hexagon (half of SVG viewBox size)
    const angleStep = (2 * Math.PI) / numSlices;

    const slices = Array.from({length: numSlices}, (_, i) => {
        const startAngle = i * angleStep;
        const nextAngle = (i + 1) * angleStep;

        const x1 = Math.cos(startAngle) * radius;
        const y1 = Math.sin(startAngle) * radius;
        const x2 = Math.cos(nextAngle) * radius;
        const y2 = Math.sin(nextAngle) * radius;

        // Create a path for a straight-edged hexagon slice
        return `
      M 0 0
      L ${x1} ${y1}
      L ${x2} ${y2}
      Z
    `;
    });

    const hexagonPath = Array.from({length: 6}, (_, i) => {
        const angle = (Math.PI / 3) * i;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return `${x},${y}`;
    }).join(' ');

    export let reefActive = false;

    let hoveredSlice

    const handleClick = (index) => {
        hoveredSlice = index
        activeSlice = index - 3;
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
        item = "algae"
        selected = {location: 'reef', branch: activeSlice}
    };

    let algae_locations = [
        1,
        1,
        1,
        1,
        1,
        1,
    ]

    function scoreReef(level) {
        // activeSlice = -1;
        // reefActive = false;
        selected = {location: "reef", branch: activeSlice}
        selected.level = level
        item = "coral"
    }

    export function intakeEvent() {
        if (algae_locations[activeSlice] === 0) {
            return false
        }

        algae_locations[activeSlice] = 0
        algae_locations = algae_locations
        return true
    }
</script>

<div class="flex flex-row justify-center">
    {#if reefActive}
        <div class="flex flex-col max-h-16 pt-4">
            <img class="w-20 branch branch-left" src={branchLeft3}
                 on:click={() => scoreReef(3)}>
            <img class="w-20 branch branch-left" src={branchLeft2}
                 on:click={() => scoreReef(2)}>
            <img class="w-20 branch branch-left" src={branchLeft1}
                 on:click={() => scoreReef(1)}>
            <img class="w-20 branch branch-left" src={branchLeft0}
                 on:click={() => scoreReef(0)}>
        </div>
        {#if algae_locations[activeSlice] === 1}
            <img src={algae}
                 class="w-20 h-20 -ml-7 -mr-10 mt-2 branch-left z-20">
        {:else}
            <img src={algae}
                 class="w-20 h-20 -ml-7 -mr-10 mt-2 branch-left z-20 opacity-5">
        {/if}
    {/if}

    <div class="hexagon-container">
        <div class="image-container">
            <img alt="Reef Red" class="hexagon-image" src={reefRed}/>
        </div>
        <svg class="hexagon" viewBox="-50 -50 100 100">
            <g class="slices">
                {#each slices as path, index}
                    <path
                            class="slice"
                            d={path}
                            on:click={() => handleClick(index)}
                            class:selected={hoveredSlice===index}
                    />
                {/each}
            </g>
        </svg>
    </div>
    {#if reefActive}
        {#if algae_locations[activeSlice] === 1 }
            <img src={algae} class="w-20 h-20 -mr-7 -ml-10 mt-2 branch-right z-20">
        {:else}
            <img src={algae} class="w-20 h-20 -mr-7 -ml-10 mt-2 branch-left z-20 opacity-5">
        {/if}
        <div class="flex flex-col max-h-14 pt-4">
            <img class="w-20 branch branch-right" src={branchRight3} on:click={() => scoreReef(3)}>
            <img class="w-20 branch branch-right" src={branchRight2} on:click={() => scoreReef(2)}>
            <img class="w-20 branch branch-right" src={branchRight1} on:click={() => scoreReef(1)}>
            <img class="w-20 branch branch-right" src={branchRight0} on:click={() => scoreReef(0)}>
        </div>
    {/if}
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
        width: 16rem;
        height: 16rem;
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
        width: 100%;
        height: 114%;
        object-fit: cover;
        transform: translate(-50%, -50%) scale(0.8) rotate(270deg); /* Scale down to 80% and center */
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
    }

    .slice:hover {
        fill: rgba(175, 175, 221, 0.47);
        opacity: 0.5;
    }

    .selected {
        fill: rgba(144, 144, 202, 0.47);
        opacity: 0.5;
    }

    .branch {
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

    .branch:hover {
        filter: brightness(120%);
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
        filter: brightness(30%);
    }
</style>