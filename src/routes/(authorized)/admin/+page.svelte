<script lang="ts">
    import { enhance } from '$app/forms'

    export let data

    const list = JSON.parse(data.members)

    type Reason = {
        name: string
        fields: { name: string; type: string; answer?: any }[]
        calculate: () => number
        reason: () => string
    }

    let user: string | null = null
    let reason: number = 0
    let reasons: Reason[] = [
        {
            name: 'Screenshots for Credits',
            fields: [
                { name: 'Friends/Family', type: 'number' },
                { name: 'Social Media', type: 'number' },
                { name: 'Participation', type: 'checkbox' },
            ],
            calculate: function () {
                //@ts-ignore
                return (
                    this.fields[0]?.answer * 30 +
                    this.fields[1]?.answer * 60 +
                    (this.fields[2]?.answer ? 100 : 0)
                )
            },
            reason: function () {
                return 'Screenshots for Credits'
            },
        },
        {
            name: 'Pit crew shifts',
            fields: [{ name: '# of shifts', type: 'number' }],
            calculate: function () {
                return this.fields[0]?.answer * 350
            },
            reason: function () {
                return 'Pit crew'
            },
        },
        {
            name: 'Secret, more sinister option',
            fields: [{ name: 'Amount', type: 'number' }],
            calculate: function () {
                //@ts-ignore
                return this.fields[0]?.answer
            },
            reason: function () {
                return 'Secret, more sinister option'
            },
        },
        {
            name: 'Other',
            fields: [
                { name: 'Amount', type: 'number' },
                { name: 'Reason', type: 'text' },
            ],
            calculate: function () {
                //@ts-ignore
                return this.fields[0]?.answer
            },
            reason: function () {
                return this.fields[1]?.answer
            },
        },
    ]

    function reset() {
        for (let j = 0; j < reasons.length; j++) {
            for (let i = 0; i < reasons[j].fields.length; i++) {
                reasons[j].fields[i].answer = ''
            }
        }
    }

    $: output = {
        user,
        amount: reasons[reason].calculate(),
        reason: reasons[reason].reason(),
    }

    $: final = JSON.stringify(output)

    let loading = false
</script>

<middle>
    <div class="box flex flex-col">
        Perform a credit transaction:<br />
        <select bind:value={user}>
            <option value={null}></option>
            {#each list as member}
                <option value={member.username}
                    >{member.name.first} {member.name.last}</option
                >
            {/each}
        </select>
        <select bind:value={reason}>
            {#each reasons as reason, i}
                <option value={i}>{reason.name}</option>
            {/each}
        </select>
        {#each reasons[+reason].fields as field}
            {#if field.type == 'text'}
                <label
                    >{field.name}
                    <input type="text" bind:value={field.answer} />
                </label>
            {:else if field.type == 'number'}
                <label
                    >{field.name}
                    <input type="number" bind:value={field.answer} />
                </label>
            {:else if field.type == 'checkbox'}
                <label
                    >{field.name}
                    <input type="checkbox" bind:checked={field.answer} />
                </label>
            {/if}
        {/each}
        <form
            method="POST"
            use:enhance={() => {
                loading = true
                //@ts-ignore
                return async ({ update }) => {
                    await update()
                    reset()
                    loading = false
                }
            }}
        >
            <input type="text" hidden name="data" bind:value={final} />
            <button
                class="submit"
                disabled={!(output.amount && output.reason && output.user) ||
                    loading}>Apply {output.amount} Credits</button
            >
        </form>
    </div>
    <br />
    <p class="font-bold">{'(Experimental) Active scouts:'}</p>
    {#each data.scouting as s}
        <p>{s.name.first} {s.name.last}</p>
    {/each}
    <br />
    <br />
    <div class="flex flex-row">
        <a href="/admin/history"
        ><button class="submit my-1 w-40 h-14">Transaction history</button></a
        >
        <a href="/admin/store"
        ><button class="submit my-1 w-40 h-14">Add a store item</button></a
        >
    </div>
    <div class="flex flex-row">
        <a href="/admin/scan"
        ><button class="submit my-1 w-40 h-14">Scan QR Code</button></a
        >
        <a href="/admin/buttons"
        ><button class="submit my-1 w-40 h-14">Edit Buttons</button></a
        >
    </div>
    <div class="flex flex-row">
        <a href="/admin/releases"
        ><button class="submit my-1 w-40 h-14">Shift Releases</button></a
        >
        <a href="/admin/permissions"
        ><button class="submit my-1 w-40 h-14">Edit Permissions</button></a
        >
    </div>

    <div class="flex flex-row">
        <a href="/admin/payout"><button class="submit my-1 w-40 h-14">Media/Pit Payout</button></a>
        <a href="/admin/pictures"><button class="submit my-1 w-40 h-14">Pit Scout Pictures</button></a>
    </div>

</middle>
