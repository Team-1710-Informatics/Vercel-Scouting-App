<script lang=ts>
    import CompetitionSelector from "$lib/components/search/CompetitionSelector.svelte";

    export let data;

    let teamNumber="";
    let competition=data.competition.key;

    let optimally="";
    let possible="";
    let incapable="";

    let capabilities:any = {
        "intakeCube":undefined,
        "intakeCone":undefined,
        "shelfStation":undefined,
        "chuteStation":undefined,
        "floorStation":undefined,
        "floor":undefined,
    }

    let placement:any = {
        "placeHigh":undefined,
        "placeMid":undefined,
        "placeLow":undefined,
    }

    let mainStrategy="";

    let autoStrategy="";

    let averageScore="";

    let chargeStation:any = {
        "chargeStationMain":undefined,
        "chargeStationAuto":undefined,
    }

    let otherThoughts="";

</script>

<center class="pt-10">
    <div class="box w-fit">
        <h1 class="header">Pit Scouting</h1>
        <form method="POST">
            <label>Competition:<CompetitionSelector bind:event={competition} events={data.events}/></label><br>
            <input type="text" bind:value={competition} name="event" hidden />

            <label>Team Number:<input class="label" type="text" name="team" bind:value={teamNumber} required></label><br>

            <h1 class="header">Intake Capabilities</h1>
            <div class="grid grid-cols-5">
                <div class="col-span-2" />
                <p class="text-xs">Optimally</p>
                <p class="text-xs">Possible</p>
                <p class="text-xs">Incapable</p>
                {#each Object.keys(capabilities) as c}
                    <p class="col-span-2 text-xs">{c}:</p>
                    <input type="radio" name={c} bind:group={capabilities[c]} value="optimal">
                    <input type="radio" name={c} bind:group={capabilities[c]} value="possible">
                    <input type="radio" name={c} bind:group={capabilities[c]} value="incapable">
                {/each}
            </div>
            <h1 class="header">Placement</h1>
            <div class="grid grid-cols-5">
                {#each Object.keys(placement) as p}
                    <p class="col-span-2 text-xs">{p}:</p>
                    <input type="radio" name={p} bind:group={placement[p]} value="optimal">
                    <input type="radio" name={p} bind:group={placement[p]} value="possible">
                    <input type="radio" name={p} bind:group={placement[p]} value="incapable">
                {/each}
            </div>
            <h1 class="header">Strategy</h1>
            <label>Main Strategy:<input class="lable" type="text" name="mainStrategy" bind:value={mainStrategy}></label><br>
            <label>Auto Strategy:<input class="label" type="text" name="autoStrategy" bind:value={autoStrategy}></label><br>
            <label>Average Score:<input class="label" name="averageScore" bind:value={averageScore}></label>
            <h1 class="header">Charge Station Capability</h1>
            <div class="grid grid-cols-5">
                <div class="col-span-2" />
                <p class="text-xs">Engage</p>
                <p class="text-xs">Dock</p>
                <p class="text-xs">No</p>
                {#each [...Object.keys(chargeStation)] as s}
                    <p class="col-span-2 text-xs">{s}:</p>
                    <input type="radio" name={s} bind:group= {chargeStation[s]} value="Engage">
                    <input type="radio" name={s} bind:group= {chargeStation[s]} value="Dock">
                    <input type="radio" name={s} bind:group= {chargeStation[s]} value="No">
                {/each}
            </div>
            <br>
            <label class="pt-4">Drivetrain Type:<input class="label" type="text" name="drivetrain"></label><br>
            <h1 class="header">Game Piece Preferance</h1>
            <div class="grid grid-cols-3">
                <p class="text-xs">Cone</p>
                <p class="text-xs">Cube</p>
                <p class="text-xs">Either</p>
                <input type="radio" name="piecePreferance" value="Cone">
                <input type="radio" name="piecePreferance" value="Cube">
                <input type="radio" name="piecePreferance" value="Either">
            </div>
            <h1 class="header">Other Thoughts</h1><input class="label" type="text" name="thoughts" bind:value={otherThoughts}><br>
            <h1 class="header">Other Scouts</h1><input class="label" type="text" name="otherScouts" bind:value={otherThoughts}><br>
            <!--make text box bigger-->
            <button class="submit">Submit</button>
        </form>
    </div>
</center>

<style>
    .label{
        margin-bottom: 1vh;
    }

    .header{
        margin-bottom: 1vh;
        font-size: 17px;
    }
</style>