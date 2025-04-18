<script>
    import { onMount } from 'svelte'

    let picklist;

    export let data;

    const url = "http://localhost:5173/api/picklist/" // set to production url when needed

    async function fetchList() {
        let picklistFetch = await fetch(url + data.event)
        picklist = await picklistFetch.json()
        console.log("picklist", picklist)
    }

    onMount(async () => {
        await fetchList();
    })

    let inputTeam = 0;
    async function addTeam() {
        await fetch(url + data.event + `/add/${inputTeam}`)
        await fetchList()
    }

    async function removeTeam(team) {
        await fetch(url + data.event + `/remove/${team}`)
        await fetchList()
    }


</script>

<div class="w-fit mx-auto">
    <h1 class="text-center text-xl">Picklist</h1>
    <div class="flex flex-row mx-auto justify-center p-2 m-2 bg-slate-900 rounded-lg">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded text-sm" on:click={addTeam()}>
            Add
        </button>
        <input type="number" class="" bind:value={inputTeam}/>
    </div>
    {#if picklist}
        {#each picklist as item}
            {#if item.event !== "undefined"}
                <div class="flex flex-row justify-between items-center bg-slate-900 p-2 m-2 rounded-lg">
                    <h1>{item.team}</h1>
                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold p-1 px-2 rounded-full" on:click={removeTeam(item.team)}>
                        Remove
                    </button>
                </div>
            {/if}
        {/each}
    {/if}
</div>