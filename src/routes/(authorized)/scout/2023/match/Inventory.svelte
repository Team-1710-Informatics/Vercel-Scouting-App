<script lang=ts context="module" type="module">
    let nid = 0;
    let intake:{time?:number, type?:string, location?:"zone"|"midfield"|{x:number,y:number}, id?:number} = {};

    export function getIntake(){
        return intake;
    }

    export function deleteIntake(){
        intake = {};
    }

    export function getNextID(){
        return nid++;
    }
</script>

<script lang=ts>
    //@ts-ignore
    import slide from "svelte-slidediag-transition";
    import cube from "$lib/assets/scout/2023/cube.png";
    import cone from "$lib/assets/scout/2023/cone.png";
    import output from "$lib/assets/icons/output.svg";

    type InventoryItem = {
        time:number,
        type:"cone"|"cube",
        location:"zone"|"midfield"|{x:number,y:number},
        id:number
    }

    export let state:any & {
        time:number,
        started:boolean,
        inventory:InventoryItem[],
        actions:any[]
    };

    function initializeIntake(piece:string) {
        console.log("beans")
        intake.time = state.time;
        intake.type = piece;
        intake.id = nid;
        nid++;
    }

    function intakeStep2(location:"zone"|"midfield"|{x:number,y:number}){
        intake.location=location;
        state.inventory.push(intake);
        state.inventory=state.inventory;
        
        let foo:any = {action:"intake", ...intake}
        delete foo.id;
        state.actions.push(foo);
        deleteIntake();
    }
</script>

<div class="box flex flex-row w-fit">
    {#if true}
        <div class="grid grid-cols-1 h-fit" transition:slide>
            <p>Intake</p>
            <div class="grid grid-cols-2 self-start">
                <div class="grig grid-cols-1">
                    <button class="bg-none border-none mr-1 hover:bg-white/25 font-black" on:click = {()=>{initializeIntake("cube")}} style="width:32px; height:32px; background-image:url({cube})" transition:slide disabled={intake?.type != undefined || !state.started}></button>
                    <!-- {#key state.inventory}<div class:opacity-50={getNum("cube")===0}>{getNum("cube")}</div>{/key} -->
                </div>
                <div class="grig grid-cols-1">
                    <button class="bg-none border-none ml-1 hover:bg-white/25 font-black" on:click = {()=>{initializeIntake("cone")}} style="width:32px; height:32px; background-image:url({cone})" transition:slide disabled={intake?.type != undefined || !state.started}></button>
                    <!-- {#key state.inventory}<div class:opacity-50={getNum("cone")===0}>{getNum("cone")}</div>{/key} -->
                </div>
            </div>
        </div>
    {/if}
    {#key intake}
        {#if intake?.type != undefined}
            <div class="grid grid-cols-1 h-fit" transition:slide>
                <p>Select location</p>
                <div class="flex flex-row">
                    <button class="mr-1 px-2 h-fit output" on:click={()=>{intakeStep2("zone")}}><img alt="Take" class="w-6" src={output}></button><span class="mt-1 text-lg font-bold">Loading Zone</span>
                </div>
                <div class="flex flex-row">
                    <button class="mr-1 px-2 mt-0.5 h-fit output" on:click={()=>{intakeStep2("midfield")}}><img alt="Take" class="w-6" src={output}></button><span class="mt-1 text-lg font-bold">Midfield</span>
                </div>
            </div>
        {/if}
    {/key}
</div>

<style>
    .output {
        background-image: linear-gradient(to bottom right, rgb(249, 115, 22), rgb(251, 146, 60));
        border-color: rgb(234, 88, 12);
    }

    /* .input {
        background-image: linear-gradient(to bottom right, rgb(34, 197, 94), rgb(74, 222, 128));
        border-color: rgb(22, 163, 74);
    } */
</style>
