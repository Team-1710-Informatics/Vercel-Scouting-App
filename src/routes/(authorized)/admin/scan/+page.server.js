import { ScoutData } from '$lib/server/models'
import { decompress } from '$lib/modules/jsoncompress.js'

export const actions = {
    default: async ({ request }) => {
        const input = await request.formData()

        console.log("Decompressed Data: ", input.get('data'))

        const data = JSON.parse(input.get('data'));
        if (!data) return

        const db = new ScoutData(data)
        await db.save()

    }
}