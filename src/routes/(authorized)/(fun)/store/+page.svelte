<script lang="ts">
    import Product from "./Product.svelte";
    
    let page = 0;

    const items:[string, number, number][] = [ //example items to test with, the data types in order are Name, Price, and amount Available
        ["Black 1710 Shirt", 1000, 5],
        ["Black 1710 Draw String Bag", 2000, 3],
        ["Black 1710 Socks", 5000, 4]
    ]

</script>
<middle>
    <div class="text-xl rounded-lg px-5 py-4 mt-6 mb-3 bg-gradient-to-br from-slate-900 to-slate-800">
        Store
    </div>
    <div class="rounded-lg px-5 py-4 mt-3 mb-2 bg-gradient-to-br from-slate-900 to-slate-800">
        # Credits
    </div>
    <div class="rounded-lg px-5 py-4 my-5 bg-gradient-to-br from-slate-900 to-slate-800">
        <div class="m-0 mb-3 grid grid-cols-2 grid-rows-1">
            <div class="text-right">
                <button class="h-16 w-24 m-1 mr-2 border-sky-700 border-2 font-bold bg-gradient-to-br from-sky-700 to-slate-800 rounded-lg hover:bg-gradient-to-tl" on:click={()=>{page = 0;}}>Purchase</button>
            </div>
            <div>
                <button class="h-16 w-24 m-1 ml-2 border-sky-700 border-2 font-bold bg-gradient-to-br from-sky-700 to-slate-800 rounded-lg hover:bg-gradient-to-tl" on:click={()=>{page = 1;}}>Your Items</button>
            </div>
        </div>
        {#if page == 0}
            {#each items as item}
                <Product
                name={item[0]}
                price={item[1]}
                stock={item[2]}
                />
            {/each}
        {/if}
        {#if page == 1}
            
        {/if}
    </div>
</middle>