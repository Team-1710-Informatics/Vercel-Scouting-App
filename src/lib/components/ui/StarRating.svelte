<script>
    import star from "$lib/assets/icons/star.svg";
    import half from "$lib/assets/icons/star-half.svg";
    import full from "$lib/assets/icons/star-fill.svg";

    export let stars = 5;
    export let rating = stars;
    export let editable = false;

    let w;
</script>

<div class="flex flex-col">
    <div class="grid" style="grid-template-columns: repeat({stars}, minmax(0, 1fr));">
        {#each [...Array(5).keys()] as i}
            {#if rating - i*2 >= 2}
                <img src={full} class="invert star w-9 h-9" alt="full">
            {:else if rating - i*2 == 1}
                <img src={half} class="invert star w-9 h-9" alt="half">
            {:else}
                <img src={star} class="invert star w-9 h-9" alt="null">
            {/if}
        {/each}
    </div>

    {#if editable}
        <input class="h-9 -mt-9 z-10 opacity-0" type="range" max={stars*2} bind:value={rating}/>
    {/if}
</div>

<style>
    .star {
        filter: brightness(0) saturate(100%) invert(92%) sepia(61%) saturate(420%) hue-rotate(155deg) brightness(105%) contrast(104%);
    }
</style>