<script>
    import arrow from "$lib/assets/icons/caret.svg";
    import { fly, fade } from 'svelte/transition';

    let opened = false;

    export let data;
</script>

<div class="flex flex-row">
    {#if opened}
        <div transition:fade on:click={()=>{opened=false}} on:keydown={e=>{opened=false}} class="bg-white opacity-50 m-0 fixed top-0 z-50" style="width:100vw; height:100vh;"/>
        <div transition:fly={{x:-300}} class="sideBar fixed left-0 h-full w-1/4 z-50">
            <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjL1MXntO39AhXNBzQIHS3fAW4QwqsBegQICxAB&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DdQw4w9WgXcQ&usg=AOvVaw0aHtehaphMhOCAkCydRLZU">click me</a>
        </div>
    {:else}
        <button class="options" style="height:calc(100vh - 68px);" on:click={()=>{opened=!opened}} >
            <img class="arrow" src={arrow} alt=">" style={opened?"transform:rotate(90deg)":"transform:rotate(270deg)"}>
            <img class="arrow" src={arrow} alt=">" style={opened?"transform:rotate(90deg)":"transform:rotate(270deg)"}>
            <img class="arrow" src={arrow} alt=">" style={opened?"transform:rotate(90deg)":"transform:rotate(270deg)"}>
        </button>
    {/if}
</div>
    <div>
        {#each data.items as item}
            {item.name}
        {/each}
    </div>
        <!-- <button class="col-span-1 options" style="background-color:black; height:calc(100vh - 68px);" on:click={()=>{opened=true}}>
            <img class="arrow" src={arrow} alt=">" style="transform:rotate(270deg)">
            <img class="arrow" src={arrow} alt=">" style="transform:rotate(270deg)">
            <img class="arrow" src={arrow} alt=">" style="transform:rotate(270deg)">
        </button> -->
        <!-- <div class="col-span-23">
            text text
        </div> -->

<style>
    .sideBar{
        background-color: blue;
    }
    .options{
        border-top: none;
        border-bottom: none;
        border-left: none;
        border-right-width: 4px;
        border-radius: 0;
        border-color: black;
    }
    .arrow{
        height:4vh;
        margin-top: calc((100vh - 68px) / 6);
        margin-bottom: calc((100vh - 68px) / 6);
    }
    
</style>