<script lang="ts">
    import CompetitionSelector from '$lib/components/search/CompetitionSelector.svelte'
    import PitReef from './PitReef.svelte'

    // get data about selected match
    export let data

    let teamNumber = data.team
    let competition = data.competition?.key ?? null

    // page counter
    let page = 1

    // these icebreakers are randomly selected per scout
    const icebreakers = [
        "What is your favorite ocean?",
        "If you could rename any ocean, what would it be and why?",
        "Would you rather have a jellyfish for a hat or an eel for a scarf?",
        "What would be a good name for a podcast produced by dolphins?",
    ]

    const icebreaker = icebreakers[Math.floor(Math.random() * icebreakers.length)]

    // lists of options on questions

    const drivetrains = [
        "Swerve",
        "Tank",
        "Mecanum",
        "Other/Custom"
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
        "Both",
        "Neither",
        "Dead Reckoning",
        "Other"
    ]

    const driverPractices = [
        "None",
        "Some Practice",
        "Lots of Practice"
    ]

    const loggers = [
        "wpilogger",
        "ctrelogger",
        "urcl",
        "doglog",
        "advantagekit",
        "other",
        "none"
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

    let selectedBranch = {
        branch: 0,
        level: 0,
    };

    // data that will be changed by form
    let index: {
        team: number,
        event: string,
        scout: string,
        otherScouts: string,
        length: number,
        width: number,
        weight: number,
        driveTrain: string,
        otherDriveTrain: string,
        swerveType: string,
        swerveRatio: string,
        motorType: string,
        otherMotorType: string,
        language: string,
        autoSoftware: string,
        autoLogger: string,
        cageClimbable: [],
        buddyClimb: boolean,
        firstCoralLocation: {},
        autoStartingPos: [],
        controlPieces: boolean,
        intakeAreas: [],
        scoreAreas: [],
        framePerimeter: boolean,
        bargeNetPractice: boolean,
        driverPractice: boolean,
        notes: string,
        imageLink: string,
    } = {
        team: 0,
        event: '',
        scout: '',
        otherScouts: '',
        length: 0,
        width: 0,
        weight: 0,
        driveTrain: '',
        otherDriveTrain: '',
        swerveType: '',
        swerveRatio: '',
        motorType: '',
        otherMotorType: '',
        language: '',
        autoSoftware: '',
        autoLogger: '',
        cageClimbable: [],
        buddyClimb: false,
        firstCoralLocation: {branch: 0, level: 0},
        autoStartingPos: [],
        controlPieces: false,
        intakeAreas: [],
        scoreAreas: [],
        framePerimeter: false,
        bargeNetPractice: false,
        driverPractice: false,
        notes: '',
        imageLink: '',
    }

    let scrollElement;
</script>

<middle>
    <!--    <div-->
    <!--        class="rounded-lg px-5 py-4 my-5 bg-gradient-to-br from-slate-900 to-slate-800"-->
    <!--    >-->
    <!--        <p class="text-center text-lg">Rules</p>-->
    <!--        <p>rules...</p>-->
    <!--    </div>-->
    <!--    <div-->
    <!--        class="rounded-lg px-5 py-4 my-5 bg-gradient-to-br from-slate-900 to-slate-800"-->
    <!--    >-->
    <!--        selector-->
    <!--    </div>-->
    <div bind:this={scrollElement}></div>
    <div
            class="rounded-lg px-5 py-4 my-5 bg-gradient-to-b from-slate-900 to-slate-800 w-5/6"
    >
        <div class="text-center mx-auto">page {page} of 3</div>
        <hr class="mt-4 mb-2"/>
        {#if page == 1}
            <div>
                <label for="otherScouts">Scouting partner:</label><br/>

                <select name="otherScouts" bind:value={index.otherScouts}>
                    <option value="none">None</option>
                    {#each data.members as member}
                        <option value={member.username}
                        >{member.name.first} {member.name.last}</option
                        >
                    {/each}
                </select>
                <hr class="mt-4 mb-2"/>
                <div>
                    <label for="Icebreaker" class="w-52">Icebreaker: {icebreaker}</label>
                </div>
                <hr class="mt-4 mb-2"/>
                <br>
                <div class="grid grid-rows-1 grid-cols-2">
                    <div class="col-start-1 row-start-1">
                        <label for="size">Robot Length and Width in <b>inches</b> (With bumpers)</label><br />
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

                    <!--                    <div class="row-start-2 row-span-1 col-start-3 col-span-1 text-right">-->
                    <!--                        <select name="sizeUnit" bind:value={index.sizeUnit}>-->
                    <!--                            {#each dimensions as dimension}-->
                    <!--                                <option value={dimension}>{dimension}</option>-->
                    <!--                            {/each}-->
                    <!--                        </select>-->
                    <!--                    </div>-->
                </div>
                <hr class="mt-4 mb-2"/>
                <br/>
                <div class="grid grid-cols-1 grid-rows-2">
                    <div class="col-start-1 row-start-1">
                        <label for="weight">Weight in <b>lbs</b> (Just robot and bumper, no battery)</label><br />
                    </div>
                    <div class="col-start-1 row-start-2">
                        <input
                                type="number"
                                bind:value={index.weight}
                                name="weight"
                                size="5"
                        />
                    </div>
                </div>
                <hr class="mt-4 mb-2"/>
                <br/>
                <label for="drivetrainTypes">What is your drivetrain Type?</label>
                <div class="grid grid-cols-2 grid-rows-1">
                    <div class="col-start-1 col-span-2 row-start-2">
                        <select bind:value={index.driveTrain}>
                            {#each drivetrains as drivetrain}
                                <option value={drivetrain}>{drivetrain}</option>
                            {/each}
                        </select>
                        {#if (index.driveTrain == "Other")}
                            <input type="text" bind:value={index.otherDriveTrain}/>
                        {/if}
                    </div>
                </div>
                <hr class="mb-2 mt-4"/>
                <br>
                <label for="motorTypes">What motors do you use?</label>
                <div class="col-start-1 col-span-2 row-start-2">
                    <select name="motorType" bind:value={index.motorType}>
                        {#each motorTypes as motorType}
                            <option value={motorType}>
                                {motorType}
                            </option>
                        {/each}
                    </select>
                    {#if (index.motorType == "Other")}
                        <input type="text" name="motorType" bind:value={index.otherMotorType}/>
                    {/if}
                </div>
                <hr class="mt-4 mb-2"/>
                <br/>
                <label for="swerveTypes">What is your swerve type?</label>
                <div class="col-start-1 col-span-2 row-start-2">
                    <select name="swerveTypes" bind:value={index.swerveType}>
                        {#each swerveTypes as type}
                            <option value={type}>{type}</option>
                        {/each}
                    </select>

                </div>
                <hr class="mb-2 mt-4"/>
                <br>
                <label for="swerveRatio">What is your swerve ratio?</label>
                <div class="col-start-1 col-span-2 row-start-2">
                    <input bind:value={index.swerveRatio} type="text"/>
                </div>
                <hr class="mb-2 mt-4"/>
                <br>
                <label for="language">What language is your robot programmed in?</label>
                <div class="col-start-1 col-span-2 row-start-2">
                    <select name="language" bind:value={index.language}>
                        {#each languages as language}
                            <option value={language}>
                                {language}
                            </option>
                        {/each}
                    </select>
                </div>
                <hr class="mb-2 mt-4"/>
                <br>
                <label for="autoSoftwares">What is your auto software?</label>
                <div class="col-start-1 col-span-2 row-start-2">
                    <select name="autoSoftware" bind:value={index.autoSoftware}>
                        {#each autoSoftwares as software}
                            <option value={software}>{software}</option>
                        {/each}
                    </select>

                </div>
                <hr class="mb-2 mt-4"/>
                <br>
                <label for="autoLoggers">What auto logger do you use?</label>
                <div class="col-start-1 col-span-2 row-start-2">
                    <select name="autoLogger" bind:value={index.autoLogger}>
                        {#each loggers as logger}
                            <option value={logger}>{logger}</option>
                        {/each}
                    </select>

                </div>

            </div>
        {:else if page == 2}
            <div>
                <label for="cageClimbing">What cage depth(s) can you climb?</label>
                <div>
                    <input type="checkbox" value="Deep" bind:group={index.cageClimbable}> Deep
                    <input type="checkbox" value="Shallow" bind:group={index.cageClimbable}> Shallow
                </div>
                <hr class="mb-2 mt-4"/>
                <label for="buddyClimb">Can they buddy climb?</label>
                <br/>
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
                <hr class="mb-2 mt-4"/>
                <label for="auto start">Where can you start in auto? (From driver perspective)</label>
                <br/>
                <div>
                    <table>
                        <tr><input type="checkbox" value="Left" bind:group={index.autoStartingPos}> Left</tr>
                        <tr><input type="checkbox" value="Middle" bind:group={index.autoStartingPos}> Center</tr>
                        <tr><input type="checkbox" value="Right" bind:group={index.autoStartingPos}> Right</tr>
                    </table>
                </div>
                <hr class="mb-2 mt-4"/>
                <label for="piece control">In auto, where is their first coral placed?</label>
                <br/>
                <div>
                    <p>{index.firstCoralLocation.branch},{index.firstCoralLocation.level}</p>
                    <PitReef bind:selected={index.firstCoralLocation}/>
                    <p class="mx-auto w-fit border p-2 rounded-md">Driver Station</p>
                </div>
                <hr class="mb-2 mt-4"/>
                <label for="piece control">Can you control both pieces at once?</label>
                <br/>
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
                <hr class="mb-2 mt-4"/>
                <label for="score levels">Where can you intake?</label>
                <br/>
                <div class="flex flex-col">
                    <table>
                        <tr><input type="checkbox" value="floor coral" bind:group={index.intakeAreas}/> Floor Coral</tr>
                        <tr><input type="checkbox" value="source" bind:group={index.scoreAreas}/> Source</tr>
                        <tr><input type="checkbox" value="floor algae" bind:group={index.intakeAreas}/> Floor Algae</tr>
                        <tr><input type="checkbox" value="reef algae" bind:group={index.intakeAreas}/> Reef Algae</tr>
                    </table>
                </div>
                <hr class="mb-2 mt-4"/>
                <label for="score levels">Where can you score?</label>
                <br/>
                <div>
                    <table>
                        <tr><input type="checkbox" value="processor" bind:group={index.scoreAreas}/> Processor</tr>
                        <tr><input type="checkbox" value="barge" bind:group={index.scoreAreas}/> Barge</tr>
                        <tr><input type="checkbox" value=1 bind:group={index.scoreAreas}/> L1</tr>
                        <tr><input type="checkbox" value=2 bind:group={index.scoreAreas}/> L2</tr>
                        <tr><input type="checkbox" value=3 bind:group={index.scoreAreas}/> L3</tr>
                        <tr><input type="checkbox" value=4 bind:group={index.scoreAreas}/> L4</tr>
                    </table>
                </div>
                <hr class="mb-2 mt-4"/>
                <label for="">Do they reach out of their frame during game?</label>
                <br/>
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
            <hr class="mb-2 mt-4"/>
            <label for="">Has your human player practiced throwing?</label>
            <br/>
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
            <hr class="mb-2 mt-4"/>
            <label for="">Has your driver practiced?</label>
            <br/>
            <div>
                <input
                        type="radio"
                        bind:group={index.driverPractice}
                        name="driverPractice"
                        value={true}
                > Yes
                <input
                        type="radio"
                        bind:group={index.driverPractice}
                        name="driverPractice"
                        value={false}
                > No
            </div>
            <hr class="mb-2 mt-4" />
            <label for="notes">Additional Notes</label>
            <br/>
            <textarea bind:value={index.notes} name="notes"></textarea>
            <hr class="mb-2 mt-4"/>
            <br/>
            <p class="font-bold">IMPORTANT! Please submit pictures, it is one of the important metrics for our strategy!</p>
            <br />
            <a href="https://forms.gle/qoLbnverWsphEkZHA" target="_blank" class="submit p-1 rounded-md">Submit
                Pictures</a>
        {/if}

        <hr class="my-4"/>

        <div class="grid grid-rows-1 grid-cols-2">
            {#if page > 1}
                <div class="text-center">
                    <button
                            class="border-rose-800 border-2 font-bold bg-gradient-to-br from-rose-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl"
                            on:click={() => {
                            page--;
                            scrollElement.scrollIntoView();
                        }}>back
                    </button
                    >
                </div>
            {/if}
            {#if page == 1}
                <div class="text-center col-span-2">
                    <button
                            class="border-sky-800 border-2 font-bold bg-gradient-to-br from-sky-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl"
                            on:click={() => {
                            page++
                            scrollElement.scrollIntoView();
                        }}>Continue
                    </button
                    >
                </div>
            {:else if page == 2}
                <div class="text-center col-start-2">
                    <button
                            class="border-sky-800 border-2 font-bold bg-gradient-to-br from-sky-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl"
                            on:click={() => {
                            page++
                            scrollElement.scrollIntoView();
                        }}>Continue
                    </button
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
                            >Submit</button
                        >
                    </form>
                </div>
            {/if}
        </div>
    </div>
</middle>
