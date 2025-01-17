<script lang=ts>
    import { enhance } from "$app/forms";
    import Credits from "$lib/components/visual/Credits.svelte";
    import { slide } from "svelte/transition";

    export let loading:boolean;

    export let user:User;
    export let credits:number;

    export let item:Merchandise;
</script>

<form transition:slide method="POST" action="?/purchase" use:enhance={() => {
    loading = true;

    return async ({ update }) => {
        await update();
        loading = false;
    };
}}>
    <input type="hidden" name="user" value={user.username}>
    <input type="hidden" name="item" value={item.name}>
    <button disabled={credits < item.price || loading} class="w-80 merch" style={item?.color?`--color:${item.color}`:`--color:255, 255, 255`}>
        <p>{item.name}</p>
        
        <div class="grid grid-cols-2">
            <p class="opacity-80">{#if item.stock > 0}Available: {item.stock}{/if}</p>
            <p class="text-right"><Credits class="w-fit bg-black/50 rounded p-1 pb-0.5">{item.price}</Credits></p>
        </div>
    </button>
</form>

<style>
    .merch {
        text-align: left;
        border: none;
        border-bottom: 2px solid white;
        padding: 8px;

        background-image: radial-gradient(ellipse at bottom, rgba(var(--color),1) 40%, rgba(255,255,255,0) 100%);

        transition: box-shadow 1.5s;
    }

    .merch:active:not(disabled) {
        box-shadow: inset 320px 0px 0px 0px rgba(0,0,0,0.70);

        transition: box-shadow 0.20s;
    }
</style>