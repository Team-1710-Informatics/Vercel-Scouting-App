<script>
    export let style="";
    let classes="";
    export {classes as class}
</script>

<span {style} class={classes}><slot /></span>

<style>
    @import url('https://fonts.cdnfonts.com/css/lcd');

    span {
        font-family: 'LCDMono', sans-serif;
        color: rgb(20 184 166);
    }
</style>