<script type="text/javascript">
    import Dropdown from '$lib/components/ui/Dropdown.svelte'

    const roleOptions = [
        "media",
        "admin",
        "drive",
        "pit",
        "maxwell"
    ]

    // selected amounts and roles
    $: roles = [];
    $: amounts = [];
    $: currencies = [];

    $: entries = [

    ]

    // binded to inputs
    let selectedRole = "";
    let selectedAmount = 2400;
    let selectedCurrency = "credits";

    // add a role and amount to lists
    function addRole() {
        entries.push({
            role: selectedRole,
            amount: selectedAmount,
            currency: selectedCurrency
        })
        entries = entries
        selectedAmount = 2400;
        selectedCurrency = "credits";
    }

    // data to pass to backend
    $: data = {
        entries,
    }

    $: output = JSON.stringify(data);

</script>

<middle>

    <div class="box">
        <select bind:value={selectedRole}>
            {#each roleOptions as p}
                <option value={p}>{p}</option>
            {/each}
        </select>
        <input type="number" class="w-24" defaultValue=2400 bind:value={selectedAmount} />
        <select bind:value={selectedCurrency}>
            <option value="credits">Credits</option>
            <option value="tokens">Tokens</option>
        </select>
        <button on:click={addRole}>Add</button>
        {#each entries as p}
            <p>{p.role} - {p.amount} {p.currency}</p>

        {/each}
    </div>

    <form method="POST">
        <input type="hidden" name="data" bind:value={output}/>
        <button class="submit">Payout Credits</button>
    </form>
</middle>
