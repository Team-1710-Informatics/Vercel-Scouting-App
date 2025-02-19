<script type="text/javascript">
    import Dropdown from '$lib/components/ui/Dropdown.svelte'

    const roles = [
        "media",
        "admin",
        "drive",
        "pit",
        "maxwell"
    ]

    // selected amounts and roles
    $: selected = [];
    $: amount = [];

    // binded to inputs
    let role = "";
    let selectedAmount = 2400;

    // add a role and amount to lists
    function addRole() {
        selected.push(role);
        selected = selected;
        amount.push(selectedAmount);
        amount = amount;
        selectedAmount = 2400;
    }

    // data to pass to backend
    $: data = {
        amount,
        selected
    }

    $: output = JSON.stringify(data);

</script>

<middle>

    <div class="box">
        <select bind:value={role}>
            {#each roles as p}
                <option value={p}>{p}</option>
            {/each}
        </select>
        <input type="number" defaultValue=2400 bind:value={selectedAmount} />
        <button on:click={addRole}>Add</button>
        {#each selected as p}
            <p>{p} - {amount[selected.indexOf(p)]}</p>
        {/each}
    </div>

    <form method="POST">
        <input type="hidden" name="data" bind:value={output}/>
        <button class="submit">Payout Credits</button>
    </form>
</middle>
