<script>
    const shifts = [
        {day: "Thursday", match: "Stuff", start: "start", end: "9:30am", name1: "Zach", name2: "Christine"},
        {day: "Thursday", match: "Stuff", start: "9:30am", end: "11:00am", name1: "Andrea", name2: "Austin"},
        {day: "Thursday", match: "Practice", start: "11:00am", end: "12:30am", name1: "Gabe", name2: "Cooper"},
    ]
</script>

<middle>
    <div class="bg-gray-800 gap-2 p-2 my-2 rounded-xl">
        <table>
            <tr>
                <td>
                    Thursday
                </td>
            </tr>
            <tr>
                <td>
                    <table>
                        <tr>
                            <td>
                                Stuff
                            </td>
                            <td>
                                <table>
                                    {#each shifts as shift}
                                        {#if shift.day == "Thursday" && shift.match == "Stuff"}
                                            <tr>
                                                <td>
                                                    {shift.start} - {shift.end}
                                                </td>
                                                <td>
                                                    {shift.name1}
                                                </td>
                                                <td>
                                                    {shift.name2}
                                                </td>
                                            </tr>
                                        {/if}
                                    {/each}
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Practice
                            </td>
                            <td>
                                {#each shifts as shift}
                                        {#if shift.day == "Thursday" && shift.match == "Practice"}
                                            <tr>
                                                <td>
                                                    {shift.start} - {shift.end}
                                                </td>
                                                <td>
                                                    {shift.name1}
                                                </td>
                                                <td>
                                                    {shift.name2}
                                                </td>
                                            </tr>
                                        {/if}
                                    {/each}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    Friday
                </td>
            </tr>
            <tr>
                <td>
                    <table>
                        <tr>
                            <td>
                                Qualification
                            </td>
                            <td>
                                
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    Saturday
                </td>
            </tr>
            <tr>
                <td>
                    <table>
                        <tr>
                            <td>
                                Qualification
                            </td>
                            <td>
                                
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Elimination
                            </td>
                            <td>
                                
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</middle>
<style>
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
    }

    td, th {
        border: 2px solid black;
        text-align: left;
        padding: 8px;
    }
</style>