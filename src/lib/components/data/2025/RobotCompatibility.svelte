<script>
    import { ApiService } from '$lib/components/data/2025/RobotCompatibility.js'

    export let team1
    export let team2
    export let team3
    export let event

    $: data = {compatibility: ""} // data is an object because the API returns an object, but we only need the compatibility value
    $: route = `/auto/compare/data${event}${team1}${team2}${team3}`
    let tried = '' //This variable is used to prevent the API from being called on a loop
    let success = false

    // The syntax of this function is set up to rerun on a change in the variables
    $: if (team1 && team2 && event && (route !== tried)) {
        (async () => {
            try {
                tried = route
                console.log('fetching data')
                const response = await ApiService.request(route)
                data = await response.json()
                success = true
            } catch (error) {
                success = false
                console.error('Error fetching data:', error)
            }
        })();
    }
</script>
<div class="flex flex-row">
    <label for="compatibility">Compatibility:</label>
    <progress id="compatibility" value={data.compatibility} max="100" class="h-4 my-auto rounded-md"></progress>
    {#if success}
        <!--The if statement is so that it doesn't just display a 0 when-->
        <div class="mx-2">{data.compatibility.toFixed(2)}%</div>
    {/if}
</div>