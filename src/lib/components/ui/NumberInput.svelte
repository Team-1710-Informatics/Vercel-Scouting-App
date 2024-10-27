<script>
    export let value = undefined

    let classes = ''
    export { classes as class }
    export let style = ''

    export let incrementable = true
</script>

<div class={classes + 'flex flex-row'} {style}>
    <input
        style="width:100%"
        type="number"
        class:rounded-r-none={incrementable}
        bind:value
    />
    <div class={'grid grid-cols-1 rounded-r'}>
        <button>+</button>
        <button>-</button>
    </div>
</div>

<style>
    button {
        font-size: 0.6rem;
        line-height: 0.5rem;
        padding: 1px;
        padding-top: 0px;
        padding-bottom: 0px;
        border: none;
        border-radius: 0px;
        background-image: none;
        width: 15px;

        color: black;
        background-color: darkgray;
    }
</style>
