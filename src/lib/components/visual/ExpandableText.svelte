<script>
    
    export let clamp = 2;
    let map = [
        "line-clamp-none",
        "line-clamp-1",
        "line-clamp-2",
        "line-clamp-3",
        "line-clamp-4",
        "line-clamp-5",
        "line-clamp-6"
    ]

    let expand = false;
</script>

<p class="{!expand?map[clamp]:'expand'} hover:line-clamp-none" on:click={()=>{expand = !expand}} on:keydown >
    <slot />
</p>

<style>
    p {
        width: fit-content;
        border-radius:8px;
        padding:3px;

        padding-left:4px;
        padding-right:4px;
    }

    .expand{
        background-color: rgba(255,255,255,0.2);
    }

    p:hover{
        background-color: rgba(255,255,255,0.2);
    }
</style>