<script>
    import Status from "$lib/components/function/Status.svelte";

    export let data;
</script>

<Status value="scambling" host={data.host}/>

<slot />
