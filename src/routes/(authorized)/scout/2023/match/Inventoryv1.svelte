<script lang=ts>
    import slide from "svelte-slidediag-transition";
    import cube from "$lib/assets/scout/2023/cube.png";
    import cone from "$lib/assets/scout/2023/cone.png";

    type InventoryItem = {
        time:number,
        type:"cone"|"cube",
        substation:boolean,
        method:"shelf"|"chute"|"floor"|{x:number,y:number}
    }

    export let state:any & {
        time:number,
        started:boolean,
        inventory:InventoryItem[],
        actions:any[]
    };

    let intake:{time?:number, type?:string, substation?:boolean, method?:string} = {};

    function initializeIntake(piece:string) {
        intake.time = state.time;
        intake.type = piece;
    }
    function intakeStep2(substation:boolean){
        intake.substation = substation;
    }
    function intakeStep3(method:string){
        intake.method = method;
        state.inventory.push(<InventoryItem>intake);
        state.inventory = state.inventory
        state.actions.push(intake);
        intake = {}
    }

    function getNum(piece:"cube"|"cone"){
        let s = 0;
        state.inventory.forEach((item:InventoryItem)=>{
            if(item.type == piece) s++;
        })
        return s;
    }
</script>

<div class="box flex flex-row w-fit">
    <div class="grid grid-cols-1 h-fit">
        <p>Intake</p>
        <div class="grid grid-cols-2 self-start">
            <div class="grig grid-cols-1">
                <button class="bg-none border-none mr-1 hover:bg-white/25 font-black" on:click = {()=>{initializeIntake("cube")}} style="width:32px; height:32px; background-image:url({cube})" transition:slide disabled={intake?.type != undefined}></button>
                {#key state.inventory}<div class:opacity-50={getNum("cube")===0}>{getNum("cube")}</div>{/key}
            </div>
            <div class="grig grid-cols-1">
                <button class="bg-none border-none ml-1 hover:bg-white/25 font-black" on:click = {()=>{initializeIntake("cone")}} style="width:32px; height:32px; background-image:url({cone})" transition:slide disabled={intake?.type != undefined}></button>
                {#key state.inventory}<div class:opacity-50={getNum("cone")===0}>{getNum("cone")}</div>{/key}
            </div>
        </div>
    </div>
    {#if intake?.type != undefined}
        <div class="grid grid-cols-1 h-fit" transition:slide>
            <button class="ml-5 mr-5 h-fit" on:click = {()=>{intakeStep2(true)}} disabled={intake?.substation != undefined}>Loading Zone</button>
            <button class="ml-5 mr-5 mt-0.5 h-fit" on:click = {()=>{intakeStep2(false)}} disabled={intake?.substation != undefined}>Elsewhere</button>
        </div>
    {/if}
    {#if intake?.substation === false || intake?.substation === true}
        <div class = "grid grid-cols-1" transition:slide>
            <button on:click = {()=>{intakeStep3("shelf")}} hidden={!intake?.substation}>Shelf</button>
            <button on:click = {()=>{intakeStep3("chute")}} hidden={!intake?.substation}>Chute</button>
            <button on:click = {()=>{intakeStep3("floor")}}>Floor</button>
            <p hidden={intake?.substation}>or select<br>from grid</p>
        </div>
    {/if}
</div>

