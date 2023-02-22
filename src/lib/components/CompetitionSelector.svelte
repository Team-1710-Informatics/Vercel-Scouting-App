<script>
    /**
     * The selected event
     */
    export let event = null;

    /**
     * An array recieved from https://thebluealliance.com/api/v3/events/{year}
     */
    export let events = null;

    export let disabled = false;
</script>

{#if events === null}
    <input type="text" bind:value={event} {disabled}/>
{:else}
    <div>
        <select class="text-sm" style="max-width:210px; text-overflow:ellipsis" bind:value={event} {disabled}>
            <option value={null}>Select an event...</option>
            {#each events as e}
                <option style="text-overflow:ellipsis" value={e.key}>{e.short_name!=""?e.short_name:e.name}</option>
            {/each}
        </select>
        <p class="text-xs text-gray-400">Powered by <span class="font-bold">The Blue Alliance</span></p>
    </div>
{/if}