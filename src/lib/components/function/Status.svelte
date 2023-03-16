<script>
    import { onDestroy, onMount } from "svelte";

    export let value;
    export let host;

    onMount(()=>{
        fetch(`http://${host}/internal-api/status/${value}`);
    })

    onDestroy(async function(){
        const current = (await ((await fetch(`http://${host}/internal-api/status/`)).json())).status;
        if(current == value) await fetch(`http://${host}/internal-api/status/${"offline"}`);
    })
</script>