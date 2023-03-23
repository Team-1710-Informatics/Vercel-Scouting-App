<script>
    import Logofy from "$lib/components/visual/Logofy/Logofy.svelte";

    let width;
</script>

<svelte:window bind:innerWidth={width}/>

<div class="py-10 px-2">
    <Logofy size={32} contenteditable>1710</Logofy>
</div>