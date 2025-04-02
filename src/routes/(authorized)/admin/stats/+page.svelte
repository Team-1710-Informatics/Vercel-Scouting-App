<script>
    export let data
</script>

<main>
    <h1>Event Scouting Coverage</h1>
    <table>
        <thead>
        <tr>
            <th>Event</th>
            <th>Matches</th>
            <th>Scouts</th>
            <th>Coverage</th>
        </tr>
        </thead>
        <tbody>
        {#if data}
            {#each data.event as event}
                <tr>
                    <td>{event.event}</td>
                    <td>{event.matches}</td>
                    <td>{event.scouts}</td>
                    <td>{(event.coverage * 100).toFixed(2)}%</td>
                </tr>
            {/each}
        {/if}
        </tbody>
    </table>
</main>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
    }

    th {
        background-color: #f2f2f2;
        text-align: left;
    }
</style>