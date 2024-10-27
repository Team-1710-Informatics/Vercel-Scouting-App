import { Receipt, StoreItem, User } from '$lib/server/models'
import { error } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import credi from '$lib/server/user/credi'

export const load = async function ({ locals }) {
    return await getInfo(locals.user.username)
} satisfies PageServerLoad

export const actions = {
    async purchase({ request, locals }) {
        const input = await request.formData()

        const item = await StoreItem.findOne({ name: input.get('item') })
        const user = await User.findOne({ username: input.get('user') })

        if (!user) throw error(400)
        if (!item) throw error(400)
        if (item?.stock === 0) throw error(500)
        if (item.stock != undefined && item.stock > 0) item.stock--

        const receipt = new Receipt({
            user: user.username,
            price: item.price,
            item: item.name,
        })

        await item.save()
        await receipt.save()

        await credi.transaction(
            user.username,
            -item.price,
            `Purchased ${item.name}`
        )

        return await getInfo(locals.user.username)
    },
} satisfies Actions

async function getInfo(user: string) {
    const items: Merchandise[] = JSON.parse(
        JSON.stringify(await StoreItem.find())
    )
    const receipts: Receipt[] = JSON.parse(
        JSON.stringify(await Receipt.find({ user }))
    )

    return {
        items,
        receipts,
    }
}
