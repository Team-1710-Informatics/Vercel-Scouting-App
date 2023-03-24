<script>
    import Stripe from "./Stripe.svelte";

    let w;
    let h;

    export let size = 40;
    export let contenteditable = false;

    let text;
</script>

{#key size}
    <div class="flex flex-row">
        <div class="flex flex-col" style="margin-right:{-(w/2-w/48)}px;">
            {#each Array(5) as _,i}
                <Stripe
                    width={(h/4)*(5-i)+(i===4?(w/2-w/48):0)}
                    height={h/4}
                    offset={(h/4)*(i)}
                    left
                    right={i===4}
                    color={i===0||i===4?"white":"#0f7dc2"}
                />
            {/each}
        </div>
        <div class="font-black h-fit p-0 m-0" style="min-width:50px; font-size:{size}px; line-height:{size}px;" contenteditable bind:textContent={text} bind:offsetWidth={w} bind:offsetHeight={h}>
            <slot />
        </div>
        <div class="flex flex-col" style="margin-right:{-(w/2-w/48)}px;">
            {#each Array(5) as _,i}
                <Stripe
                    width={(h/4)*(5-i)+(i===4?(w/2-w/48):0)}
                    height={h/4}
                    offset={i===4?-(w/2-w/48):0}
                    right
                    left={i===4}
                    color={i===0||i===4?"white":"#0f7dc2"}
                />
            {/each}
        </div>
    </div>
{/key}
