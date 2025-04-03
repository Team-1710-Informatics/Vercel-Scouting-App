<script>
    import {page} from '$app/stores'
</script>

<div class="middle">
    <h6>{$page.status} {$page.error.message}</h6>
    {#if $page.status == 405}
        <p>Most likely a service issue, just refresh</p>
    {/if}
</div>
