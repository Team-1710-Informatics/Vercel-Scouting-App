<script>
    import arrow from "$lib/assets/icons/caret.svg";
    import { fly } from 'svelte/transition';

    let opened = false;

    export let data;
    $(document).ready(function () {

    $("#sidebar-toggle").on("click", function () {
        $("#wrapper").toggleClass("no-sidebar");
    });

    });
</script>

<div class="grid grid-cols-24">
    {#if opened}
        <div class="grid col-span-6 sideBar">
            <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjL1MXntO39AhXNBzQIHS3fAW4QwqsBegQICxAB&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DdQw4w9WgXcQ&usg=AOvVaw0aHtehaphMhOCAkCydRLZU">click me</a>
        </div>
        <button class="col-span-1 options grid-rows-3" style="height:calc(100vh - 68px);" on:click={()=>{opened=false}} in:fly={{x:-300,duration:1000}}>
            <img class="arrow" src={arrow} alt=">" style="transform:rotate(90deg)">
            <img class="arrow" src={arrow} alt=">" style="transform:rotate(90deg)">
            <img class="arrow" src={arrow} alt=">" style="transform:rotate(90deg)">
        </button>
        <div class="grid col-span-17">
            {#each data.items as item}
                {item.name}
            {/each}
        </div>
    {:else}
        <button class="col-span-1 options" style="background-color:black; height:calc(100vh - 68px);" on:click={()=>{opened=true}}>
            <img class="arrow" src={arrow} alt=">" style="transform:rotate(270deg)">
            <img class="arrow" src={arrow} alt=">" style="transform:rotate(270deg)">
            <img class="arrow" src={arrow} alt=">" style="transform:rotate(270deg)">
        </button>
        <div class="col-span-23">
            text text
        </div>
    {/if}
</div>

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
    .grid-cols-24{
        grid-template-columns: repeat(24, minmax(0, 1fr));
    }
</style>