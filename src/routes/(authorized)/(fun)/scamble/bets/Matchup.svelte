<script>
    import ExpandableText from "$lib/components/visual/ExpandableText.svelte";
    import tba from "$lib/modules/tba";

    export let match;

    async function teamName(key){
        return (await tba(`team/${key}`)).nickname;
    }
</script>

{#if match}
    <div class="flex flex-row gap-0 border-x-2 border-white/25">
        <div class="disp blue" style="max-width:48vw; width:148px">
            {#each match.alliances.blue.team_keys as team}
                <div class="text-4xl font-bold">
                    <a class="underline hover:opacity-75" rel="noreferrer" target="_blank" href="https://www.thebluealliance.com/team/{team.substring(3)}/{new Date().getFullYear()}">
                        {team.substring(3)}
                    </a>
                    <center class="text-sm text-blue-100" style="min-height:46px">
                        {#await teamName(team) then name}
                            <ExpandableText clamp=2>{name}</ExpandableText>
                        {/await}
                    </center>
                </div>
            {/each}
        </div>
        <div class="disp red" style="max-width:48vw; width:150px">
            {#each match.alliances.red.team_keys as team}
                <div class="text-4xl font-bold">
                    <a class="underline hover:opacity-75" rel="noreferrer" target="_blank" href="https://www.thebluealliance.com/team/{team.substring(3)}/{new Date().getFullYear()}">
                        {team.substring(3)}
                    </a>
                    <center class="text-sm text-red-200" style="min-height:46px">
                        {#await teamName(team) then name}
                            <ExpandableText clamp=2>{name}</ExpandableText>
                        {/await}
                    </center>
                </div>
            {/each}
        </div>
    </div>
{/if}

<style>
    .disp {
	    /* box-shadow: 0px 0px 4px 1px white; */
        /* border: 1px solid white; */
        text-align: center;

        padding-top:12px;
        padding-bottom:12px;

        position: relative;
    }

    .red {
        background-image: linear-gradient(to top left, rgb(196, 17, 17), rgb(194, 71, 71));
        background-color: rgb(220 38 38);
    }

    .red::before {
        content: '';
        position: absolute;
        bottom:0px;
        right: 0px;
        border-bottom: 40px solid rgb(121, 16, 16);
        border-left: 40px solid transparent;
        width:0px;
    }

    .blue {
        background-image: linear-gradient(to bottom right, rgb(12, 69, 192), rgb(66, 118, 232));
        background-color: rgb(37 99 235);
    }

    .blue::before {
        content: '';
        position: absolute;
        top:0px;
        left: 0px;
        border-top: 40px solid rgb(22, 61, 146);
        border-right: 40px solid transparent;
        width:0px;
    }
</style>