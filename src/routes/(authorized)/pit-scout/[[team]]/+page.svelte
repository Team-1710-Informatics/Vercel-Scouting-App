<script lang=ts>
import CompetitionSelector from "$lib/components/search/CompetitionSelector.svelte";

export let data;

let teamNumber=data.team;
let competition=data.competition?.key??null;

let page = 1;

let driveTrain = "";
let otherIntake = "";
let otherShooter = "";

const drivetrains:[string, string][] = [ //first string is for name second is for value
    ["Swerve", "swerve"],
    ["Tank", "tank"],
    ["Other?", "other"]
]

const intakes:[string, string][] = [ //first string is for name second is for value
    ["Over the bumper", "over"],
    ["Under the bumper", "under"],
    ["Other?", "other"]
]

const shooters:[string, string][] = [ //first string is for name second is for value
    ["Rollers", "rollers"],
    ["Wheels", "wheels"],
    ["Other?", "other"]
]

const climbing:[string, string][] = [ //first string is for name second is for value
    ["Very good", "veryGood"],
    ["Okay", "okay"],
    ["Very bad/Can't Climb", "veryBad"]
]

const buddyClimb:[string, string][] = [ //first string is for name second is for value
    ["Yes", "yes"],
    ["No", "no"],
]

const scorePreference:[string, string][] = [ //first string is for name second is for value
    ["Speaker", "speaker"],
    ["Amp", "amp"],
]

const scoreAbility = [ //first string is for name second is for value
    "Very well",
    "Okay",
    "Very bad"
]

const intakePreference = [ //first string is for name second is for value
    "Wing",
    "Center",
    "Source"
]

const ampUse = [
    "Amplify",
    "Coop"
]

const scoring:[string, string][] = [
    ["Speaker", "speakerScore"],
    ["Amp", "ampScore"],
    ["Trap", "trapScore"]
]

const dimensions = [
    "in",
    "cm"
]

const distance = [
    "ft",
    "m"
]

const weight = [
    "lb",
    "kg"
]

const speed = [
    "mi",
    "km"
]
</script>
<middle>
    <div class="rounded-lg px-5 py-4 my-5 bg-gradient-to-br from-slate-900 to-slate-800">
        <p class="text-center text-lg">Rules</p>
        <p>rules...</p>
    </div>
    <div class="rounded-lg px-5 py-4 my-5 bg-gradient-to-br from-slate-900 to-slate-800">
        selector
    </div>
    <div class="rounded-lg px-5 py-4 my-5 bg-gradient-to-br from-slate-900 to-slate-800">
        <div class="text-center mx-auto">page {page} of 3</div>
        <hr class="mt-4 mb-2"/>
        <form method="POST">
            {#if page == 1}
                <div>
                    <label for="otherScouts">Scouting partner:</label> 
                        <select name="otherScouts">
                            <option value="none">None</option>
                            {#each data.members as member}
                                <option value={member.username}>{member.name.first} {member.name.last}</option>
                            {/each}
                    </select>
                    <div class="grid grid-rows-2 grid-cols-3">
                        <div class="row-start-1 row-span-1 col-start-1 col-span-2">
                            <label for="size">Length and Width?</label><br>
                            <input type="number" name="length" size="5"> x <input type="number" name="width" size="5"><br>
                        </div>
                        <div class="row-start-2 row-span-1 col-start-1 col-span-2">
                            <label for="height">Height?</label><br>
                            <input type="number" name="height" size="5"><br>
                        </div>
                        <div class="row-start-2 row-span-1 col-start-3 col-span-1 text-right">
                            <select name="sizeUnit">
                                {#each dimensions as dimension}
                                    <option value={dimension}>{dimension}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 grid-rows-2">
                        <div class="col-start-1 row-start-1">
                            <label for="weight">Weight?</label><br>
                        </div>
                        <div class="col-start-1 row-start-2">
                            <input type="number" name="weight" size="5">
                        </div>
                        <div class="col-start-2  row-start-2 text-right">
                            <select name="weightUnit">
                                {#each weight as weight}
                                    <option value={weight}>{weight}</option>
                                {/each}
                            </select>
                        </div><br>
                    </div>
                    <hr class="mb-2 mt-4"/>
                    <div class="grid grid-cols-2 grid-rows-2">
                        <div class="col-start-1 row-start-1">
                            <label for="speed">Speed?</label><br>
                            <input type="number" name="speed" size="5"><br>
                            <label for="">Drive train?</label><br>
                        </div>
                        <div class="col-start-1 col-span-2 row-start-2">
                            {#each drivetrains as module}
                                <input type="radio" name="drivetrain" value={module[1]} bind:group={driveTrain}/>{module[0]}
                                {#if driveTrain == "other" && module[1] == "other"}
                                    <input class="ml-3" type="text" name="otherDriveTrain" size="10"/>
                                {/if}
                                <br>
                            {/each}
                        </div>
                        <div class="col-start-2 row-start-1 text-right">
                            <br>
                            <select name="speedUnit">
                                {#each speed as speed}
                                    <option value={speed}>{speed}</option>
                                {/each}
                            </select>
                            /hr
                        </div>
                    </div>
                </div>
            {:else if page == 2}
                <div>
                    <label for="">Intake type?</label><br>
                    {#each intakes as intake}
                        <input type="radio" name="intakeType" value={intake[1]} bind:group={otherIntake}/>{intake[0]}
                        {#if otherIntake == "other" && intake[1] == "other"}
                            <input class="ml-3" type="text" name="otherIntake" size="10"/>
                        {/if}
                        <br>
                    {/each}
                    <hr class="mb-2 mt-4"/>
                    <label for="">Shooter type?</label><br>
                    {#each shooters as shooter}
                        <input type="radio" name="shooterType" value={shooter[1]} bind:group={otherShooter}/>{shooter[0]}
                        {#if otherShooter == "other" && shooter[1] == "other"}
                            <input class="ml-3" type="text" name="otherShooter" size="10"/>
                        {/if}
                        {#if otherShooter == "wheels" && shooter[1] == "wheels"}
                            Type?<input  class="ml-3" type="text" name="wheelType" size="10"/>
                        {/if}
                        <br>
                    {/each}
                    <hr class="mb-2 mt-4"/>
                    <label for="">Where can they score?</label><br>
                    {#each scoring as score}
                        <input name={score[1]} value={true} type="Checkbox"/> {score[0]}<br>
                    {/each}
                    <div class="grid grid-cols-1 grid-rows-2">
                        <div class="row-start-1">
                            <label for="shootingDistance">Max shooting distance?</label><br>
                        </div>
                        <div class="row-start-2">
                            <input type="number" name="shootingDistance" size="5">
                        </div>
                        <div class="row-start-2">
                            <select name="distanceUnit">
                                {#each distance as distance}
                                    <option >{distance}</option>
                                {/each}
                            </select>
                        </div><br>
                    </div>
                    <hr class="mb-2 mt-4"/>
                    <label for="">Climbing ability?</label><br>
                    {#each climbing as climb}
                        <input type="radio" name="climbingAbility" value={climb[1]}/>{climb[0]}
                        <br>
                    {/each}
                    <label for="maxAuto">Highest number of<br>pieces scored in auto?</label><br>
                    <input type="number" name="maxAutoScore" size="5"><br>
                    <hr class="mb-2 mt-4"/>
                    <label for="autoStrategy">Auto strategy?</label><br>
                    <textarea name="autoStrategy"></textarea>
                </div>
            {:else if page == 3}
                <div>
                    <label for="">Can they buddy climb?</label><br>
                    {#each buddyClimb as climb}
                        <input type="radio" name="buddyClimb" value={climb[1]}/>{climb[0]}<br>
                    {/each}
                    <hr class="mb-1 mt-2"/>
                    <label for="">Where do they prefer<br>to score?</label><br>
                    {#each scorePreference as score}
                        <input type="radio" name="scorePreference" value={score[1]}/>{score[0]}<br>
                    {/each}
                    <hr class="mb-1 mt-2"/>
                    <label for="">How well can they<br>score there?</label><br>
                    {#each scoreAbility as score}
                        <input type="radio" name="scoringAbility" />{score}<br>
                    {/each}
                    <hr class="mb-1 mt-2"/>
                    <label for="">Do they prefer amplify<br>or coop?</label><br>
                    {#each ampUse as amp}
                        <input type="radio" name="ampUse" />{amp}<br>
                    {/each}
                    <hr class="mb-1 mt-2"/>
                    <label for="">Where do they usually<br>intake?</label><br>
                    {#each intakePreference as intake}
                        <input type="radio" name="intakeLocation"/>{intake}<br>
                    {/each}
                </div>
            {/if}
        </form>

        <hr class="my-4"/>

        <div class="grid grid-rows-1 grid-cols-2">
            {#if page > 1}
                <div class="text-center">
                    <button class="border-rose-800 border-2 font-bold bg-gradient-to-br from-rose-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl" on:click={()=>{page--;}}>back</button>
                </div>
            {/if}
            {#if page == 1}
                <div class="text-center col-span-2">
                    <button class="border-sky-800 border-2 font-bold bg-gradient-to-br from-sky-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl" on:click={()=>{page++;}}>Continue</button>
                </div>
            {:else if page == 2}
                <div class="text-center col-start-2">
                    <button class="border-sky-800 border-2 font-bold bg-gradient-to-br from-sky-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl" on:click={()=>{page++;}}>Continue</button>
                </div>
            {:else if page == 3}
                <div class="text-center col-start-2">
                    <button class="border-sky-800 border-2 font-bold bg-gradient-to-br from-sky-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl" type="submit" value="Submit" on:click={()=>{page == 1;}}>Submit</button>
                </div>
            {/if}
        </div>
    </div>
</middle>