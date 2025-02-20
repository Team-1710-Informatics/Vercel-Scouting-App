<script>
    import { ApiService } from '$lib/components/data/2025/RobotCompatibility.js'

    export let team1
    export let team2
    export let team3
    export let event

    let route

    $: data = {compatibility: ""}

    // $: if (team1 && team2 && event && (route !== tried)) {
    //     (async () => {
    //         try {
    //             tried = route
    //             console.log('fetching data')
    //             const response = await ApiService.request(route)
    //             data = await response.json()
    //             success = true
    //         } catch (error) {
    //             success = false
    //             console.error('Error fetching data:', error)
    //         }
    //     })();
    // }

    async function fetch() {
        try {
            console.log('fetching data')
            if (team3 !== '') {
                route = `/auto/compare/data/${event}/${team1}/${team2}/${team3}`
            }
            else {
                route = `/auto/compare/data/${event}/${team1}/${team2}`
            }
            const response = await ApiService.request(route)
            data = await response.json()
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    export let progress = 0;

    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    $: offset = circumference * (1 - progress / 100);

    $: getColor = (progress) => {
        const startColor = { r: 59, g: 62, b: 134 };  // #3b3e86
        const endColor = { r: 62, g: 159, b: 133 };   // #3e9f85

        const r = Math.round(startColor.r + (endColor.r - startColor.r) * (progress / 100));
        const g = Math.round(startColor.g + (endColor.g - startColor.g) * (progress / 100));
        const b = Math.round(startColor.b + (endColor.b - startColor.b) * (progress / 100));

        return `rgb(${r}, ${g}, ${b})`;
    };

    // let increasing = false;
    //
    // function animateProgress() {
    //     let interval = setInterval(() => {
    //         if (increasing) {
    //             progress += 0.5;
    //             if (progress >= 100) {
    //                 increasing = false;
    //             }
    //         } else {
    //             progress -= 2;
    //             if (progress <= 0) {
    //                 increasing = true;
    //             }
    //         }
    //     }, 25);
    // }
    //
    // animateProgress();
</script>
<svg width="200" height="200" viewBox="0 0 100 100">
    <circle
        cx="50" cy="50" r="{radius}"
        stroke="#1d293d" stroke-width="9" fill="none" stroke-dasharray="{circumference}"
    />
    <circle
        cx="50" cy="50" r="{radius}"
        stroke={getColor(progress)} stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="{circumference}" stroke-dashoffset="{offset}"
        transform="rotate(90 50 50)"
    />

    <text
        x="50" y="60" text-anchor="middle"
        font-size="28" font-family="sans-serif" font-weight="600" font-stretch="ultra-expanded"
        fill="#93a1af"
    >
        {progress.toFixed(0)}
    </text>
</svg>
<!--<input type="text" bind:value={event} />-->
<!--<input type="text" bind:value={team1} />-->
<!--<input type="text" bind:value={team2} />-->
<!--<input type="text" bind:value={team3} />-->
<!--<button on:click={fetch}>Fetch</button>-->
<!--{JSON.stringify(data)}-->