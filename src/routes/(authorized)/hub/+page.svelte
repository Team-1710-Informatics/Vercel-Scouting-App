<script lang="ts">
    import CompetitionTracker from './CompetitionTracker.svelte'
    import QRcode from '$lib/components/ui/QR.svelte'

    export let data: any

    let buttons: object = JSON.parse(data.currentButtons)

    let previewLead: object = { name: '', start: '', end: '', day: '' }

    if (data.previewLead != '') {
        previewLead = JSON.parse(data.previewLead)
    }

    let previewScouts: object = JSON.parse(data.previewScouts)
    let previewBackups: object = JSON.parse(data.previewBackups)

    let upcomingLead: object = { name: '', start: '', end: '', day: '' }
    if (data.previewLead != '') {
        upcomingLead = JSON.parse(data.upcomingLead)
    }
    let upcomingScouts: object = JSON.parse(data.upcomingScouts)
    let upcomingBackups: object = JSON.parse(data.upcomingBackups)

    let users: object = JSON.parse(data.users)

    function isAdmin() {
        if (data.permissions.includes('admin')) {
            return true
        } else {
            return false
        }
    }

    const links: [string, string, number, number, number?, boolean?][] = [
        // name, path, width, order, bottom margin, disabled
        ['Scout Match', '/scout/2024', 6, 2, , false],
        ['Pit Scouting', '/pit-scout/nav', 6, 3, , false],
        ['Leaderboard', '/leaderboard', 4, 8, , false],
        ['Data', '/data/2024', 2, 8, , false],
        ['Scouting API', '/apidocs', 6, 9, 10, false],
    ]

    if (data.team === 1710) {
        links.unshift(
            ['Scamble', '/scamble/bets', 3, 6, , false],
            ['Store', '/store', 3, 6, , false],
            ['Stocks', '/scamble/stocks', 3, 7, , false],
            ['Metalshop', '/metal-shop', 3, 7, , false],
            ['Scouting Schedule', '/scouting-schedule', 6, 4, , false],
            ['Pit Schedule', '/pit-schedule', 6, 5, , true]
        )
    }

    if (data.permissions.includes('admin')) {
        links.unshift(['Admin', '/admin', 6, 1, , false])
    }

    let secret = 0
</script>

<svelte:head>
    <title>Scouting</title>
</svelte:head>

<middle>
    <div
        class="rounded-lg px-5 py-4 my-5 bg-gradient-to-br from-slate-900 to-slate-800"
        on:click={() => {
            secret++
            if (secret >= 10) {
                document.location.href = '/logofy'
            }
        }}
        on:keypress={() => {}}
    >
        <CompetitionTracker
            events={data.events}
            user={data.user}
            {users}
            lead={previewLead}
            scouts={previewScouts}
            backups={previewBackups}
            {upcomingLead}
            {upcomingScouts}
            {upcomingBackups}
        />
    </div>
    {#if data.permissions.includes('investor')}
        <div
            class="rounded-lg px-3 py-2 text-sm mb-3 bg-gradient-to-br from-slate-900 to-slate-800"
        >
            Pleasure doing business with you,<br />{data.user.first}
            {data.user.last}
        </div>
    {/if}
    <div class="grid grid-cols-6 w-60 gap-2">
        {#each buttons as button}
            {#if button.name == 'Admin'}
                {#if isAdmin() == true}
                    {#if button.disabled == false}
                        <a
                            href={button.link}
                            class="border-rose-800 border-2 font-bold bg-gradient-to-br from-rose-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl"
                            style="grid-column: span {button.width} / span {button.width}; grid-row: start {button.order}; margin-bottom: {button.bMargin}px;"
                            ><button class={'w-full py-3'}>{button.name}</button
                            ></a
                        >
                    {:else}
                        <a
                            href={button.link}
                            class="border-rose-800 border-2 font-bold bg-gradient-to-br from-rose-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl"
                            style="grid-column: span {button.width} / span {button.width}; grid-row: start {button.order}; margin-bottom: {button.bMargin}px;"
                            ><button disabled class={'w-full py-3'}
                                >{button.name}</button
                            ></a
                        >
                    {/if}
                {/if}
            {:else if button.team == true}
                {#if data.team == 1710}
                    {#if button.disabled == false}
                        <a
                            href={button.link}
                            class="border-sky-800 border-2 font-bold bg-gradient-to-br from-sky-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl"
                            style="grid-column: span {button.width} / span {button.width}; grid-row: start {button.order}; margin-bottom: {button.bMargin}px;"
                            ><button class={'w-full py-3'}>{button.name}</button
                            ></a
                        >
                    {:else}
                        <a
                            href={button.link}
                            class="border-sky-800 border-2 font-bold bg-gradient-to-br from-sky-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl"
                            style="grid-column: span {button.width} / span {button.width}; grid-row: start {button.order}; margin-bottom: {button.bMargin}px;"
                            ><button disabled class={'w-full py-3'}
                                >{button.name}</button
                            ></a
                        >
                    {/if}
                {/if}
            {:else if button.team == false}
                {#if button.disabled == false}
                    <a
                        href={button.link}
                        class="border-sky-800 border-2 font-bold bg-gradient-to-br from-sky-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl"
                        style="grid-column: span {button.width} / span {button.width}; grid-row: start {button.order}; margin-bottom: {button.bMargin}px;"
                        ><button class={'w-full py-3'}>{button.name}</button></a
                    >
                {:else}
                    <a
                        href={button.link}
                        class="border-sky-800 border-2 font-bold bg-gradient-to-br from-sky-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl"
                        style="grid-column: span {button.width} / span {button.width}; grid-row: start {button.order}; margin-bottom: {button.bMargin}px;"
                        ><button disabled class={'w-full py-3'}
                            >{button.name}</button
                        ></a
                    >
                {/if}
            {/if}
        {/each}
    </div>

    <!-- <PublicImageSlot path="hub/" name="hub.png" /> -->
</middle>

<style>
    button {
        scale: 100%;
        transition: scale 0.5s;
    }
    button:hover {
        scale: 112.5%;
    }
</style>
