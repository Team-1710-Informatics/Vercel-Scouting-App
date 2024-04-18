<script>
    import Logofy from "$lib/components/visual/Logofy/Logofy.svelte";

    let width;
    let logoWidth;
    let logoHeight;

    let text;
    let size;
</script>

<svelte:window bind:innerWidth={width}/>

<div class="py-10 w-full relative mb-10" style="width:{width}px; height:{logoHeight}px">
    <div class="px-0 absolute" bind:clientWidth={logoWidth} bind:clientHeight={logoHeight} style="left:{(width-logoWidth)/2}px">
        <Logofy bind:size={size} bind:text={text}/>
    </div>
</div>

<div style="height:{logoHeight}px"/>

<middle>
    <textarea bind:value={text}/>
    <input type="range" min=24 max=64 bind:value={size}/>
    {#if text=="paint"}
        <a href="/paint"><u>PAINT ME</u></a>
    {/if}
</middle>

