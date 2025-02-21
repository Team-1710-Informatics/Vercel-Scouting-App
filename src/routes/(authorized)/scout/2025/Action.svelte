<script>
    import Reef from './Reef.svelte';
    import AllianceArea from "./AllianceArea.svelte";
    import Barge from "./Barge.svelte";
    import Inventory from "./Inventory.svelte";
    import Timer from "./Timer.svelte";
    import Endgame from "./Endgame.svelte";

    export let team

    export let log = []
    let algae = false;
    let coral = false;
    let endgame = false;
    export let state
    export let meta
    let item;

    export let climb = {
        time: 0,
        type: ''
    }

    let location
    let rotateDiv
    let rotate = false

    let selected = {
        location: 'none',
    }

    function flipField() {
        rotate = !rotate
    }

    function switchEndgame() {
        endgame = !endgame
    }

    let reefActive = false;

    let reef
    let allianceArea

    function handleScore() {
        if (selected.location === "reef" || selected.location === "processor" || selected.location === "barge") {
            if (item === "coral") {
                log.push({
                    time: state.time,
                    action: 'score',
                    ...selected,
                    phase: state.phase,
                });
                coral = false;
                console.log("outtaking coral");
            } else if (item === "algae" && (selected.location === "processor" || selected.location === "barge")) {
                algae = false;
                console.log("outtaking algae");
                log.push({
                    time: state.time,
                    action: 'score',
                    ...selected,
                    phase: state.phase,
                });
            }
        }
    }

    function handleDropOrMiss(actionType) {
        if (item === "coral" && coral) {
            coral = false;
        } else if (item === "algae" && algae) {
            algae = false;
        }
        log.push({
            time: state.time,
            action: actionType,
            ...selected,
            phase: state.phase,
        });
    }

    function handleIntake() {
        if (selected.location === "coral_station_left" || selected.location === "coral_station_right" || selected.location === "alliance") {
            if (item === "coral") {
                if (allianceArea.intakeEvent(coral, algae)) {
                    coral = true;
                    log.push({
                        time: state.time,
                        action: 'intake',
                        ...selected,
                        phase: state.phase,
                    });
                }
                console.log("intaking coral");
            } else {
                if (allianceArea.intakeEvent(coral, algae)) {
                    algae = true;
                    log.push({
                        time: state.time,
                        action: 'intake',
                        ...selected,
                        phase: state.phase,
                    });
                }
                console.log("intaking algae");
            }
        } else if (selected.location === "reef") {
            if (algae === false) {
                console.log("intaking algae from reef");
                if (reef.intakeEvent()) {
                    algae = true;
                    reefActive = false;
                    log.push({
                        time: state.time,
                        action: 'intake',
                        ...selected,
                        phase: state.phase,
                    });
                }
            }
        }
    }

    function behavior(actionType) {
        if (state.started) {
            if (actionType === 'score') {
                handleScore();
            } else if (actionType === 'drop' || actionType === 'miss') {
                handleDropOrMiss(actionType);
            } else if (actionType === 'intake') {
                handleIntake();
            }
        }
    }
</script>

<div class="flex flex-row w-screen h-screen items-center justify-center">
    <div class="basis-4/5 h-screen p-5">
        <div class="h-full flex flex-row justify-center rounded-3xl background shadow-2xl shadow-black/80   ">
            <Barge bind:item bind:selected class="basis-1/6"/>
            <div class="flex flex-col items-center justify-end basis-5/6">
                <div class="flex flex-row items-center justify-center w-full h-full -mb-1">
                    <AllianceArea bind:item bind:selected bind:this={allianceArea}/>
                </div>
                {#if endgame}
                    <Endgame bind:climb bind:endgame/>
                {/if}
                {#if !endgame}
                    <Reef bind:item bind:selected bind:this={reef}/>
                {/if}
            </div>
        </div>
    </div>
    <div class="flex flex-col gap-4 basis-1/5 w-fit">
        <div class="text-2xl w-fit">
            Team {team.slice(3)}
        </div>
        <Timer bind:state />
        <div class="flex items-center justify-center w-fit">
            <Inventory bind:algae bind:coral/>
        </div>
        <div class="rounded-md shadow-xl bg-red-600 p-2 w-36 h-10" on:click={() => {behavior("score")}}>
            SCORE
        </div>
        <div class="rounded-md shadow-xl bg-yellow-400 p-2 w-36 h-10" on:click={() => {behavior("intake")}}>
            INTAKE
        </div>
        <div class="rounded-md shadow-xl bg-fuchsia-500 p-2 w-36 h-10" on:click={() => {behavior("miss")}}>
            MISS
        </div>
        <button class="rounded-md shadow-xl bg-blue-400 p-2 h-10 w-36" on:click={switchEndgame}>
            ENDGAME
        </button>
    </div>
</div>

<style>
    .background {
        background: linear-gradient(0.3turn, #242a34, #363840, #000000) fixed;
        /* Your main background gradient */
        /* linear-gradient(to right, black, black); */
    }
</style>

