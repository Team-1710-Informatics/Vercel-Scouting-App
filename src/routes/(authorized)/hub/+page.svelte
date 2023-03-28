<script lang=ts>
    import CompetitionTracker from "./CompetitionTracker.svelte";

    export let data:any;

    const links:[string, string, number, string?][] = [
        ["Data", '/data/2023', 6, 'border-rose-600 bg-gradient-to-bl from-rose-600 to-red-300'],
        ["Scout Match", '/scout/2023', 6, 'submit'],
    ]
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