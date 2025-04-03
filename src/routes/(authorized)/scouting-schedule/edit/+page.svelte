<script lang="ts">
    export let data: any

    let u = JSON.parse(data.users)
    let sd = JSON.parse(data.scheduledays)
    let sp = JSON.parse(data.schedulepositions)
    let l = JSON.parse(data.leads)
    let s = JSON.parse(data.scouts)
    let b = JSON.parse(data.backups)

    $: users = u
    $: scheduledays = sd
    $: schedulepositions = sp
    $: scouts = s
    $: leads = l
    $: backups = b

    $: selected = data.selected

    let times = [
        1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5,
        10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5,
        17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5,
        24,
    ]

    let dates = [
        {day: 1, value: '01'},
        {day: 2, value: '02'},
        {day: 3, value: '03'},
        {day: 4, value: '04'},
        {day: 5, value: '05'},
        {day: 6, value: '06'},
        {day: 7, value: '07'},
        {day: 8, value: '08'},
        {day: 9, value: '09'},
        {day: 10, value: '10'},
        {day: 11, value: '11'},
        {day: 1, value: '12'},
        {day: 13, value: '13'},
        {day: 14, value: '14'},
        {day: 15, value: '15'},
        {day: 16, value: '16'},
        {day: 17, value: '17'},
        {day: 18, value: '18'},
        {day: 19, value: '19'},
        {day: 20, value: '20'},
        {day: 21, value: '21'},
        {day: 22, value: '22'},
        {day: 23, value: '23'},
        {day: 24, value: '24'},
        {day: 25, value: '25'},
        {day: 26, value: '26'},
        {day: 27, value: '27'},
        {day: 28, value: '28'},
        {day: 29, value: '29'},
        {day: 30, value: '30'},
        {day: 31, value: '31'},
    ]
    let months = [
        {month: 1, value: '01'},
        {month: 2, value: '02'},
        {month: 3, value: '03'},
        {month: 4, value: '04'},
        {month: 5, value: '05'},
        {month: 6, value: '06'},
        {month: 7, value: '07'},
        {month: 8, value: '08'},
        {month: 9, value: '09'},
        {month: 10, value: '10'},
        {month: 11, value: '11'},
        {month: 12, value: '12'},
    ]
    let years = [
        {year: 2024, value: '2024'},
        {year: 2025, value: '2025'},
        {year: 2026, value: '2026'},
    ]
    let timezones = ['EST', 'EDT', 'CST', 'CDT', 'MST', 'MDT', 'PST', 'PDT']

    function formatTime(time: any) {
        let finalTime = time
        if (time > 12) {
            let newTime = time - 12
            if (time % 1 == 0.5) {
                finalTime = newTime - 0.5 + ':30 P.M.'
            } else {
                finalTime = newTime + ':00 P.M.'
            }
        } else {
            if (time % 1 == 0.5) {
                finalTime = time - 0.5 + ':30 A.M.'
            } else {
                finalTime = time + ':00 A.M.'
            }
        }
        return finalTime
    }

    function nextId() {
        let findId = 0
        schedulepositions.forEach((e: any) => {
            if (e.id > findId) {
                findId = e.id
            }
        })
        return findId
    }

    function newShift(day: any) {
        let id = nextId() + 1
        let newLead = [
            {
                name: '',
                position: 'lead',
                start: 1,
                end: 1,
                dayId: day,
                id: id,
            },
        ]

        let newScouts = [
            {
                name: '',
                team: 'Blue 1',
                position: 'scout',
                releasing: false,
                leadId: id,
                id: nextId() + 2,
            },
            {
                name: '',
                team: 'Blue 2',
                position: 'scout',
                releasing: false,
                leadId: id,
                id: nextId() + 3,
            },
            {
                name: '',
                team: 'Blue 3',
                position: 'scout',
                releasing: false,
                leadId: id,
                id: nextId() + 4,
            },
            {
                name: '',
                team: 'Red 1',
                position: 'scout',
                releasing: false,
                leadId: id,
                id: nextId() + 5,
            },
            {
                name: '',
                team: 'Red 2',
                position: 'scout',
                releasing: false,
                leadId: id,
                id: nextId() + 6,
            },
            {
                name: '',
                team: 'Red 3',
                position: 'scout',
                releasing: false,
                leadId: id,
                id: nextId() + 7,
            },
        ]

        let newBackups = [
            {
                name: '',
                position: 'backup',
                leadId: id,
                id: nextId() + 8,
            },
            {
                name: '',
                position: 'backup',
                leadId: id,
                id: nextId() + 9,
            },
        ]
        newLead.forEach((e) => {
            schedulepositions.push(e)
            leads.push(e)
        })
        newScouts.forEach((e) => {
            schedulepositions.push(e)
            scouts.push(e)
        })
        newBackups.forEach((e) => {
            schedulepositions.push(e)
            backups.push(e)
        })

        schedulepositions = schedulepositions
        leads = leads
        scouts = scouts
        backups = backups
    }

    function deleteShift(givenId: any) {
        let schedulepositionsCopy: any = []
        schedulepositions.forEach((e: any) => {
            if (e.leadId != givenId && e.id != givenId) {
                schedulepositionsCopy.push(e)
            }
        })
        schedulepositions = schedulepositionsCopy
        let leadsCopy: any = []
        leads.forEach((e: any) => {
            if (e.id != givenId) {
                leadsCopy.push(e)
            }
        })
        leads = leadsCopy
        let scoutsCopy: any = []
        scouts.forEach((e: any) => {
            if (e.leadId != givenId) {
                scoutsCopy.push(e)
            }
        })
        scouts = scoutsCopy
        let backupsCopy: any = []
        backups.forEach((e: any) => {
            if (e.leadId != givenId) {
                backupsCopy.push(e)
            }
        })
        backups = backupsCopy
    }

    function deleteDay(givenId: any) {
        if (scheduledays.length === 1) {
            scheduledays = []
            scheduledays = scheduledays
        } else {
            let scheduledaysCopy: any = []
            scheduledays.forEach((e: any) => {
                if (e.id != givenId) {
                    scheduledaysCopy.push(e)
                }
            })
            scheduledays = scheduledaysCopy
        }
        let leadIds: any = []
        let schedulepositionsCopy: any = []
        schedulepositions.forEach((e: any) => {
            if (e.dayId != givenId) {
                schedulepositionsCopy.push(e)
            }
        })
        schedulepositions = schedulepositionsCopy
        let leadsCopy: any = []
        leads.forEach((e: any) => {
            if (e.dayId != givenId) {
                leadsCopy.push(e)
            } else if (e.dayId == givenId) {
                leadIds.push(e.id)
            }
        })
        leads = leadsCopy
        leadIds.forEach((e: any) => {
            deleteShift(e)
        })
        selected = scheduledays[0].id
        if (scheduledays[0].id == undefined) {
            selected = 0
        }
    }

    function nextDayId() {
        let findDayId = 0
        scheduledays.forEach((e: any) => {
            if (e.id > findDayId) {
                findDayId = e.id
            }
        })
        return findDayId
    }

    function newDay() {
        let newId = nextDayId() + 1
        scheduledays.push({
            name: 'New',
            id: newId,
            year: '2024',
            month: '01',
            day: '01',
            timezone: 'EST',
        })
        scheduledays = scheduledays
        selected = newId
    }
</script>

<div class="middle">
    <div class="bg-gray-800 flex flex-row gap-2 p-2 my-2 rounded-3xl">
        {#each scheduledays as day}
            {#if selected != day.id}
                <button
                        on:click={() => (selected = day.id)}
                        class="bg-gray-700 rounded-2xl"
                >
                    <input
                            bind:value={day.name}
                            type="text"
                            class="text-black bg-gray-500 border-0 rounded-2xl px-2"
                    />
                </button>
            {/if}
            {#if selected == day.id}
                <button
                        on:click={() => (selected = day.id)}
                        class="bg-gray-800 rounded-2xl"
                >
                    <input
                            bind:value={day.name}
                            type="text"
                            class="text-black bg-gray-500 border-0 rounded-2xl px-2"
                    />
                </button>
            {/if}
        {/each}
        <button class="bg-green-700 rounded-2xl" on:click={() => newDay()}>
            New Button
        </button>
        <button
                class="bg-rose-700 rounded-2xl"
                on:click={() => deleteDay(selected)}
        >
            Delete Button
        </button>
        <form method="POST">
            <input
                    hidden
                    name="days"
                    type="text"
                    value={JSON.stringify(scheduledays)}
            />
            <input
                    hidden
                    name="leads"
                    type="text"
                    value={JSON.stringify(leads)}
            />
            <input
                    hidden
                    name="scouts"
                    type="text"
                    value={JSON.stringify(scouts)}
            />
            <input
                    hidden
                    name="backups"
                    type="text"
                    value={JSON.stringify(backups)}
            />
            <button
                    class="bg-green-700 rounded-2xl submit"
                    type="submit"
                    value="Submit"
            >
                Submit
            </button>
        </form>
        <a class="bg-gray-700 rounded-2xl py-1 px-2" href="/scouting-schedule">
            Back
        </a>
    </div>
    <div class="bg-gray-800 gap-2 p-2 my-2 rounded-3xl">
        {#each scheduledays as day}
            {#if selected == day.id}
                <select
                        class="text-sm"
                        style="width:60px; text-overflow:ellipsis"
                        bind:value={day.year}
                >
                    {#each years as year}
                        <option value={year.value}>{year.year}</option>
                    {/each}
                </select>
                <select
                        class="text-sm"
                        style="width:45px; text-overflow:ellipsis"
                        bind:value={day.month}
                >
                    {#each months as month}
                        <option value={month.value}>{month.month}</option>
                    {/each}
                </select>
                <select
                        class="text-sm"
                        style="width:45px; text-overflow:ellipsis"
                        bind:value={day.day}
                >
                    {#each dates as date}
                        <option value={date.value}>{date.day}</option>
                    {/each}
                </select><br/>
                Timezone
                <select
                        class="text-sm"
                        style="width:60px; text-overflow:ellipsis"
                        bind:value={day.timezone}
                >
                    {#each timezones as timezone}
                        <option value={timezone}>{timezone}</option>
                    {/each}
                </select>
            {/if}
        {/each}
    </div>
    <div class="bg-gray-800 gap-2 p-2 my-2 rounded-3xl">
        <table>
            <tr>
                <th>Time</th>
                <th>Lead</th>
                <th>Scouts</th>
                <th>Backups</th>
            </tr>
            {#each leads as lead}
                {#if lead.dayId == selected}
                    <tr>
                        <td>
                            <select
                                    class="text-sm"
                                    style="width:120px; text-overflow:ellipsis"
                                    bind:value={lead.start}
                            >
                                {#each times as time}
                                    <option value={time}
                                    >{formatTime(time)}</option
                                    >
                                {/each}
                            </select><br/>
                            to<br/>
                            <select
                                    class="text-sm"
                                    style="width:120px; text-overflow:ellipsis"
                                    bind:value={lead.end}
                            >
                                {#each times as time}
                                    <option value={time}
                                    >{formatTime(time)}</option
                                    >
                                {/each}
                            </select>
                        </td>
                        <td>
                            <select
                                    class="text-sm"
                                    style="width:120px; text-overflow:ellipsis"
                                    bind:value={lead.name}
                            >
                                <option value=""></option>
                                {#each users as user}
                                    <option value={user.username}
                                    >{user.name.first}
                                        {user.name.last}</option
                                    >
                                {/each}
                            </select><br/>
                            <button
                                    on:click={() => deleteShift(lead.id)}
                                    class="bg-gray-700 rounded-2xl"
                            >
                                Delete Shift
                            </button>
                        </td>
                        <td>
                            {#each scouts as scout}
                                {#if scout.leadId == lead.id}
                                    <select
                                            class="text-sm"
                                            style="width:120px; text-overflow:ellipsis"
                                            bind:value={scout.name}
                                    >
                                        <option value=""></option>
                                        {#each users as user}
                                            <option value={user.username}
                                            >{user.name.first}
                                                {user.name.last}</option
                                            >
                                        {/each}
                                    </select><br/>
                                {/if}
                            {/each}
                        </td>
                        <td>
                            {#each backups as backup}
                                {#if backup.leadId == lead.id}
                                    <select
                                            class="text-sm"
                                            style="width:120px; text-overflow:ellipsis"
                                            bind:value={backup.name}
                                    >
                                        <option value=""></option>
                                        {#each users as user}
                                            <option value={user.username}
                                            >{user.name.first}
                                                {user.name.last}</option
                                            >
                                        {/each}
                                    </select><br/>
                                {/if}
                            {/each}
                        </td>
                    </tr>
                {/if}
            {/each}
        </table>
    </div>
    <div class="bg-gray-800 flex flex-row gap-2 p-2 my-2 rounded-3xl">
        <button
                class="bg-gray-700 rounded-2xl"
                on:click={() => newShift(selected)}
        >
            Add Shift
        </button>
    </div>
</div>

<style>
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
    }

    td,
    th {
        border: 2px solid black;
        text-align: left;
        padding: 8px;
    }
</style>
