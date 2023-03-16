<script lang=ts>
    import { validate_each_argument } from "svelte/internal";

    let teamNumber="";
    let competition="";

    let optimally="";
    let possible="";
    let incapable="";

    let capabilities:any = {
        "Intake cube":undefined,
        "Intake cone":undefined,
        "Shelf station":undefined,
        "Chute station":undefined,
        "Floor station":undefined,
        "Floor":undefined,
    }

    let placement:any = {
        "High":undefined,
        "Mid":undefined,
        "Low":undefined,
    }

    let mainStrategy="";

    let autoStrategy="";

    let averageScore="";

    let strategy:any = {
        "Main":undefined,
        "Auto":undefined,
    }

    let otherThoughts="";

</script>

<center class="pt-10">
    <div class="box w-fit">
        <h1 class="header">Pit Scouting</h1>
        <form method="POST">
            <label>Team Number:<input class="label" type="text" bind:value={teamNumber}></label><br>
            <label>Competition:<input class="label" type="text" bind:value={competition}></label><br>
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
            <label>Main Strategy:<input class="lable" type="text" bind:value={mainStrategy}></label><br>
            <label>Auto Strategy:<input class="label"type="text" bind:value={autoStrategy}></label><br>
            <label>Average Score:<input class="label"bind:value={averageScore}></label>
            <h1 class="header">Charge Station Capability</h1>
            <div class="grid grid-cols-5">
                <div class="col-span-2" />
                <p class="text-xs">Yes</p>
                <p class="text-xs">Maybe</p>
                <p class="text-xs">No</p>
                {#each Object.keys(strategy) as s}
                    <p class="col-span-2 text-xs">{s}:</p>
                    <input type="radio" name={s} bind:group={strategy[s]} value="Yes">
                    <input type="radio" name={s} bind:group={strategy[s]} value="Maybe">
                    <input type="radio" name={s} bind:group={strategy[s]} value="No">
                {/each}
            </div>
            <h1 class="header">Drive Train Type</h1>
            <div class="grid grid-cols-4">
                <p class="text-xs">Swerve</p>
                <p class="text-xs">Tank</p>
                <p class="text-xs">Mechanum</p>
                <p class="text-xs">Other</p>
                <input type="radio" name="Drive Train type" value="Swerve">
                <input type="radio" name="Drive Train Type" value="Tank">
                <input type="radio" name="Drive Train Type" value="Mechanum">
                <input type="radio" name="Drive Train Type" value="Other">
                <!--if other then text box appears-->
            </div>
            <h1 class="header">Game Piece Preferance</h1>
            <div class="grid grid-cols-3">
                <p class="text-xs">Cone</p>
                <p class="text-xs">Cube</p>
                <p class="text-xs">Either</p>
                <input type="radio" name="piecePreferance" value="Cone">
                <input type="radio" name="piecePreferance" value="Cube">
                <input type="radio" name="piecePreferance" value="Either">
            </div>
            <h1 class="header">Other Thoughts</h1><input class="label" type="text" bind:value={otherThoughts}><br>
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