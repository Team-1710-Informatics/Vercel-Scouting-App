<script lang="ts">
    //@ts-ignore
    import { metatags } from "@roxi/routify";
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";

    let team:number;
    let match:number;
    let alliance:string = "";

    let target:HTMLDivElement;
    let canvas:HTMLCanvasElement;
    let ctx:CanvasRenderingContext2D;

    let coordinates:{x:number,y:number} = {
        x: NaN,
        y: NaN
    }

    let img = new Image(150, 231);
    let imgs = {
        red: new Image(150, 231),
        blue: new Image(150, 231),
    }
    imgs.red.src = `/scouting/public/assets/scout/2023/red_community.png`;
    imgs.blue.src = `/scouting/public/assets/scout/2023/blue_community.png`;
    onMount(()=>{
        target = <HTMLDivElement>document.getElementById("canvas-target");
        canvas = <HTMLCanvasElement>document.createElement('canvas');
        ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
        canvas.width = 150;
        canvas.height = 231;

        canvas.addEventListener('click', function(event) {
            coordinates.x = event.pageX - canvas.offsetLeft;
            coordinates.y = event.pageY - canvas.offsetTop;
            //@ts-ignore
            ctx.drawImage(imgs[alliance], 0, 0);
            ctx.beginPath();
            ctx.arc(coordinates.x, coordinates.y, 5, 0, 2 * Math.PI);
            ctx.fill();
        })

        target.appendChild(canvas);
    })

    $: if (alliance != ""){
        ctx.fillStyle=alliance;
        img.onload = () => {
            //@ts-ignore
            ctx.drawImage(imgs[alliance], 0, 0);
        }
        //@ts-ignore
        ctx.drawImage(imgs[alliance], 0, 0);
    }

    /**
     * Save pre-match data as JSON string, log it to sessionStorage and redirect to next page
     */
    function submit() {
        let data = JSON.stringify({
            team,
            match,
            alliance,
            coordinates
        });
        sessionStorage.setItem("scout-data", data);
        document.location.href = "./match";
    }
</script>

<center>
    <div class="box w-fit mt-10">
        <div class="grid grid-cols-2">
            <div>Team Number:</div>
            <input class="justify-self-end w-24" type="number" bind:value={team}>
        </div>
        <div class="grid grid-cols-2">
            <div>Match Number:</div>
            <input class="justify-self-end w-24" type="number" bind:value={match}>
        </div>
        <div>
            <input name="alliance" type="radio" bind:group={alliance} value="red">
            Red Alliance
        </div>
        <div>
            <input name="alliance" type="radio" bind:group={alliance} value="blue">
            Blue Alliance
        </div>
        <div transition:slide|local id="canvas-target">
        </div>
        <br>
        {#if team && match && alliance && coordinates.x}
            <button on:click={submit} transition:slide|local class="submit-button">
                Next
            </button>
        {/if}
    </div>
</center>