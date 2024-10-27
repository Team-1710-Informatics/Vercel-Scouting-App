<script>
    export let text

    let chars = []

    text.split('').forEach((c) => {
        chars.push({ char: c, color: 0 })
    })

    function inc(i) {
        let n = chars[i].color + 1
        if (n >= chars.length) n = 0
        chars[i].color = n
    }

    const colors = [
        '#ffffff',
        '#ff0000',
        'rgb(249, 115, 22)',
        'rgb(253, 224, 71)',
        '#00ff00',
        '#0000ff',
        '#dd00ff',
    ]
</script>

{#each chars as c, i}
    <span
        class="bg-y"
        style="color:{colors[c.color]}"
        on:click={() => {
            inc(i)
        }}
        on:keydown={() => {}}>{c.char}</span
    >
{/each}
