<script>
    import coralImage from '$lib/assets/scout/2025/startingCoral.png'
    import algaeImage from '$lib/assets/scout/2025/Algae.png'

    export let coral
    export let algae
</script>

<div class="flex flex-row justify-evenly h-fit gap-2">
    {#if coral}
        <div>
            <img class="h-10 -my-1" src={coralImage} alt=""/>
        </div>
    {:else}
        <div>
            <img class="h-10 -my-1 opacity-20" src={coralImage} alt=""/>
        </div>
    {/if}
    {#if algae}
        <div>
            <img class="h-10 -my-1" src={algaeImage} alt=""/>
        </div>
    {:else}
        <div>
            <img class="h-10 -my-1 opacity-20" src={algaeImage} alt=""/>
        </div>
    {/if}

</div>