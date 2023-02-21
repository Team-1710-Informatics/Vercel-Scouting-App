<script>
    import Inventory from "./Inventory.svelte";


    export let meta;

    let log = [];
</script>

<h5>Scouting {meta.team}</h5>
<br>
<Inventory bind:log={log} />

<!-- {JSON.stringify(log)} -->