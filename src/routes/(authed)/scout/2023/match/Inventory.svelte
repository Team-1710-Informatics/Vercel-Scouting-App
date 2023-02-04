<script lang=ts>
    import { slide } from "svelte/transition";
    import { setContext, getContext } from 'svelte';

    let intake:{time?:number, type?:string, substation?:boolean, method?:string} = {};

    const inventory:any[] = [];
    setContext("inventory", ()=>inventory);

    const timer:()=>any = getContext("timer");
    const actions:()=>any = getContext("actions");

    function initializeIntake(piece:string) {
        intake.time = timer().time;
        intake.type = piece;
    }

    function intakeStep2(substation:boolean){
        intake.substation = substation;
    }

    function intakeStep3(method:string){
        intake.method = method;
        //@ts-ignore
        inventory.push(intake);
        //@ts-ignore
        actions().push(intake);
    }
//slide scoring
//output
//drop
//things that u can't answer disapear
</script>

<div class="box flex flex-row w-fit">
    <div class="grid grid-cols-1">
        <p>Intake</p>
        <div class="grid grid-cols-2">
            <button class="bg-gradient-to-br from-purple-600 to-purple-400 border-white mr-1" on:click = {()=>{initializeIntake("cube")}} transition:slide disabled={intake?.type != undefined}>C</button>
            <button class="bg-gradient-to-br from-amber-500 to-amber-300 border-white ml-1" on:click = {()=>{initializeIntake("cone")}} transition:slide disabled={intake?.type != undefined}>^</button>
        </div>
    </div>
    {#if intake?.type != undefined}
        <div class="grid grid-cols-1">
            <button class = "ml-5 mr-5 mt-5" on:click = {()=>{intakeStep2(true)}} transition:slide disabled={intake?.substation != undefined}>Substation</button>
            <br>
            <button class = "ml-5 mr-5 mt-0.5" on:click = {()=>{intakeStep2(false)}} transition:slide disabled={intake?.substation != undefined}>Elsewhere</button>
        </div>
    {/if}
    {#if intake?.substation}
        <div class = "grid grid-cols-1">
            <button on:click = {()=>{intakeStep3("shelf")}} transition:slide hidden={!intake?.substation}>Shelf</button>
            <button on:click = {()=>{intakeStep3("chute")}} transition:slide hidden={!intake?.substation}>Chute</button>
            <button on:click = {()=>{intakeStep3("floor")}} transition:slide>Floor</button>
        </div>
    {/if}
    {#if intake?.substation}
        <button on:click = {()=>{intakeStep3("floor")}} transition:slide disabled={intake?.method == "neutral"}>Floor</button>
        <p>or</p>
        <p>Select a Grid Spot</p>
    {/if}
</div>

