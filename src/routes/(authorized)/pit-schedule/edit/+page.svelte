<script lang="ts">
    export let data: any

    let u = JSON.parse(data.users)
    let sd = JSON.parse(data.scheduledays)
    let sp = JSON.parse(data.schedulepositions)
    let l = JSON.parse(data.leads)
    let s = JSON.parse(data.scouts)

    $: users = u
    $: scheduledays = sd
    $: schedulepositions = sp
    $: scouts = s
    $: leads = l

    $: selected = data.selected

    let times = [
        { half: false, time: 1 },
        { half: true, time: 1 },
        { half: false, time: 2 },
        { half: true, time: 2 },
        { half: false, time: 3 },
        { half: true, time: 3 },
        { half: false, time: 4 },
        { half: true, time: 4 },
        { half: false, time: 5 },
        { half: true, time: 5 },
        { half: false, time: 6 },
        { half: true, time: 6 },
        { half: false, time: 7 },
        { half: true, time: 7 },
        { half: false, time: 8 },
        { half: true, time: 8 },
        { half: false, time: 9 },
        { half: true, time: 9 },
        { half: false, time: 10 },
        { half: true, time: 10 },
        { half: false, time: 11 },
        { half: true, time: 11 },
        { half: false, time: 12 },
        { half: true, time: 12 },
        { half: false, time: 13 },
        { half: true, time: 13 },
        { half: false, time: 14 },
        { half: true, time: 14 },
        { half: false, time: 15 },
        { half: true, time: 15 },
        { half: false, time: 16 },
        { half: true, time: 16 },
        { half: false, time: 17 },
        { half: true, time: 17 },
        { half: false, time: 18 },
        { half: true, time: 18 },
        { half: false, time: 19 },
        { half: true, time: 19 },
        { half: false, time: 20 },
        { half: true, time: 20 },
        { half: false, time: 21 },
        { half: true, time: 21 },
        { half: false, time: 22 },
        { half: true, time: 22 },
        { half: false, time: 23 },
        { half: true, time: 23 },
        { half: false, time: 24 },
        { half: true, time: 24 },
    ]

    function formatTime(time: any) {
        let finalTime = time.time
        if (time.time > 12) {
            let newTime = time.time - 12
            if (!time.half) {
                finalTime = newTime + ':00 P.M.'
            } else if (time.half) {
                finalTime = newTime + ':30 P.M.'
            }
        } else {
            if (!time.half) {
                finalTime = time.time + ':00 A.M.'
            } else if (time.half) {
                finalTime = time.time + ':30 A.M.'
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
                position: 'scout',
                leadId: id,
                id: nextId() + 2,
            },
            {
                name: '',
                position: 'scout',
                leadId: id,
                id: nextId() + 3,
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

        schedulepositions = schedulepositions
        leads = leads
        scouts = scouts
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
        })
        scheduledays = scheduledays
        selected = newId
    }

    $: w = 0
</script>

<svelte:window bind:innerWidth={w} />

<middle>
    {#if w >= 445}
        <div class="bg-gray-800 flex flex-row gap-2 p-2 my-2 rounded-3xl">
            {#each scheduledays as day}
                {#if selected != day.id}
                    <button
                        on:click={() => (selected = day.id)}
                        class="bg-gray-700 rounded-2xl"
                    >
                        <input
                            bind:value={day.name}
                            style="width:120px"
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
                            style="width:120px"
                            type="text"
                            class="text-black bg-gray-500 border-0 rounded-2xl px-2"
                        />
                    </button>
                {/if}
            {/each}
            <button on:click={() => newDay()} class="bg-green-700 rounded-2xl">
                New Button
            </button>
            <button
                on:click={() => deleteDay(selected)}
                class="bg-rose-700 rounded-2xl"
            >
                Delete Button
            </button>
            <form method="POST">
                <input
                    type="text"
                    hidden
                    name="days"
                    value={JSON.stringify(scheduledays)}
                />
                <input
                    type="text"
                    hidden
                    name="leads"
                    value={JSON.stringify(leads)}
                />
                <input
                    type="text"
                    hidden
                    name="scouts"
                    value={JSON.stringify(scouts)}
                />
                {#if w > 548}
                    <button
                        class="bg-green-700 rounded-2xl submit"
                        type="submit"
                        value="Submit"
                    >
                        Submit
                    </button>
                {:else}
                    <button
                        style="height:56px"
                        class="bg-green-700 rounded-2xl submit"
                        type="submit"
                        value="Submit"
                    >
                        Submit
                    </button>
                {/if}
            </form>
            {#if w > 548}
                <a
                    href="/pit-schedule"
                    class="bg-gray-700 rounded-2xl py-1 px-2"
                >
                    Back
                </a>
            {:else}
                <a
                    href="/pit-schedule"
                    class="bg-gray-700 rounded-2xl py-4 px-2"
                >
                    Back
                </a>
            {/if}
        </div>
    {:else}
        <div class="bg-gray-800 flex flex-col gap-2 p-2 my-2 rounded-3xl">
            {#each scheduledays as day}
                {#if selected != day.id}
                    <button
                        on:click={() => (selected = day.id)}
                        class="bg-gray-700 rounded-2xl"
                    >
                        <input
                            bind:value={day.name}
                            style="width:120px"
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
                            style="width:120px"
                            type="text"
                            class="text-black bg-gray-500 border-0 rounded-2xl px-2"
                        />
                    </button>
                {/if}
            {/each}
            <div class="flex flex-row">
                <button
                    on:click={() => newDay()}
                    class="bg-green-700 rounded-2xl mx-2"
                >
                    New Button
                </button>
                <button
                    on:click={() => deleteDay(selected)}
                    class="bg-rose-700 rounded-2xl mx-2"
                >
                    Delete Button
                </button>
                <form method="POST">
                    <input
                        type="text"
                        hidden
                        name="days"
                        value={JSON.stringify(scheduledays)}
                    />
                    <input
                        type="text"
                        hidden
                        name="leads"
                        value={JSON.stringify(leads)}
                    />
                    <input
                        type="text"
                        hidden
                        name="scouts"
                        value={JSON.stringify(scouts)}
                    />
                    {#if w > 548}
                        <button
                            class="bg-green-700 rounded-2xl submit mx-2"
                            type="submit"
                            value="Submit"
                        >
                            Submit
                        </button>
                    {:else}
                        <button
                            style="height:56px"
                            class="bg-green-700 rounded-2xl submit mx-2"
                            type="submit"
                            value="Submit"
                        >
                            Submit
                        </button>
                    {/if}
                </form>
                {#if w > 548}
                    <a
                        href="/pit-schedule"
                        class="bg-gray-700 rounded-2xl py-1 px-2 mx-2"
                    >
                        Back
                    </a>
                {:else}
                    <a
                        href="/pit-schedule"
                        class="bg-gray-700 rounded-2xl py-4 px-2 mx-2"
                    >
                        Back
                    </a>
                {/if}
            </div>
        </div>
    {/if}
    <div class="bg-gray-800 gap-2 p-2 my-2 rounded-3xl">
        <table>
            <tr>
                <th>Time</th>
                <th>Match Type</th>
                <th>Pit Crew</th>
            </tr>
            {#each leads as lead}
                {#if lead.dayId == selected}
                    <tr>
                        <td>
                            <select
                                class="text-sm"
                                style="width:90px; text-overflow:ellipsis"
                                bind:value={lead.start}
                            >
                                {#each times as time}
                                    <option value={time}
                                        >{formatTime(time)}</option
                                    >
                                {/each}
                            </select><br />
                            to<br />
                            <select
                                class="text-sm"
                                style="width:90px; text-overflow:ellipsis"
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
                                style="width:110px; text-overflow:ellipsis"
                                bind:value={lead.name}
                            >
                                <option value=""></option>
                                <option value="Stuff">Stuff</option>
                                <option value="Practice">Practice</option>
                                <option value="Qualifications"
                                    >Qualifications</option
                                >
                                <option value="Eliminations"
                                    >Eliminations</option
                                >
                            </select><br />
                            <button
                                on:click={() => deleteShift(lead.id)}
                                class="bg-rose-700 rounded-2xl"
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
                                        <option value="Experienced Members"
                                            >Experienced Members</option
                                        >
                                        {#each users as user}
                                            <option value={user.username}
                                                >{user.name.first}
                                                {user.name.last}</option
                                            >
                                        {/each}
                                    </select><br />
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
            on:click={() => {
                newShift(selected)
            }}
            class="bg-gray-700 rounded-2xl"
        >
            Add Shift
        </button>
    </div>
</middle>

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
