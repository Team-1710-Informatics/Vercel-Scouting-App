<script lang=ts>
    import CompetitionTracker from "./CompetitionTracker.svelte";

    export let data:any;

    const links:[string, string, number, string?][] = [
        ["Leaderboard", '/leaderboard', 4, ''],
        ["Data", '/data', 2, 'border-orange-600 bg-gradient-to-bl from-orange-500 to-yellow-300'],
        ["Scout", '/scout/2023/pre', 6, 'submit'],
        ["Simon Cowell", '/simon', 6, ''],
    ]

    if(data.permissions.includes("admin") || data.user == "Brooks"){
        links.unshift(["Admin", "/admin", 6, "border-red-600 bg-gradient-to-br from-rose-800 to-pink-600"])
    }
</script>

<svelte:head>
    <title>Scouting</title>
</svelte:head>

<middle>
    <div class="my-10 box">
        <CompetitionTracker events={data.events} />
    </div>
    <div class="grid grid-cols-6 w-60 gap-2">
        {#each links as link}
            <a href={link[1]} class="w-full font-bold" style="grid-column: span {link[2]} / span {link[2]};"><button class={link?.[3]+" w-full py-3"}>{link[0]}</button></a>
        {/each}
    </div>
</middle>