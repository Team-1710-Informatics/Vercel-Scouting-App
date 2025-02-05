<script>
    import tba from "$lib/modules/tba";
    import {onMount} from 'svelte';

    export let event_key;

    let rankings;
    let reference;
    let picked = {rankings: [[], [], [], [], [], [], [], []]};
    let i = 0;
    let down = true;
    let selection = true;
    let rounds = 1;

    let selected_team = null;
    let selecting = false;
    let actionLog = [];

    function changeMode() {
        selection = !selection;
    }

    async function getRankings() {
        rankings = await tba('event/' + event_key + '/rankings');
        rankings.rankings.forEach(team => team.rejected = false);
        for (let j = 0; j < rankings.rankings.length; j++) {
            rankings.rankings[j].truerank = j + 1;
        }
        console.log("test:", rankings);

        for (let z = 0; z < 8; z++) {
            picked.rankings[z].push(rankings.rankings[0]);
            rankings.rankings.splice(0, 1);
        }

        reference = rankings;
        picked = {...picked};
    }

    function pickTeam(ranking) {
        if (selection && rounds < 5) {
            let oldPicked = JSON.parse(JSON.stringify(picked));
            let oldRankings = JSON.parse(JSON.stringify(rankings));
            let prevI = i, prevDown = down, prevRounds = rounds;

            if (rankings.rankings.indexOf(ranking) !== -1) {
                let index = rankings.rankings.indexOf(ranking);
                picked.rankings[i].push(ranking);
                actionLog.push({
                    type: 'pick',
                    team: ranking,
                    alliance: i,
                    oldPicked,
                    oldRankings,
                    prevI,
                    prevDown,
                    prevRounds
                });
                advanceSelection();
                rankings.rankings.splice(index, 1);
                rankings.rankings.sort((a, b) => parseInt(a.rank) - parseInt(b.rank));
                rankings = {...rankings};
                picked = {...picked};
            } else {
                moveAlliances(ranking);
                actionLog.push({
                    type: 'invite',
                    team: ranking,
                    alliance: i,
                    oldPicked,
                    oldRankings,
                    prevI,
                    prevDown,
                    prevRounds
                });
                advanceSelection();
            }
        }
        selecting = false;
    }

    function moveAlliances(team) {
        let sourceIndex = picked.rankings.findIndex(alliance => alliance.includes(team));
        if (sourceIndex === -1) return;
        picked.rankings[sourceIndex] = picked.rankings[sourceIndex].filter(t => t !== team);
        picked.rankings[i].push(team);
        for (let j = sourceIndex; j < 7; j++) {
            if (picked.rankings[j + 1].length > 0) {
                let captain = picked.rankings[j + 1].shift();
                picked.rankings[j].push(captain);
            }
        }
        if (picked.rankings[7].length === 0 && rankings.rankings.length > 0) {
            let newCaptain = rankings.rankings.shift();
            picked.rankings[7].push(newCaptain);
            rankings.rankings.sort((a, b) => parseInt(a.rank) - parseInt(b.rank));
            rankings = {...rankings};
        }
        picked = {...picked};
    }

    function decline(team) {
        team.rejected = true;
        actionLog.push({type: 'decline', team});
        rankings = {...rankings};
        selecting = false;
    }

    function undo() {
        if (actionLog.length === 0) return;
        const lastAction = actionLog.pop();

        if (lastAction.type === 'pick' || lastAction.type === 'invite') {
            picked = lastAction.oldPicked;
            rankings = lastAction.oldRankings;
            i = lastAction.prevI;
            down = lastAction.prevDown;
            rounds = lastAction.prevRounds;
        } else if (lastAction.type === 'decline') {
            lastAction.team.rejected = false;
        }
        rankings.rankings.sort((a, b) => parseInt(a.rank) - parseInt(b.rank));
        rankings = {...rankings};
        picked = {...picked};
    }

    function inviteShift(allianceIndex) {
        if (allianceIndex > i && picked.rankings[allianceIndex].length === 1) {
            selected_team = picked.rankings[allianceIndex][0];
            selecting = true;
        }
    }

    function advanceSelection() {
        if (down) {
            i++;
            if (i > 7) {
                i = 7;
                down = false;
                rounds++;
            }
        } else {
            i--;
            if (i < 0) {
                i = 0;
                down = true;
                rounds++;
            }
        }
    }

    function formatTeamKey(teamKey) {
        return teamKey.substring(3);
    }

    onMount(() => {
        getRankings();
    });
</script>

<!--&lt;!&ndash; Debug info &ndash;&gt;-->
<!--Selecting: {selecting}-->
<!--{#if selected_team}-->
<!--    Selected: {formatTeamKey(selected_team.team_key)} | Rejected: {selected_team.rejected}-->
<!--{/if}-->
<!--Current Alliance Index: {i}-->

<div class="basis-1/3 h-auto">
    <div class="flex flex-cols-2 h-full">
        {#if rankings}
            <div class="basis-1/2 h-auto">
                <h1 class="text-lg">Picked Teams</h1>
                <button on:click={undo}>Undo</button>
                <div class="overflow-auto">
                    {#each picked.rankings as alliance, index}
                        <div class="w-fit h-fit px-4 rounded-md {index === i && selection ? 'bg-slate-600' : ''}">
                            <h1 class="text-lg font-bold">Alliance {index + 1}</h1>
                            <ul>
                                {#each alliance as team, teamIndex}
                                    <li class="list-none">
                                        <button on:click={() => { if (!team.rejected) { inviteShift(index) } }}>
                                            {team.truerank}. {formatTeamKey(team.team_key)}
                                        </button>
                                    </li>
                                {/each}
                            </ul>
                            {#if selecting && index === i && selection}
                                <div>
                                    Selecting: {formatTeamKey(selected_team.team_key)}
                                </div>
                                <button class="bg-green-500 rounded-md" on:click={() => pickTeam(selected_team)}>
                                    Accept
                                </button>
                                <button class="bg-red-500 rounded-md" on:click={() => decline(selected_team)}>
                                    Decline
                                </button>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
            <div class="basis-1/2 h-auto">
                <h1 class="text-lg">Available Teams</h1>
                <div class="overflow-scroll h-96">
                    {#each rankings.rankings as ranking}
                        {#if !ranking.rejected}
                            <li>
                                <button on:click={() => { selecting = true; selected_team = ranking }}>
                                    {ranking.truerank}. {formatTeamKey(ranking.team_key)}
                                </button>
                            </li>
                        {/if}
                    {/each}
                </div>
                {#if rankings.rankings.some(ranking => ranking.rejected)}
                    <h1 class="text-lg">Declining Teams</h1>
                    <div class="overflow-auto h-20">
                        {#each rankings.rankings as ranking}
                            {#if ranking.rejected}
                                <li>
                                    <button on:click={() => {
                                        if (!ranking.rejected) {
                                            selecting = true; selected_team = ranking
                                        }
                                    }}>
                                        {ranking.truerank}. {formatTeamKey(ranking.team_key)}
                                    </button>
                                </li>
                            {/if}
                        {/each}
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</div>