<script>
    import coralImage from '$lib/assets/scout/2025/startingCoral.png'
    import algaeImage from '$lib/assets/scout/2025/Algae.png'

    export let coral
    export let algae
</script>

<div class="flex flex-row justify-center h-fit gap-2">
    <div class="h-8">

    </div>
    {#if coral}
        <div>
            <img class="h-10 -my-1 pr-6" src={coralImage} alt=""/>
        </div>
    {/if}
    {#if algae}
        <div>
            <img class="h-10 -my-1 pr-6" src={algaeImage} alt=""/>
        </div>
    {/if}
</div>