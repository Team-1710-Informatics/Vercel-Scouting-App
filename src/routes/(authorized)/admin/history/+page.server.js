import { Transaction } from '$lib/server/models'

export async function load() {
    const transactions = JSON.parse(JSON.stringify(await Transaction.find()))

    return {
        transactions,
    }
}
