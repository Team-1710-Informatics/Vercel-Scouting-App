<script>
    import { ApiService } from '$lib/components/data/2025/RobotCompatibility.js'

    export let team1
    export let team2
    export let team3

    let route
    let meow = ''

    let data = {
        compatibility: 0
    }

    export let compatibility = 0;

    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    $: offset = circumference * (1 - compatibility / 100);

    const startColor = { r: 59, g: 62, b: 134 };  // #3b3e86
    let endColor = { r: 62, g: 159, b: 133 };   // #3e9f85

    $: getColor = (compatibility) => {
        const r = Math.round(startColor.r + (endColor.r - startColor.r) * (compatibility / 100));
        const g = Math.round(startColor.g + (endColor.g - startColor.g) * (compatibility / 100));
        const b = Math.round(startColor.b + (endColor.b - startColor.b) * (compatibility / 100));

        return `rgb(${r}, ${g}, ${b})`;
    };

    let fetching = false;
    let increasing = true;
    let displaying = false;
    let show = false;

    async function fetch() {
        try {
            meow = ''
            fetching = false;
            increasing = true;
            displaying = false;
            show = false;
            console.log('fetching data')
            if (team3 !== '') {
                route = `/auto/compare/data/events/${team1}/${team2}/${team3}`
            }
            else {
                route = `/auto/compare/data/events/${team1}/${team2}`
            }
            fetching = true;
            show = false;
            loading();
            const response = await ApiService.request(route)
            data = await response
            fetching = false;
            display(data.compatibility);
        } catch (error) {
            console.error('Error fetching data:', error)
            fetching = false;
            display('error');
        }
    }

    function loading() {
        increasing = false
        let interval = setInterval(() => {
            // Easing function for smooth acceleration & deceleration
            let progressFactor = Math.sin((compatibility / 100) * Math.PI);
            let speed = 0.125 + progressFactor;

            if (increasing) {
                compatibility += speed;
                if (compatibility >= 100) {
                    compatibility = 100;
                    increasing = false;
                }
            } else {
                compatibility -= speed;
                if (compatibility <= 0.1) {
                    compatibility = 0.1;
                    endColor = { r: 62, g: 159, b: 133 }
                    // Stop animation ONLY when fetching is false AND we've reached 0
                    if (!fetching) {
                        clearInterval(interval);
                    } else {
                        increasing = true; // Otherwise, continue looping
                    }
                }
            }
        }, 10);
    }


    function display(goal) {
        // Wait until compatibility reaches 0 before starting
        let waitForReset = setInterval(() => {
            if (compatibility === 0.1) {
                if(goal !== 'error'){
                    show = true;
                    clearInterval(waitForReset); // Stop waiting and start animation
                    startAnimation(goal);
                }
                else {
                    show = true;
                    meow = ':('
                    clearInterval(waitForReset); // Stop waiting and start animation
                    endColor = { r: 220, g: 4, b: 55 }
                    startAnimation(100);
                }
            }
        }, 10);
    }

    function startAnimation(goal) {
        displaying = true;

        let interval = setInterval(() => {
            if (!displaying) {
                clearInterval(interval);
                return;
            }

            let distance = Math.abs(goal - compatibility); // Remaining distance
            let compatibilityFactor = Math.sin((distance / goal) * Math.PI); // Easing
            let speed = 0.125 + compatibilityFactor;

            if (compatibility < goal) {
                compatibility += speed;
                if (compatibility >= goal) {
                    compatibility = goal;
                    displaying = false;
                    clearInterval(interval); // Stop when done
                }
            }
        }, 10);
    }
</script>
<svg width="auto" height="auto" viewBox="0 0 100 100">
    <circle
        cx="50" cy="50" r="{radius}"
        stroke="#1d293d" stroke-width="9" fill="none" stroke-dasharray="{circumference}"
    />
    <circle
        cx="50" cy="50" r="{radius}"
        stroke={getColor(compatibility)} stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="{circumference}" stroke-dashoffset="{offset}"
        transform="rotate(90 50 50)"
    />

    {#if show}
        {#if meow === ':('}
            <text
                x="46" y="58" text-anchor="middle"
                font-size="28" font-family="sans-serif" font-weight="600" font-stretch="ultra-expanded"
                fill="#93a1af"
            >
                {meow}
            </text>
        {:else}
            <text
                x="50" y="60" text-anchor="middle"
                font-size="28" font-family="sans-serif" font-weight="600" font-stretch="ultra-expanded"
                fill="#93a1af"
            >
                {compatibility.toFixed(0)}
            </text>
        {/if}
    {/if}
</svg>
<!--<input type="text" bind:value={event} />-->
<!--<input type="text" bind:value={team1} />-->
<!--<input type="text" bind:value={team2} />-->
<!--<input type="text" bind:value={team3} />-->
<button on:click={fetch}>Fetch</button>
<!--{JSON.stringify(data)}-->