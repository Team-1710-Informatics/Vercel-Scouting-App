<script lang=ts>
    import { slide } from "svelte/transition";
    import { onMount } from "svelte";
    import CompetitionTracker from "./CompetitionTracker.svelte";

    export let data:any;

    const links:[string, string, number, string?][] = [
        ["Leaderboard", '/leaderboard', 4, ''],
        ["Data", '/data/2023', 2, 'border-rose-600 bg-gradient-to-bl from-rose-600 to-red-300'],
        ["Pit Scouting", '/pit-scout/nav', 6, 'border-orange-600 bg-gradient-to-b from-orange-500 to-yellow-300'],
        ["Scout Match", '/scout/2023', 6, 'submit'],
    ]

    if(data.team === 1710){
        links.unshift(["Scamble", '/scamble/bets', 3, 
            'text-white border-slate-800 bg-gradient-to-t from-slate-800 to-teal-300'
        ],["Stocks", '/scamble/stocks', 3, 
            'text-black font-serif border-black bg-gradient-to-b from-white to-gray-400'
        ])
    }

    if(data.permissions.includes("admin")){
        links.unshift(["Admin", "/admin", 6, "border-red-600 bg-gradient-to-br from-rose-800 to-slate-600"])
    }

    let deferredPrompt:any;

    onMount(()=>{
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
        });
    })

    let secret = 0;
</script>

<svelte:head>
    <title>Scouting</title>
</svelte:head>

<middle>
    <div class="my-10 box" on:click={()=>{
        secret++;
        if(secret>=10){
            document.location.href = "/logofy";
        }
    }}>
        <CompetitionTracker events={data.events} />
    </div>
    {#if data.permissions.includes("investor")}
        <div class="pb-6 font-serif font-bold">Pleasure doing business with you, {data.user}</div>
    {/if}
    <div class="grid grid-cols-6 w-60 gap-2">
        {#each links as link}
            <a href={link[1]} class="w-full font-bold" style="grid-column: span {link[2]} / span {link[2]};"><button class={link?.[3]+" w-full py-3"}>{link[0]}</button></a>
        {/each}
    </div>
    <!-- {#if deferredPrompt}
        <button class="my-5" transition:slide on:click={deferredPrompt.prompt}>Install App</button>
    {/if} -->
</middle>