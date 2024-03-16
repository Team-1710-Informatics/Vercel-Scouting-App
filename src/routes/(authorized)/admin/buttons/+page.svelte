<script>
    export let data;

    let currentButtons = JSON.parse(data.data);

    $: buttons = currentButtons;

    let selected = "";

    function nextSmallest(field){
        let values =  [];
        buttons.forEach(e=>(
            values.push(e[field])
        ))
        let x = 0;
        for(let i = 0; i < values.length; i++){
            if(values[i] > x){
                x = values[i];
            }
        }
        return x + 1;
    }

    function newButton(){
        buttons.push(
            {
                id: nextSmallest('id'),
                name: "New",
                link: "/hub",
                width: 6,
                order: nextSmallest('order'),
                bMargin: 0,
                disabled: false,
                team: false
            }
        );
        buttons = buttons;
        selected = (nextSmallest('id') - 1);
    }

    function deleteButton(id){
        let buttonCopy = [];
        for (let e of buttons){
            if(id != e.id){
                buttonCopy.push(e)
            } 
        }
        buttons = buttonCopy;
        selected = '';
    }
</script>

<middle>
    <div class="rounded-lg px-5 py-4 my-5 bg-gradient-to-br from-slate-900 to-slate-800">
        {#if selected != ""}
            {#each buttons as button}
                {#if button.id == selected}
                    <div class="text-center mb-2">
                        <form method="POST">
                            <input type="text" hidden name="buttons" value={JSON.stringify(buttons)} />
                            <button class="border-sky-800 border-2 font-bold bg-gradient-to-br from-sky-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl" type="submit" value="Submit" on:click={()=>{console.log(buttons);}}>Submit</button>
                        </form>
                    </div>
                    <label>
                        Name
                        <input bind:value={button.name} type="text"/>
                    </label><br>
                    <label>
                        Path
                        <input bind:value={button.link} type="text"/>
                    </label><br>
                    <label>
                        Width
                        <input bind:value={button.width} type="number"/>
                    </label><br>
                    <label>
                        Order
                        <input bind:value={button.order} type="number"/>
                    </label><br>
                    <label>
                        Bottom Margin
                        <input bind:value={button.bMargin} type="number"/>
                    </label><br>
                    <label>
                        <input bind:checked={button.disabled} type="checkbox"/> Disabled
                    </label><br>
                    <label>
                        <input bind:checked={button.team} type="checkbox"/> Team 1710
                    </label><br>
                    <button on:click={deleteButton(button.id)} class="my-0 border-rose-800 border-2 font-bold bg-gradient-to-br from-rose-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl">
                        Delete
                    </button>
                {/if}
            {/each}
        {:else}
            Please Select a Button
        {/if}
    </div>
    <div class="grid grid-cols-6 w-60 gap-2">
        {#each buttons as button}
            {#if button.name == "Admin"}
                <div class="border-rose-800 border-2 font-bold bg-gradient-to-br from-rose-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl" style="grid-column: span {button.width} / span {button.width}; grid-row: start {button.order}; margin-bottom: {button.bMargin}px;"><button class={"w-full py-3"} on:click={()=>{selected = button.id}}>{button.name}</button></div>
            {:else}
                <div class="border-sky-800 border-2 font-bold bg-gradient-to-br from-sky-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl"style="grid-column: span {button.width} / span {button.width}; grid-row: start {button.order}; margin-bottom: {button.bMargin}px;"><button class={"w-full py-3"} on:click={()=>{selected = button.id}}>{button.name}</button></div>
            {/if}
        {/each}
    </div>
    <button on:click={newButton} class="my-10 border-sky-800 border-2 font-bold bg-gradient-to-br from-sky-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl">
        Add a Button
    </button>
</middle>
<style>
    button{
        scale: 100%;
        transition: scale 0.5s;
    }
    button:hover{
        scale: 112.5%;
    }
</style>