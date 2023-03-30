<script lang=ts>
    import CompetitionSelector from "$lib/components/search/CompetitionSelector.svelte";

    export let data;

    let teamNumber="";
    let competition=data.competition?.key??null;

    let optimally="";
    let possible="";
    let incapable="";

    let capabilities:any = {
        "intakeCube":[undefined, "Cube Intake"],
        "intakeCone":[undefined, "Cone Intake"],
        "shelfStation":[undefined, "Shelf Station"],
        "chuteStation":[undefined, "Chute Station"],
        "floorStation":[undefined, "Floor Station"],
        "floor":[undefined, "Floor"],
    }

    let placement:any = {
        "placeHigh":[undefined, "Placement High"],
        "placeMid":[undefined, "Placement Mid"],
        "placeLow":[undefined, "Placement Low"],
    }

    let mainStrategy="";

    let autoStrategy="";

    let averageScore="";

    let topSpeed="";

    let defenseCapability="";

    let defenseExperience="";

    let chargeStation:any = {
        "chargeStationMain":[undefined, "Endgame"],
        "chargeStationAuto":[undefined, "Auto"],
    }

    let otherThoughts="";

</script>

<center class="pt-10">
    <div class="box w-fit max-w-sm">
        <h1 class="heading">Pit Scouting</h1>
        <form method="POST">
            <label>Competition:<CompetitionSelector bind:event={competition} events={data.events}/></label><br>
            <input type="text" bind:value={competition} name="event" hidden />

            <label>Team Number:<input class="label" type="text" name="team" bind:value={teamNumber} required></label><br>

            <h1 class="heading">Intake Capabilities</h1>
            <div class="grid grid-cols-5">
                <div class="col-span-2" />
                <p class="text-xs">Optimally</p>
                <p class="text-xs">Possible</p>
                <p class="text-xs">Incapable</p>
                {#each Object.keys(capabilities) as c}
                    <p class="col-span-2 text-xs">{capabilities[c][1]}:</p>
                    <input type="radio" name={c} bind:group={capabilities[c][0]} value="optimal">
                    <input type="radio" name={c} bind:group={capabilities[c][0]} value="possible">
                    <input type="radio" name={c} bind:group={capabilities[c][0]} value="incapable">
                {/each}
            </div>
            <h1 class="heading">Placement</h1>
            <div class="grid grid-cols-5">
                {#each Object.keys(placement) as p}
                    <p class="col-span-2 text-xs">{placement[p][1]}:</p>
                    <input type="radio" name={p} bind:group={placement[p][0]} value="optimal">
                    <input type="radio" name={p} bind:group={placement[p][0]} value="possible">
                    <input type="radio" name={p} bind:group={placement[p][0]} value="incapable">
                {/each}
            </div>
            <h1 class="heading">Strategy</h1>
            <label>Main Strategy:<input class="label" type="text" name="mainStrategy" bind:value={mainStrategy}></label><br>
            <label>Auto Strategy:<input class="label" type="text" name="autoStrategy" bind:value={autoStrategy}></label><br>
            <label>Average Score:<input class="label" name="averageScore" bind:value={averageScore}></label><br>
            <h1 class="heading">Defense</h1>
            <label>Ability:<input class="label" type="text" name="defenseCapability" bind:value={defenseCapability}></label><br>
            <label>Experience:<input class="label" type="text" name="defenseExperience" bind:value={defenseExperience}></label>
            <h1 class="heading">Charge Station Capability</h1>
            <div class="grid grid-cols-5">
                <div class="col-span-2" />
                <p class="text-xs">Engage</p>
                <p class="text-xs">Dock</p>
                <p class="text-xs">No</p>
                {#each [...Object.keys(chargeStation)] as s}
                    <p class="col-span-2 text-xs">{chargeStation[s][1]}:</p>
                    <input type="radio" name={s} bind:group={chargeStation[s][0]} value="Engage">
                    <input type="radio" name={s} bind:group={chargeStation[s][0]} value="Dock">
                    <input type="radio" name={s} bind:group={chargeStation[s][0]} value="No">
                {/each}
            </div>
            <br>
            <h1 class="heading">Game Piece Preference</h1>
            <div class="grid grid-cols-3">
                <p class="text-xs">Cone</p>
                <p class="text-xs">Cube</p>
                <p class="text-xs">Either</p>
                <input type="radio" name="piecePreferance" value="Cone">
                <input type="radio" name="piecePreferance" value="Cube">
                <input type="radio" name="piecePreferance" value="Either">
            </div>
            <h1 class="heading">Robot Specifics</h1>
            <label class="pt-4">Drivetrain Type:<input class="label" type="text" name="drivetrain"></label><br>
            <label class="pt-4">Frame Perimeter:<input class="label" type="text" name="framePerimeter"></label><br>
            <label class="pt-4">Robot Weight:<input class="label" type="text" name="weight"></label><br>
            <label>Top Speed:<input class="label" type="text" name="topSpeed" bind:value={topSpeed}></label><br>
            <h1 class="heading">Finishing</h1>
            <label>Other Thoughts:<input class="label" type="text" name="thoughts" bind:value={otherThoughts}></label><br>
            <label>Other Scouts:<input class="label" type="text" name="otherScouts"></label><br>
            <!--make text box bigger-->
            <h1 class="rounded-lg bg-slate-600 p-1 m-1 my-2 text-sm">Ask for permission to take a picture of robot, if yes post it in the pit-scouting slack with the team number. Remember to say thank you regardless!</h1>

            <button class="submit">Submit</button>
        </form>
    </div>
</center>

<style>
    .label{
        margin-bottom: 2px;
    }

    label{
        font-size:14px;
    }

    .heading{
        margin-bottom: 1vh;
        font-size: 17px;
        background-image: linear-gradient(to top, rgba(255,255,255,0.5), rgba(255,255,255,0), rgba(255,255,255,0));
        border-bottom-left-radius:8px;
        border-bottom-right-radius:8px;
    }
</style>