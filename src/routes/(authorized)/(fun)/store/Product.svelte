<script lang="ts">
    export let name:string;
    export let price:number;
    export let stock:number;
</script>

<div class="px-1 my-2 grid grid-rows-2 grid-cols-2 border-sky-900 border-2 bg-gradient-to-br from-sky-900 to-slate-800 rounded-lg hover:bg-gradient-to-tl">
    <div class="font-bold row-start-1 row-span-1 col-start-1 col-span-2">
        {name}
    </div>
    <div class="font-light text-right row-start-2 row-span-1 col-start-2 col-span-1">
        {price} Credits
    </div>
    <div class="font-light row-start-2 row-span-1 col-start-1 col-span-2">
        {stock} available
    </div>
</div>