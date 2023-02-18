<script>
    import FaceMouse from "$lib/components/visual/FaceMouse.svelte";

    export let data;

    function funny(){
        data.list.forEach(user=>{
            if(user.user == data.user) {
                user.credits++;
            }
        })
    }
</script>

<center>
    <br>
    <h5>Leaderboard</h5>
    <br>
    <FaceMouse> 
        <div class="flex flex-col w-fit box">
            <table class="divide-y">
                <tr class="text-xl mb-2 font-bold">
                    <th>Rank</th>
                    <th>User</th>
                    <th>Credits</th>
                </tr>
                {#each data.list as u,i (u.user)}
                    <tr class="{function(){
                        switch(i){
                            case 0: return "text-teal-200  text-xl";
                            case 1: return "text-amber-400 text-xl";
                            case 2: return "text-slate-300 text-xl";
                            case 3: return "text-amber-600 text-xl";
                        }
                    }()}">
                        <th>{i+1}.</th>
                        <td class="pr-3">{u.user}</td>
                        <td class="text-teal-500 lcd text-right" on:click={()=>{u.credits--;funny()}}>{u.credits}</td>
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