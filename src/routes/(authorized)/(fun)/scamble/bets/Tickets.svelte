<script>

    let show = false;
</script>

{#if show}
<div class="fixed top-0 left-0 flex flex-row">
    <div class="bg-white opacity-0 m-0 "></div>
    <div>

    </div>
</div>
{/if}

<button on:click={()=>{show=true}}>My bets</button>
