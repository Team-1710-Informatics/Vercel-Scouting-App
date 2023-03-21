<script>
    export let data;
</script>

<center><div class="py-10 flex flex-col divide-y divide-white">
    {#each data.transactions as t}
        <div class="w-fit flex flex-row gap-4">
            <p>User: {t.user}</p>
            <p>{t.amount} credits</p>
            <p>{t.reason}</p>
        </div>
    {/each}
</div></center>