<script lang="ts">
    import { PUBLIC_HOST } from '$env/static/public'
    import Credits from '$lib/components/visual/Credits.svelte'
    import { tweened } from 'svelte/motion'
    import Item from './Item.svelte'
    import Purchased from './Purchased.svelte'
    import { slide } from 'svelte/transition'

    export let data
    export let form

    function purchased(item: string) {
        for (let i = 0; i < data.receipts.length; i++) {
            if (data.receipts[i].item === item) return true
        }
        return false
    }

    function getItem(receipt: Receipt) {
        for (let i = 0; i < data.items.length; i++) {
            if (data.items[i].name === receipt.item) return data.items[i]
        }
        return false
    }

    const categories: string[] = []
    let category: string = 'All'

    data.items.forEach((i: Merchandise) => {
        if (!categories.includes(i.category)) {
            categories.push(i.category)
        }
    })

    let credits = tweened(0)

    async function loadCredits() {
        const o = await fetch(
            `${PUBLIC_HOST}/internal/credits/${data.user.username}`
        )

        credits.set(await o.json())
    }

    $: if (form) {
        data.items = form.items
        data.receipts = form.receipts
    }

    $: {
        form
        loadCredits()
    }

    let loading = false

    let tab = 'purchase'
</script>

<middle class="py-10">
    <h1 class="text-5xl font-bold">CREDITSTORE</h1>
    <div class="box">
        <p class="text-right">
            <Credits class="text-3xl">{Math.trunc($credits)}</Credits> credits
        </p>

        <label
            >Category: <select bind:value={category}>
                <option value="All">All</option>
                {#each categories as c}
                    <option value={c}>{c}</option>
                {/each}
                <option value="None">None</option>
            </select></label
        >
    </div>
    <div class="mt-3 text-center">
        <div class="grid grid-cols-2">
            {#each ['purchase', 'your items'] as t}
                <button
                    class="border-sky-800 border-2 font-bold bg-gradient-to-br from-sky-800 to-slate-800 rounded-lg hover:bg-gradient-to-tl uppercase"
                    class:opacity-50={tab != t}
                    on:click={() => {
                        tab = t
                    }}>{t}</button
                >
            {/each}
        </div>
        <br />
        {#if tab == 'purchase'}
            <div class="w-80">
                <p transition:slide class="font-bold">Click item to purchase</p>
                {#each data.items as item}
                    {#if (category === 'All' || category == item.category) && item.stock !== 0 && !purchased(item.name)}
                        <div transition:slide class="h-2" />
                        <Item
                            {item}
                            user={data.user}
                            credits={$credits}
                            bind:loading
                        />
                    {/if}
                {/each}
            </div>
        {:else if tab == 'your items'}
            <div class="w-80">
                <p transition:slide class="font-bold">
                    To recieve an item, show<br />this to an informatics member
                </p>
                {#each data.receipts as receipt}
                    {#if getItem(receipt) !== false && (category === 'All' || category == getItem(receipt)?.category)}
                        <div transition:slide class="h-2" />
                        <Purchased item={getItem(receipt)} />
                    {/if}
                {/each}
            </div>
        {/if}
    </div>
</middle>
