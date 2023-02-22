<script>
    import arrowDown from "$lib/assets/icons/arrowDown.svg";
    import arrowRight from "$lib/assets/icons/arrowRight.svg";
    let routes = [
        {
            name: "this",
            desc: "test number one",
            checked: false
        },
        {
            name: "that",
            desc: "test number two",
            checked: true
        }
    ]
</script>

<span>
    {#each routes as route}
        <div class="capsulate">
            <button class="flex flex-row" style="background-image:none; border: none;" on:click={()=>{route.checked = !route.checked;}}>
                <img class="mr-1" style="filter:invert(100%)" src={route.checked?arrowDown:arrowRight} alt="collapse"><p>{route.name}</p>
            </button>
            <br>
            {#if route.checked}
                {route.desc}
            {/if}
        </div>
    {/each}
</span>

<style>
    .capsulate {
        border-radius: 15px;
        border-width: 4px;
        padding-right: 10px;
        padding-left: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    div.capsulate:hover {
        border-color: blue;
    }
</style>