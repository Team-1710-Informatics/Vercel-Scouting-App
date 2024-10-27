<script>
    import { page } from "$app/stores";
</script>

<middle>
    <h6>{$page.status} {$page.error.message}</h6>
    {#if $page.status == 405}
        <p>Most likely a service issue, just refresh</p>
    {/if}
</middle>