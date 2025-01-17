<script>
    import { fly } from 'svelte/transition'

    const locations = [
        ['Loading Zone', 'zone'],
        ['Midfield', 'midfield'],
        ['Community', 'community'],
    ]

    let selected = 1

    function inc(n) {
        if (selected + n >= locations.length) {
            selected += n - locations.length
        } else if (selected + n < 0) {
            selected += n + locations.length
        } else selected += n

        value = locations[selected][1]
    }

    export let value = locations[selected][1]
</script>

<div class="flex flex-row w-full bg-teal-900 rounded-lg">
    <button
        class="p-0 px-2 bg-gradient-to-br from-teal-600 to-teal-300 text-teal-800 font-bold border-teal-800"
        on:click={() => {
            inc(-1)
        }}>{'<'}</button
    >
    <div class="self-center" style="width:120px; height:24px; overflow:hidden">
        {#each locations as l, i}
            {#if i == selected}
                <div
                    out:fly={{ duration: 150 }}
                    in:fly={{ duration: 150, delay: 150 }}
                >
                    {l[0]}
                </div>
            {/if}
        {/each}
    </div>
    <button
        class="p-0 px-2 bg-gradient-to-bl from-teal-600 to-teal-300 text-teal-800 font-bold border-teal-800"
        on:click={() => {
            inc(1)
        }}>{'>'}</button
    >
</div>
