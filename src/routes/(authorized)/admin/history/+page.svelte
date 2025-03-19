<script>
    export let data

    let filter = ''
</script>

<input type="text" bind:value={filter} />
<center
    ><div class="py-10 flex flex-col-reverse divide-y divide-white">
        {#each data.transactions as t}
            {#if filter === '' || t.user === filter}
                <div class="w-fit flex flex-row gap-4">
                    <p>User: {t.user}</p>
                    <p>{t.amount} {t.currency}</p>
                    <p>{t.reason}</p>
                </div>
            {/if}
        {/each}
    </div></center
>
