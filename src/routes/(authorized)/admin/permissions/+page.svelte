<script lang="ts">
    export let data;

    const list = JSON.parse(data.members)
    let user = "";

    const permissions = [
        "admin",
        "media",
        "pit",
        "maxwell"
    ];

    let permission = "";

    $: output = {
        user,
        permission
    }

    $: final = JSON.stringify(output);

</script>
<middle>
    <div class="box flex flex-col">
        Select User to modify:<br>
        <select bind:value={user}>
            <option value={null}></option>
            {#each list as member}
                <option value={member.username}>{member.name.first} {member.name.last}</option>
            {/each}
        </select>
        Select a permission:<br>
        <select bind:value={permission}>
            {#each permissions as c}
                <option value={c}>{c}</option>
            {/each}
        </select>

        </div>
        <form method="POST">
            <input hidden bind:value={final} name="data" required>
            <button class="submit" disabled={!(output.user && output.permission)}>Add Permission</button>
        </form>
</middle>