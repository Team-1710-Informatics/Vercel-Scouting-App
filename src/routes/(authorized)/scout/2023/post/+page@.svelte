<script>
    import StarRating from "$lib/components/StarRating.svelte";

    export let data;

    const strategies = [
        ["FULL CYCLE", "cycle"],
        ["RECIEVE & PLACE", "place"],
        ["TRANSPORTER", "transport"],
        ["DEFENSE", "defense"],
        ["TOAST BREAD 🍞", "bread"]
    ]
</script>

<center class="w-full pt-10">
    <div class="box">
        <p class="font-bold text-2xl">Your Rating</p>
        <StarRating editable />
    </div>
    <br>
    <p class="text-left">
        {@html JSON.stringify(data.scout, null, '')}
    </p>
</center>