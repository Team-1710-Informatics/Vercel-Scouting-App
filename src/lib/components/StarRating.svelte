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
                <img src={full} class="invert w-full" alt="full">
            {:else if rating - i*2 == 1}
                <img src={half} class="invert w-full" alt="half">
            {:else}
                <img src={star} class="invert w-full" alt="null">
            {/if}
        {/each}
    </div>

    {#if editable}
        <input type="range" max={stars*2} bind:value={rating}/>
    {/if}
</div>
