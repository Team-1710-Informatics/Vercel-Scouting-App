<script>
    export let data

    let filter = ''
</script>
<input type="text" bind:value={filter} placeholder="filter username..." class="w-3/4 mx-auto"/>
<div class="w-full">
    <table class="py-10 flex flex-col-reverse w-3/4 mx-auto">
        {#each data.transactions as t}
            {#if filter === '' || t.user === filter}
                <tr class="flex flex-row gap-4 text-left">
                    <td class="w-1/3">User: {t.user}</td>
                    <td class="w-1/3">Amount: {t.amount} {t.currency}</td>
                    <td class="w-1/3">{t.reason}</td>
                </tr>
                <hr class="w-full"/>
            {/if}
        {/each}

    </table>
</div>
