import { StoreItem } from '$lib/server/models';

export const actions = {
    default: async({request})=>{
        const input = await request.formData();
        const name = input.get("name");
        const price = input.get("price");
        const stock = input.get("stock");
        const category = input.get("category");

        const item = new StoreItem({
            name:input.get("name"),
            price:input.get("price"),
            stock:input.get("stock"),
            category:input.get("category")
        });

        await item.save();
    }
}