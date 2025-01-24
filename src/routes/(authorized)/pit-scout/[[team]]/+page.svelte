<script lang="ts">
    import CompetitionSelector from '$lib/components/search/CompetitionSelector.svelte'

    export let data

    let teamNumber = data.team
    let competition = data.competition?.key ?? null

    let page = 1

    const icebreakers = [
        "What is your favorite ocean?",
        "If you could rename any ocean, what would it be and why?",
        "Would you rather have a jellyfish for a hat or an eel for a scarf?",
        "What would be a good name for a podcast produced by dolphins?",
    ]

    const icebreaker = icebreakers[Math.floor(Math.random() * icebreakers.length)]

    const drivetrains = [
        "Swerve",
        "Tank",
        "Mecanum",
        "Other"
    ]

    const swerveTypes = [
        "West Coast",
        "Thrifty",
        "SDS",
        "Rev",
        "Custom",
        "None"
    ]

    const motorTypes = [
        "Kraken X60",
        "Falcon 500",
        "NEO",
        "CIM",
        "Other"
    ]

    const languages = [
        "Java",
        "C++",
        "Python",
        "LabView"
    ]

    const autoSoftwares = [
        "PathPlanner",
        "Choreo",
        "Other"
    ]

    const driverPractices = [
        "None",
        "Some Practice",
        "Lots of Practice"
    ]

    $: wpilog = false;

    const cages = [
        "Deep",
        "Shallow",
        "Both",
        "Neither"
    ]

    const dimensions = ['in', 'cm']

    const weight = ['lb', 'kg']

    let positions = [false, false, false]

    let scorelevels = [false, false, false, false]

    let index: {
        team: number,
        event: string,
        scout: string,
        otherScouts: string,
        length: number,
        width: number,
        sizeUnit: string,
        weight: number,
        weightUnit: string,
        driveTrain: string,
        otherDriveTrain: string,
        swerveType: string,
        swerveRatio: string,
        motorType: string,
        otherMotorType: string,
        language: string,
        autoSoftware: string,
        autoLogger: string,
        cageClimbable: string,
        buddyClimb: boolean,
        floorIntake: boolean,
        firstCoralLocation: string,
        autoStartingPos: [],
        controlPieces: boolean,
        scoreLevels: [],
        framePerimeter: boolean,
        bargeNetPractice: boolean,
        driverPractice: string,
        needHelp: string,
        notes: string,
        imageLink: string,
    } = {
        team: 0,
        event: '',
        scout: '',
        otherScouts: '',
        length: 0,
        width: 0,
        sizeUnit: '',
        weight: 0,
        weightUnit: '',
        driveTrain: '',
        otherDriveTrain: '',
        swerveType: '',
        swerveRatio: '',
        motorType: '',
        otherMotorType: '',
        language: '',
        autoSoftware: '',
        autoLogger: '',
        cageClimbable: '',
        buddyClimb: false,
        floorIntake: false,
        firstCoralLocation: '',
        autoStartingPos: [],
        controlPieces: false,
        scoreLevels: [],
        framePerimeter: false,
        bargeNetPractice: false,
        driverPractice: '',
        needHelp: '',
        notes: '',
        imageLink: '',
    }
</script>

<middle>
    <div
        class="rounded-lg px-5 py-4 my-5 bg-gradient-to-br from-slate-900 to-slate-800"
    >
        <p class="text-center text-lg">Rules</p>
        <p>rules...</p>
    </div>
    <div
        class="rounded-lg px-5 py-4 my-5 bg-gradient-to-br from-slate-900 to-slate-800"
    >
        selector
    </div>
    <div
        class="rounded-lg px-5 py-4 my-5 bg-gradient-to-b from-slate-900 to-slate-800 w-1/2"
    >
        <div class="text-center mx-auto">page {page} of 3</div>
        <hr class="mt-4 mb-2" />
        {#if page == 1}
            <div>
                <label for="otherScouts">Scouting partner:</label><br />

                <select name="otherScouts" bind:value={index.otherScouts}>
                    <option value="none">None</option>
                    {#each data.members as member}
                        <option value={member.username}
                            >{member.name.first} {member.name.last}</option
                        >
                    {/each}
                </select>
                <hr class="mt-4 mb-2" />
                <div>
                    <label for="Icebreaker" class="w-52">Icebreaker: {icebreaker}</label>
                </div>
                <hr class="mt-4 mb-2" />
                <br>
                <div class="grid grid-rows-1 grid-cols-2">
                    <div class="col-start-1 row-start-1">
                        <label for="size">Length and Width?</label><br />
                    </div>

                    <div class="row-start-2 row-span-1 col-start-1 col-span-2 w-48">

                        <input
                            bind:value={index.length}
                            type="number"
                            name="length"
                            size="3"
                        />
                        x
                        <input
                            type="number"
                            bind:value={index.width}
                            name="width"
                            size="3"
                        />
                    </div>

                    <div class="row-start-2 row-span-1 col-start-3 col-span-1 text-right">
                        <select name="sizeUnit" bind:value={index.sizeUnit}>
                            {#each dimensions as dimension}
                                <option value={dimension}>{dimension}</option>
                            {/each}
                        </select>
                    </div>
                </div>
                <div class="grid grid-cols-2 grid-rows-2">
                    <div class="col-start-1 row-start-1">
                        <label for="weight">Weight (with battery)?</label><br />
                    </div>
                    <div class="col-start-1 row-start-2">
                        <input
                            type="number"
                            bind:value={index.weight}
                            name="weight"
                            size="5"
                        />
                    </div>
                    <div class="col-start-2 row-start-2 text-right">
                        <select name="weightUnit" bind:value={index.weightUnit}>
                            {#each weight as weight}
                                <option value={weight}>{weight}</option>
                            {/each}
                        </select>
                    </div>
                </div>
                <hr class="mt-4 mb-2" />
                <br />
                <label for="drivetrainTypes">Drivetrain Type</label>
                <div class="grid grid-cols-2 grid-rows-1">
                    <div class="col-start-1 col-span-2 row-start-2">
                        <select bind:value={index.driveTrain}>
                            {#each drivetrains as drivetrain}
                                <option value={drivetrain}>{drivetrain}</option>
                            {/each}
                        </select>
                        {#if (index.driveTrain == "Other")}
                            <input type="text" bind:value={index.otherDriveTrain} />
                        {/if}
                    </div>
                </div>
                <hr class="mb-2 mt-4" />
                <br>
                <label for="swerveTypes">Swerve Type</label>
                <div class="col-start-1 col-span-2 row-start-2">
                    <select name="swerveTypes" bind:value={index.swerveType}>
                        {#each swerveTypes as type}
                            <option value={type}>{type}</option>
                        {/each}
                    </select>

                </div>
                <hr class="mb-2 mt-4" />
                <br>
                <label for="swerveRatio">Swerve Ratio</label>
                <div class="col-start-1 col-span-2 row-start-2">
                    <input bind:value={index.swerveRatio} type="text"/>
                </div>
                <hr class="mb-2 mt-4" />
                <br>
                <label for="motorTypes">Motor Type</label>
                <div class="col-start-1 col-span-2 row-start-2">
                    <select name="motorType" bind:value={index.motorType}>
                        {#each motorTypes as motorType}
                            <option value={motorType}>
                                {motorType}
                            </option>
                        {/each}
                    </select>
                    {#if (index.motorType == "Other")}
                        <input type="text" name="motorType" bind:value={index.otherMotorType} />
                    {/if}
                </div>
                <hr class="mb-2 mt-4" />
                <br>
                <label for="language">Coding Language</label>
                <div class="col-start-1 col-span-2 row-start-2">
                    <select name="language" bind:value={index.language}>
                        {#each languages as language}
                            <option value={language}>
                                {language}
                            </option>
                        {/each}
                    </select>
                </div>
                <hr class="mb-2 mt-4" />
                <br>
                <label for="autoSoftwares">Auto Software</label>
                <div class="col-start-1 col-span-2 row-start-2">
                    <select name="autoSoftware" bind:value={index.autoSoftware}>
                        {#each autoSoftwares as software}
                            <option value={software}>{software}</option>
                        {/each}
                    </select>

                </div>
                <hr class="mb-2 mt-4" />
                <br>
                <label for="autoLoggers">Auto Logger (Ask if it outputs .wpilog)</label>
                <div class="col-start-1 col-span-2 row-start-2">
                    <select name="autoLogger" bind:value={wpilog}>
                        <option value={true}>Outputs .wpilog</option>
                        <option value={false}>Doesn't output .wpilog</option>
                    </select>
                    {#if (wpilog == true)}
                        <input type="text" name="wpilog" bind:value={index.autoLogger} />
                    {/if}

                </div>

            </div>
        {:else if page == 2}
            <div>
                <label for="cageClimbing">Cage depth climbable</label>
                <div class="col-start-1 col-span-2 row-start-2">
                    <select name="cageclimbing" bind:value={index.cageClimbable}>
                        {#each cages as cage}
                            <option value={cage}>{cage}</option>
                        {/each}
                    </select>

                </div>
                <hr class="mb-2 mt-4" />
                <label for="buddyClimb">Can they buddy climb?</label>
                <br />
                <div>
                    <input
                        type="radio"
                        bind:group={index.buddyClimb}
                        name="buddyClimb"
                        value={true}
                    /> Yes
                    <input
                        type="radio"
                        bind:group={index.buddyClimb}
                        name="buddyClimb"
                        value={false}
                    /> No
                </div>
                <hr class="mb-2 mt-4" />
                <label for="floor intake">Can they floor intake?</label>
                <br />
                <div>
                    <input
                        type="radio"
                        bind:group={index.floorIntake}
                        name="floorIntake"
                        value={true}
                    /> Yes
                    <input
                        type="radio"
                        bind:group={index.floorIntake}
                        name="floorIntake"
                        value={false}
                    /> No
                </div>
                <hr class="mb-2 mt-4" />
                <label for="auto start">Where can they start in auto? (From driver perspective)</label>
                <br />
                <div>
                    <input type="checkbox" value="Left" bind:group={index.autoStartingPos}> Left
                    <input type="checkbox" value="Middle" bind:group={index.autoStartingPos}> Center
                    <input type="checkbox" value="Right" bind:group={index.autoStartingPos}> Right
                </div>
                <hr class="mb-2 mt-4" />
                <label for="piece control">In auto, where is their first coral placed?</label>
                <br />
                <div>
                    --PUT BRANCH SELECTOR HERE--
                </div>
                <hr class="mb-2 mt-4" />
                <label for="piece control">Can they control both pieces at once?</label>
                <br />
                <div>
                    <input
                        type="radio"
                        bind:group={index.controlPieces}
                        name="controlPieces"
                        value={true}
                    /> Yes
                    <input
                        type="radio"
                        bind:group={index.controlPieces}
                        name="controlPieces"
                        value={false}
                    /> No
                </div>
                <hr class="mb-2 mt-4" />
                <label for="score levels">What levels can they score on?</label>
                <br />
                <div>
                    <input type="checkbox" value=1 bind:group={index.scoreLevels} /> L1
                    <input type="checkbox" value=2 bind:group={index.scoreLevels}/> L2
                    <input type="checkbox" value=3 bind:group={index.scoreLevels}/> L3
                    <input type="checkbox" value=4 bind:group={index.scoreLevels}/> L4
                </div>
                <hr class="mb-2 mt-4" />
                <label for="">Do they reach out of their frame during game?</label>
                <br />
                <div>
                    <input
                        type="radio"
                        bind:group={index.framePerimeter}
                        name="framePerimeter"
                        value={true}
                    /> Yes
                    <input
                        type="radio"
                        bind:group={index.framePerimeter}
                        name="framePerimeter"
                        value={false}
                    /> No
                </div>

            </div>
        {:else if page == 3}
            <hr class="mb-2 mt-4" />
            <label for="">Has their human player practiced barge scoring?</label>
            <br />
            <div>
                <input
                    type="radio"
                    bind:group={index.bargeNetPractice}
                    name="bargeNetPractice"
                    value={true}
                /> Yes
                <input
                    type="radio"
                    bind:group={index.bargeNetPractice}
                    name="bargeNetPractice"
                    value={false}
                /> No
            </div>
            <hr class="mb-2 mt-4" />
            <label for="">How much has their driver practiced?</label>
            <br />
            <div>
                <select bind:value={index.driverPractice}>
                    {#each driverPractices as p}
                        <option value={p}>{p}</option>
                    {/each}
                </select>
            </div>
            <hr class="mb-2 mt-4" />
            <label for="">Do they need any help with their code, robot, or team?</label>
            <br />
            <textarea bind:value={index.needHelp} name="notes"></textarea>
            <hr class="mb-2 mt-4" />
            <label for="notes">Additional Notes</label>
            <br />
            <textarea bind:value={index.notes} name="notes"></textarea>
            <br />
        {/if}

        <hr class="my-4" />

        <div class="grid grid-rows-1 grid-cols-2">
            {#if page > 1}
                <div class="text-center">
                    <button
                        class="border-rose-800 border-2 font-bold bg-gradient-to-br from-rose-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl"
                        on:click={() => {
                            page--
                        }}>back</button
                    >
                </div>
            {/if}
            {#if page == 1}
                <div class="text-center col-span-2">
                    <button
                        class="border-sky-800 border-2 font-bold bg-gradient-to-br from-sky-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl"
                        on:click={() => {
                            page++
                        }}>Continue</button
                    >
                </div>
            {:else if page == 2}
                <div class="text-center col-start-2">
                    <button
                        class="border-sky-800 border-2 font-bold bg-gradient-to-br from-sky-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl"
                        on:click={() => {
                            page++
                        }}>Continue</button
                    >
                </div>
            {:else if page == 3}
                <div class="text-center col-start-2">
                    <form method="POST">
                        <input
                            type="text"
                            hidden
                            name="data"
                            value={JSON.stringify(index)}
                        />
                        <button
                            class="border-sky-800 border-2 font-bold bg-gradient-to-br from-sky-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl"
                            type="submit"
                            value="Submit"
                            on:click={() => {
                                page == 1
                                console.log(index)
                            }}>Submit</button
                        >
                    </form>
                </div>
            {/if}
        </div>
    </div>
</middle>
