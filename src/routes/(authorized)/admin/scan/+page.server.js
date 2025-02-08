import { ScoutData } from '$lib/server/models'
import { decompress } from '$lib/modules/jsoncompress.js'

export const actions = {
    default: async ({ request }) => {
        const input = await request.formData()
        const data = JSON.parse(input.get('data'));

        if (!data) return

        const db = new ScoutData(decompress(data))
        console.log(decompress(data))
        await db.save()

    }
}