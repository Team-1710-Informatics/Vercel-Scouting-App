<script lang=ts>
    import CompetitionTracker from "./CompetitionTracker.svelte";

    export let data:any;

    let upcomingLead = {name: '', start: '', end: '', day: ''};
    if(data.previewLead != ''){
        upcomingLead = JSON.parse(data.previewLead);
    }
    let upcomingScouts = JSON.parse(data.previewScouts);
    let upcomingBackups = JSON.parse(data.previewBackups);

    const links:[string, string, number, number, number?, string?, string?][] = [ // name, path, width, order, 
        ["Scout Match", '/scout/2024', 6, 2, , ''],
        ["Pit Scouting", '/pit-scout/nav', 6, 3, , ''],
        ["Leaderboard", '/leaderboard', 4, 8, , ''],
        ["Data", '/data/2024', 2, 8, , ''],
        ["Scouting API", '/apidocs', 6, 9, 10, '']
    ]

    if(data.team === 1710){
        links.unshift(
        // ["Scamble", '/scamble/bets', 3, 6, , ''],
        ["Store", '/store', 6, 6, , ''],
        // ["Stocks", '/scamble/stocks', 3, 7, , ''],
        ["Metalshop", '/metal-shop', 6,7, , ''],
        ["Scouting Schedule", '/scouting-schedule', 6, 4, , ''],
        ["Pit Schedule", '/pit-schedule', 6, 5, , ''])
    }

    if(data.permissions.includes("admin")){
        links.unshift(["Admin", "/admin", 6, 1, , '', ''])
    }

    let secret = 0;
</script>

<svelte:head>
    <title>Scouting</title>
</svelte:head>

<middle>
    <div class="rounded-lg px-5 py-4 my-5 bg-gradient-to-br from-slate-900 to-slate-800" on:click={()=>{
        secret++;
        if(secret>=10){
            document.location.href = "/logofy";
        }
    }} on:keypress={()=>{}}>
        <CompetitionTracker events={data.events} lead={upcomingLead} scouts={upcomingScouts} backups={upcomingBackups}/>
    </div>
    {#if data.permissions.includes("investor")}
        <div class="rounded-lg px-3 py-2 text-sm mb-3 bg-gradient-to-br from-slate-900 to-slate-800">Pleasure doing business with you,<br>{data.user.first} {data.user.last}</div>
    {/if}
    <div class="grid grid-cols-6 w-60 gap-2">
        {#each links as link}
            {#if link[0] == "Admin"}
                <a href={link[1]} class="border-rose-800 border-2 font-bold bg-gradient-to-br from-rose-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl"style="grid-column: span {link[2]} / span {link[2]}; grid-row: start {link[3]}; margin-bottom: {link[4]}px;"><button class={link?.[5]+" w-full py-3"}>{link[0]}</button></a>
            {:else}
                <a href={link[1]} class="border-sky-800 border-2 font-bold bg-gradient-to-br from-sky-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl"style="grid-column: span {link[2]} / span {link[2]}; grid-row: start {link[3]}; margin-bottom: {link[4]}px;"><button class={link?.[5]+" w-full py-3"}>{link[0]}</button></a>
            {/if}
        {/each}
    </div>

    <!-- <PublicImageSlot path="hub/" name="hub.png" /> -->
</middle>
<style>
    button{
        scale: 100%;
        transition: scale 0.5s;
    }
    button:hover{
        scale: 112.5%;
    }
</style>