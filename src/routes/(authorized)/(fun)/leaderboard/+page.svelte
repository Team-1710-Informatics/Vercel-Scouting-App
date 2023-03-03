<script>
    import FaceMouse from "$lib/components/visual/FaceMouse.svelte";
    import { flip } from "svelte/animate";

    export let data;
</script>

<center>
    <br>
    <h5>Leaderboard</h5>
    <br>
    <FaceMouse> 
        <div class="flex flex-col w-fit box shadow-lg" style="max-width:90vw">
            <table class="divide-y">
                <tr class="text-xl mb-2 font-bold">
                    <th>Rank</th>
                    <th>User</th>
                    <th>Credits</th>
                </tr>
                {#each data.list as u,i (u.uname)}
                    <tr animate:flip class="divide-x divide-gray-600 bg-white/25 {function(){
                        switch(i){
                            case 0: return "text-teal-200  text-xl";
                            case 1: return "text-amber-400 text-xl";
                            case 2: return "text-slate-300 text-xl";
                            case 3: return "text-amber-600 text-xl";
                        }
                    }()}" class:bg-transparent={u.uname != data.user}>
                        {#if u.uname == data.user || i < 10}
                            <th>{i+1}.</th>
                            <td class="px-3">{u.user}</td>
                            <td class="text-teal-500 lcd text-right">{u.credits}</td>
                        {/if}
                    </tr>
                {/each}
            </table>
        </div>
    </FaceMouse>
    <br>
    <a href="/hub"><button>Back to Hub</button></a>
</center>

<style>
    @import url('https://fonts.cdnfonts.com/css/lcd');

    .lcd {
        font-family: 'LCDMono', sans-serif;
    }
</style>