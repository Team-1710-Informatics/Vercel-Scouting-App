<script lang="ts">

    let categories = [
        "Clothes",
        "Accessories",
        "Miscellaneous"
    ];

    let rarities = [
        "Common",
        "Rare",
        "Legendary"
    ]

    let colors = ["0,0,0","16, 124, 194","255, 215, 0"]

    let category = "Miscellaneous";
    let name = "";
    let price = 3000;
    let stock = 1;
    let color = "#0e7cc1";
    let rarity = 0;

    function hexToRgb(hex:string) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
    }

</script>
<middle>
    <div class="box flex flex-col">
        <h1>Add an Item to the Credit Store:</h1><br>
        <div class="grid grid-cols-2">
            <p>Category: </p>
            <select bind:value={category}>
                {#each categories as c}
                    <option value={c}>{c}</option>
                {/each}
            </select>

            <p>Rarity: </p>
            <select bind:value={rarity}>
                <option value={0}>Common</option>
                <option value={1}>Rare</option>
                <option value={2}>Legendary</option>
            </select>

            <p>Name: </p>
            <input bind:value={name}/>

            <p>Price: </p>
            <input type="number" bind:value={price}/>

            <p>Stock: </p>
            <input type="number" bind:value={stock}/>

        </div>
        <form method="POST">
            <input hidden bind:value={category} name="category" required>
            <input hidden bind:value={rarity} name="rarity" required>
            <input hidden bind:value={name} name="name" required>
            <input hidden bind:value={price} name="price" required>
            <input hidden bind:value={stock} name="stock" required>
            <input hidden value={colors[rarity]} name="color" required>
            <button class="submit">
                Submit
            </button>
        </form>
    </div>
</middle>