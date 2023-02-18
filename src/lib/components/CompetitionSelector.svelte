<script>
    import { X_TBA_AUTHKEY } from "$env/static/private";

    export let event = null;

    const year = new Date().getFullYear();

    let events = null;
    async function load(){
        const res = await fetch(`https://thebluealliance.com/events/${year}/simple`);
        events = await res.json();
    }
</script>

{#if events == null}
    Loading...
{:else}
    <select bind:value={event}>
        {#each events as event}
            <option value={event.key}>{event.name}</option>
        {/each}
    </select>
{/if}