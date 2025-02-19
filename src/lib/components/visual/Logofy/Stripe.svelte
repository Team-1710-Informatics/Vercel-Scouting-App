<script>
    export let offset
    export let width
    export let height
    export let left = false
    export let right = false
    export let color = 'white'
</script>

<div
    class="flex flex-row"
    style="margin-left:{offset < 0 ? offset : 0}px; margin-bottom:{Math.round(
        height / 5
    )}px"
>
    {#if offset > 0}<div
            style="width:{offset}px; height:{height}px;"
            class="bg-none bg-transparent"
        />{/if}
    {#if left}<div
            class="left"
            style="--color:{color}; --w:{height}px; --h:{height}px;"
        />{/if}
    <div
        style="
        background-color: {color};
        width: {width - (left ? height : 0) - (right ? height : 0)}px;
        height: {height}px;
    "
    />
    {#if right}<div
            class="right"
            style="--color:{color}; --w:{height}px; --h:{height}px;"
        />{/if}
</div>

<style>
    .left {
        width: var(--w);
        height: var(--h);

        border-top: var(--h) solid var(--color);
        border-left: var(--h) solid transparent;
    }

    .right {
        width: var(--w);
        height: var(--h);

        border-top: var(--h) solid var(--color);
        border-right: var(--h) solid transparent;
    }
</style>
