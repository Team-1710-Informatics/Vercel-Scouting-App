<script>
    export let data
</script>

<main class="w-screen flex flex-col justify-center items-center mt-5">
    <h1 class="mb-3">Event Scouting Coverage</h1>
    <table
        class="outline outline-2 overflow-auto w-fit p-1 divide-y divide-white"
    >
        <thead>
            <tr>
                <th>Event</th>
                <th>Matches</th>
                <th>Entries</th>
                <th>Unique Scouts</th>
                <th>Missing Entries</th>
                <th>Percent Missing</th>
                <th>Coverage</th>
                <th>Bonus Entries</th>
            </tr>
        </thead>
        <tbody>
            {#if data}
                {#each data.event as event}
                    <tr class="divide-y divide-x">
                        <td>{event.event}</td>
                        <td>{event.matches}</td>
                        <td>{event.scouts}</td>
                        <td>{event.uniqueScouts}</td>
                        <td>{event.missingScouts}</td>
                        <td
                            >{(
                                (event.missingScouts / event.scouts) *
                                100
                            ).toFixed(2)}%</td
                        >
                        <td>{(event.coverage * 100).toFixed(2)}%</td>
                        <td>{event.bonus}</td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</main>

<style>
    table {
        padding: 4px;
        text-align: center;
        border-radius: 4px;
    }

    th,
    td {
        padding: 8px; /* Add padding between columns */
    }

    select {
        padding: 2px;
        border-radius: 4px;
    }
</style>
