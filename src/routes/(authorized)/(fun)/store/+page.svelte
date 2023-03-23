<!-- <script>
    import { fly, fade } from 'svelte/transition';
    let opened = true;
</script>

<div class="grid grid-cols-12">
    {#if opened}
        <div class="grid col-span-3 options">
            <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjL1MXntO39AhXNBzQIHS3fAW4QwqsBegQICxAB&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DdQw4w9WgXcQ&usg=AOvVaw0aHtehaphMhOCAkCydRLZU">click me</a>
        </div>
        <button class="col-span-1 options" on:click={()=>{opened=false}} transition:fly={{x:-200,duration:800}}>
            hehe
        </button>
        <div class="grid col-span-8">

        </div>
    {:else}
        <button class="col-span-1 options"style="background-color:black;" on:click={()=>{opened=true}}>
            hehe
        </button>
        <div class="col-span-11">
            text text
        </div>
    {/if}
</div>

<style>
    .options{
        border-top: none;
        border-bottom: none;
        border-left: none;
        border-right-width: 4px;
        border-radius: 0;
        border-color: black;
    }
</style> -->