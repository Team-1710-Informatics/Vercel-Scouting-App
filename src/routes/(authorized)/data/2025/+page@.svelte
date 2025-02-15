<script>
    import AllianceSelection from "./AllianceSelection.svelte";

    let allianceSelection;

    let pickedAlliances = [];

    function getPickedAlliances() {
        pickedAlliances = allianceSelection.getPickedAlliances();
        console.log(pickedAlliances);
    }
</script>


<div class="w-screen min-h-full grow flex flex-row">
    <AllianceSelection bind:this={allianceSelection} event_key='2024cttd'></AllianceSelection>
</div>