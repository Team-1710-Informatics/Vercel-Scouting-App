<script lang="ts">
    export let data;

    const list = JSON.parse(data.members);

    let remove = false;

    const permissions = [
        "admin",
        "media",
        "pit",
        "maxwell"
    ];

    let permission = "default";

    let user = {
        username: "default",
        permissions: ["no user selected"],
    };

    $: username = user.username;

    $: output = {
        username,
        permission,
        remove
    }

    $: final = JSON.stringify(output);

</script>

<middle>
    <div class="box flex flex-col">
        Select User to modify:<br>
        <select bind:value={user}>
            {#each list as member}
                <option value={member}>{member.name.first} {member.name.last}</option>
            {/each}
        </select>

        <div class="box">
            {#each user.permissions as p}
            <p>{p}</p>
        {/each}
        </div>

        <div class="flex flex-row">
            <p class="mr-3">Remove</p>
            <input type="checkbox" bind:checked={remove}/>
        </div>


        {#if remove}
            Remove a permission:
        {/if}
        {#if !remove}
            Add a permission:
        {/if}
        <br>
        <select bind:value={permission}>
            {#each permissions as c}
                <option value={c}>{c}</option>
            {/each}
        </select>

        <form method="POST">
            <input hidden bind:value={final} name="data" required>
            <button class="submit" disabled={!(output.username && output.permission)}>Edit Permission</button>
        </form>
</middle>