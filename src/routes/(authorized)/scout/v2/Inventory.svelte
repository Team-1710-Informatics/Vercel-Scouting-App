<script>
    import cube from "$lib/assets/scout/2023/cube.png";
    import cone from "$lib/assets/scout/2023/cone.png";
    import { fly, slide } from "svelte/transition";
    import { flip } from "svelte/animate";
    const imgs={cube,cone};
    
    export let log;

    //
    const locations = [
        ["Loading Zone","zone"],
        ["Midfield","midfield"],
        ["Community","community"]
    ]

    let selected = 1;

    function inc(n){
        if(selected + n >= locations.length){
            selected += n - locations.length;
        }else if(selected + n < 0){
            selected += n + locations.length;
        }else selected += n;
    }
    //

    const nextID = (()=>{
        let n = Math.trunc(Date.now()/100000);

        return function(){return ++n;}
    })();

    function logIntake(type){
        log.push({
            time:Date.now(),
            action:"intake",
            type:type,
            location:locations[selected][1],
            id: nextID()
        })

        log = log
    }

    function logDrop(type, id){
        log.push({
            time:Date.now(),
            action:"drop",
            type:type,
            id:id
        })

        log = log
    }

    $: inventory = (()=>{
        let list = [];
        log.forEach(i=>{
            if(i.action=="intake"){
                list.push({
                    type:i.type,
                    id:i.id
                })
            }

            if(i.action=="drop"||i.action=="place"){
                let index;
                for(let j=0;j<list.length;j++){
                    if(list[j].id == i.id){
                        index = j;
                        break;
                    }
                }
                list.splice(index, 1);
            }
        })
        return list;
    })();
</script>

<div class="box">

    <b>Intake/Control</b>
    <div>
        {#each ['cube','cone'] as piece}
            <button class="bg-none border-none" on:click={()=>{logIntake(piece)}}>
                <img width=48px height=48px src={imgs[piece]} alt={piece} />
            </button>
        {/each}
    </div>

    <div class="flex flex-row w-full">
        <button class="bg-none border-none p-0" on:click={()=>{inc(-1)}}>{"<"}</button>
            <div style="width:120px; height:24px; overflow:hidden">
                {#each locations as l,i}
                    {#if i == selected}
                        <div out:fly={{duration:150}} in:fly={{duration:150,delay:150}}>{l[0]}</div>
                    {/if}
                {/each}
            </div>
        <button class="bg-none border-none p-0" on:click={()=>{inc(1)}}>{">"}</button>
    </div>

</div>

<div class="flex flex-row w-fit flex-wrap">
    {#each inventory as i (i.id)}
        <button animate:flip in:fly out:slide on:click={()=>{logDrop(i.type,i.id)}} class="bg-none border-none">
            <img src={imgs[i.type]} alt={i.type} />
        </button>
    {/each}
</div>