<script>
    import { enhance } from "$app/forms";
    import StarRating from "$lib/components/StarRating.svelte";

    const strategies = [
        ["🔄 FULL CYCLE", "cycle", false, "#0078d7"],
        ["🤝 RECIEVE & PLACE", "place", false, "#33cc33"],
        ["🚚 TRANSPORTER", "transport", false, "#f03a17"],
        ["🧱 DEFENSE", "defense", false, "#f7894a"],
        ["🍞 toast bread", "bread", false],
        ["💔 brokedown", "breakdown", false],
    ]

    let thoughts;
    let rating;

    export let meta;
    export let pregame;
    export let game;
    export let postgame;

    $: postgame = {
        strategy:function(){
            let x = []
            for(let i=0;i<strategies.length;i++)
                if(strategies[i][2]) x.push(strategies[i][1]);
            return x;
        }(),
        rating,
        thoughts
    };

    $:final = JSON.stringify({
        ...meta,
        pregame,
        game,
        postgame
    })

    let loading = false;
</script>

<center class="w-full pt-10">
    <h5 class="mb-2">Submit Entry</h5>
    <div class="box divide-y">
        <div class="grid grid-cols-1 justify-items-start pb-2">
            <h6 class="justify-self-center">Robot Strategy</h6>
            {#each strategies as s}
                <label>
                    <input type="checkbox" bind:checked={s[2]}>
                    <span style="color:{s?.[3]}">{s[0]}</span>
                </label>
            {/each}
        </div>
        <div class="py-2">
            <h6>Your Rating</h6>
            <StarRating editable bind:rating={rating} />
        </div>
        <div class="flex flex-col pt-2">
            <h6>Final Thoughts</h6>
            <textarea class="h-40" bind:value={thoughts}/>
        </div>

        <form method="POST" use:enhance={() => {
            loading = true;
            //@ts-ignore
            return async ({ update }) => {
                await update();
                loading = false;
            };
        }}>
            <input type="text" hidden name="data" value={final} />
            <button disabled={loading || postgame.strategy.length == 0} class="mt-2 submit">{loading ? "Loading..." : "Submit"}</button>
        </form>
    </div>
</center>