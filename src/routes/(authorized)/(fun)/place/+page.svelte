<script lang=ts>
    import { onMount } from "svelte";
    import Palette from "./Palette.svelte";

    const WIDTH = 30;
    const HEIGHT = 60;
    const PIXEL = 10;

    let canvas:HTMLCanvasElement;

    onMount(()=>{
        canvas.width = WIDTH * PIXEL;
        canvas.height = HEIGHT * PIXEL;
        render();
    })

    /* ----- */

    let point:Point = {x:-1,y:-1};
    let color:Color = {red:0, green:0, blue:0};
    let pixels:Pixel[] = [];

    function render(){
        const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillRect(0,0,PIXEL * WIDTH, PIXEL * HEIGHT);

        pixels.forEach(p=>{
            ctx.fillStyle=`rgb(${p.color.red},${p.color.green},${p.color.blue})`;
            ctx.fillRect(p.position.x*PIXEL-1, p.position.y*PIXEL-1, PIXEL+2, PIXEL+2);
        })

        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.strokeRect(point.x*PIXEL-1, point.y*PIXEL-1, PIXEL+2, PIXEL+2);
    }

    async function place(){
        pixels.push({position:point,color})

        render();
    }

    async function move(event:MouseEvent){
        const bound = canvas.getBoundingClientRect();
        const x = Math.floor((event.x - bound.x) / PIXEL);
        const y = Math.floor((event.y - bound.y) / PIXEL);

        point = {x,y};

        render();
    }
</script>

<middle>
    <h1 class="text-9xl font-black">SLAY</h1>
    <Palette bind:color={color} colors={[
        {red:0,green:0,blue:0},
        {red:255,green:255,blue:255},
    ]}/>
    <canvas bind:this={canvas} on:dblclick={place} on:mousemove={move} style="width:{PIXEL * WIDTH}px; height:{PIXEL * HEIGHT}px; border: 4px solid black; border-radius:8px;">
        Place
    </canvas>
</middle>

{JSON.stringify(point)}