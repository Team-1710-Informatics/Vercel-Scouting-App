<script>
    import StarRating from "$lib/components/StarRating.svelte";

    export let data;
</script>

<center class="w-full">
    <div class="box">
        <p class="font-bold text-2xl">Your Rating</p>
        <StarRating editable />
    </div>
    <br>
    <p class="text-left">
        {@html JSON.stringify(data.scout, null, '')}
    </p>
</center>