<script>
    import coralImage from '$lib/assets/scout/2025/startingCoral.png'
    import algaeImage from '$lib/assets/scout/2025/Algae.png'

    export let coral
    export let algae
</script>

<div class="flex flex-row mt-5 justify-center h-2 m-4  ">
    <h1 class="my-auto mr-2">Inventory:</h1>
    {#if coral}
        <div>
            <img class="h-12" src={coralImage} alt=""/>
        </div>
    {/if}
    {#if algae}
        <div>
            <img class="h-12" src={algaeImage} alt=""/>
        </div>
    {/if}
</div>