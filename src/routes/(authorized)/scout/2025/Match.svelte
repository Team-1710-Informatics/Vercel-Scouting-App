<script>
    import Timer from './Timer.svelte';
    import {createEventDispatcher} from "svelte";
    import reefRed from '$lib/assets/scout/2025/reefred.png';

    const dispatch = createEventDispatcher();

    export let meta;
    export let pregame;
    export let game;
    export let amplified;

    let inv = pregame.preload;
    let log = [];
    let untimed = {};

    $: answered = (() => {
        let res = true;
        ['exitAuto', 'parkMatch', 'hangMatch', 'cageLevel'].forEach((q) => {
            if (untimed?.[q] == null) res = false;
        });
        return res;
    })();

    function undo() {
        if (log.length === 1) {
            if (log[0].time === -1) {
                state.start = 0;
                state.time = 0;
                state.started = false;
                return;
            }
        } else if (log.length === 0) {
            state.start = 0;
            state.time = 0;
            state.started = false;
            return;
        }
        log.pop();
        inv = !inv;
        log = log;
    }

    if (pregame.preload) {
        log.push({
            time: -1,
            action: 'intake',
            location: 'preload',
            phase: 'pregame',
        });
        log = log;
    }

    let state = {
        time: 0,
        started: false,
        start: 0,
        phase: 'preGame',
    };

    const numSlices = 6;
    const radius = 50; // Radius of the hexagon (half of SVG viewBox size)
    const angleStep = (2 * Math.PI) / numSlices;

    const slices = Array.from({length: numSlices}, (_, i) => {
        const startAngle = i * angleStep;
        const endAngle = (i + 1) * angleStep;

        const x1 = Math.cos(startAngle) * radius;
        const y1 = Math.sin(startAngle) * radius;
        const x2 = Math.cos(endAngle) * radius;
        const y2 = Math.sin(endAngle) * radius;

        return `
      M 0 0
      L ${x1} ${y1}
      A ${radius} ${radius} 0 0 1 ${x2} ${y2}
      Z
    `;
    });

    const hexagonPath = Array.from({length: 6}, (_, i) => {
        const angle = (Math.PI / 3) * i;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return `${x},${y}`;
    }).join(' ');

    const handleClick = (index) => {
        alert(`Slice ${index + 1} selected!`);
    };
</script>

<Timer bind:state/> <br/>

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
                />
            {/each}
        </g>
    </svg>
</div>

<style>
    .hexagon-container {
        position: relative;
        width: 300px;
        height: 300px;
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
        fill: rgba(144, 144, 202, 0.5);
        opacity: 0.5;
    }
</style>
