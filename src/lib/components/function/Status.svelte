<script>
    import { onDestroy, onMount } from "svelte";

    export let value;
    export let host;

    onMount(()=>{
        fetch(`https://${host}/internal/status/${value}`);
    })

    onDestroy(async function(){
        const current = (await ((await fetch(`https://${host}/internal/status/`)).json())).status;
        if(current == value) await fetch(`https://${host}/internal/status/${"offline"}`);
    })
</script>