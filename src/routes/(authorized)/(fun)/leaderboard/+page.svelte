<script>
    import Status from '$lib/components/function/Status.svelte'
    import FaceMouse from '$lib/components/visual/FaceMouse.svelte'
    import { flip } from 'svelte/animate'

    export let data

    let key = 'credits'

    const sort_by = (field, reverse, primer) => {
        const key = primer
            ? function (x) {
                  return primer(x.stats[field])
              }
            : function (x) {
                  return x.stats[field]
              }

        reverse = !reverse ? 1 : -1

        return function (a, b) {
            return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a))
        }
    }

    $: {
        data.list.sort(sort_by(key, true))
        data.list = data.list
        console.log(data.list)
    }

    function normal(string) {
        let s = string.replaceAll('_', ' ')

        return s.substring(0, 1).toUpperCase() + s.substring(1)
    }
</script>

<center>
    <br />
    <h5>Leaderboard</h5>
    <br />
    <FaceMouse>
        <div class="flex flex-col w-fit box shadow-lg" style="max-width:90vw">
            <table class="divide-y">
                <tr class="text-xl mb-2 font-bold">
                    <th>Rank</th>
                    <th>User</th>
                    <th
                        ><select class="w-20 text-sm" bind:value={key}>
                            {#each Object.keys(data.list[0].stats) as s}
                                <option value={s}>{normal(s)}</option>
                            {/each}
                        </select></th
                    >
                </tr>
                {#each data.list as u, i (u.uname)}
                    <tr
                        animate:flip
                        class={`divide-x divide-gray-600 bg-opacity-25 ${u.uname === data.user ? 'bg-white' : 'bg-transparent'} ${(function () {
                            switch (i) {
                                case 0:
                                    return 'text-teal-200  text-xl'
                                case 1:
                                    return 'text-amber-400 text-xl'
                                case 2:
                                    return 'text-amber-600 text-xl'
                            }
                        })()}`}
                        class:bg-white={u.uname == data.user}
                    >
                        {#if (u.uname == data.user || i < 10) && u.stats[key] > 0}
                            <th>{i + 1}.</th>
                            <td class="px-3">{u.user}</td>
                            <td
                                class={`${key == 'credits' ? 'text-teal-500 lcd' : ''} text-right`}
                                >{u.stats[key]}</td
                            >
                        {/if}
                    </tr>
                {/each}
            </table>
        </div>
    </FaceMouse>
    <br />
    <a href="/hub"><button class="header rounded-lg">Back to Hub</button></a>
</center>

<style>
    @import url('https://fonts.cdnfonts.com/css/lcd');

    .lcd {
        font-family: 'LCDMono', sans-serif;
    }

    .hidden {
        height: 0px;
        padding: 0px;
        margin: 0px;
        opacity: 0%;
    }
</style>
