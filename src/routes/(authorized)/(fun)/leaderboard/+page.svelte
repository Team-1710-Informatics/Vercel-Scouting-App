<script>
    import FaceMouse from "$lib/components/visual/FaceMouse.svelte";
    import { flip } from "svelte/animate";

    export let data;

    // function funny(){
    //     data.list.forEach(user=>{
    //         if(user.user == data.user) {
    //             user.credits+=10;
    //         }
    //     })
    //     let newl = [];
    //     data.list.forEach(user=>{
    //         let n = 0
    //         for(let i = 0; i < newl.length; i++){
    //             if(newl[i].credits < user.credits){
    //                 n = i;
    //             }
    //         }
    //         newl.splice(i,0,user);
    //     })
    //     data.list = newl;
    // }
</script>

<center>
    <br>
    <h5>Leaderboard</h5>
    <br>
    <FaceMouse> 
        <div class="flex flex-col w-fit box shadow-lg">
            <table class="divide-y">
                <tr class="text-xl mb-2 font-bold">
                    <th>Rank</th>
                    <th>User</th>
                    <th>Credits</th>
                </tr>
                {#each data.list as u,i (u.user)}
                    <tr animate:flip class="{function(){
                        switch(i){
                            case 0: return "text-teal-200  text-xl";
                            case 1: return "text-amber-400 text-xl";
                            case 2: return "text-slate-300 text-xl";
                            case 3: return "text-amber-600 text-xl";
                            case 10: return "text-gray-300";
                        }
                    }()}">
                        {#if u.user == data.user || i < 10}
                            <th>{i<10?i+1:".."}.</th>
                            <td class="pr-3">{u.user==data.user?"You":u.user}</td>
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