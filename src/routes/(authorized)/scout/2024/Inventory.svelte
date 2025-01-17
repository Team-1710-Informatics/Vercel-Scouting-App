<script>
    import note from '$lib/assets/scout/2024/note.png'

    export let inv
</script>

<div class="flex flex-row mt-5 justify-center h-12">
    <h1 class="my-auto mr-2">Inventory:</h1>
    <!--ONE LINE BREAK DIDNT WORK-->
    {#if inv}
        <div>
            <img class="h-12" src={note} alt="" />
        </div>
    {/if}
</div>
