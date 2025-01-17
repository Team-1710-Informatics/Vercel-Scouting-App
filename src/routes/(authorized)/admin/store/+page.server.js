import { StoreItem } from '$lib/server/models'

export const load = async function () {}

export const actions = {
    default: async ({ request }) => {
        const input = await request.formData()

        const item = new StoreItem({
            name: input.get('name'),
            price: input.get('price'),
            stock: input.get('stock'),
            category: input.get('category'),
            color: input.get('color'),
        })

        await item.save()
    },
}
