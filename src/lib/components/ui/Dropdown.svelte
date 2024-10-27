<script lang="ts">
    import { slide } from 'svelte/transition'
    import caret from '$lib/assets/icons/caret.svg'
    import { tweened } from 'svelte/motion'

    export let name: string
    export let options: {
        name: string
        action?: string
        href?: string
        width?: number
    }[]

    let show = false
    let h: number
    let w: number
    let button: HTMLButtonElement
    let ww: number

    let caretAngle = tweened(90, {
        duration: 100,
    })

    const widest = () => {
        let c = 0
        options.forEach((o) => {
            //@ts-ignore
            if (o?.width > c)
                //@ts-ignore
                c = o.width
        })
    }

    const pos = (): string => {
        let a = button.getBoundingClientRect()
        if (a.left > ww / 2) return `right:${ww - a.left - w}px;`
        else return `left:${a.left}px;`
    }

    $: caretAngle.set(90 * (show ? 0 : 1))
</script>

<svelte:window bind:innerWidth={ww} />

<div
    on:focusout={() => {
        show = false
    }}
>
    <button
        class="flex flex-row py-0"
        on:click={() => {
            show = !show
        }}
        bind:offsetHeight={h}
        bind:offsetWidth={w}
        bind:this={button}
    >
        <p class="flex flex-row">
            <img
                alt="caret-symbol"
                class="mr-1"
                style="transform:rotate(-{$caretAngle}deg)"
                src={caret}
            />{name}
        </p>
    </button>

    {#if show}
        <div
            class="absolute box border-none p-0 z-40"
            style="top:{h *
                1.5}px; min-width:120px; width:{widest()}px; {pos()}"
        >
            {#each options as option, i}
                {#if option?.action}
                    <form transition:slide method="POST" action={option.action}>
                        <button
                            class="box min-w-full text-left py-0"
                            bind:offsetWidth={options[i].width}
                            >{option.name}</button
                        >
                    </form>
                {:else if option?.href}
                    <a transition:slide href={option.href}>
                        <button
                            class="box min-w-full text-left py-0"
                            bind:offsetWidth={options[i].width}
                            >{option.name}</button
                        >
                    </a>
                {/if}
            {/each}
        </div>
    {/if}
</div>

<style>
    button {
        background-image: none;
        background-color: transparent;
        border: none;
        box-shadow: none;
    }

    button.box {
        box-shadow: none;
        border: none;
        background-color: none;
        padding-top: 0px;
        padding-bottom: 0px;
    }

    button:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>
