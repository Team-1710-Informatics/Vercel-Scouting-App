import { Portfolio } from '$lib/server/models'
import credi from '$lib/server/user/credi'

export async function load({ locals }) {
    let portfolio = await Portfolio.findOne({ user: locals.user.username })

    if (!portfolio) portfolio = {}

    return {
        user: locals.user.username,
        portfolio: JSON.parse(JSON.stringify(portfolio)),
    }
}

export const actions = {
    purchase: async function ({ locals, request, fetch }) {
        const r = await request.formData()

        const team = +r.get('team')
        const stocks = +r.get('stocks')

        const value = (await (await fetch(`stocks/${team}`)).json()).value

        let port = await Portfolio.findOne({ user: locals.user.username })

        if (!port?.portfolio) {
            port = new Portfolio({ user: locals.user.username, portfolio: {} })
            await port.save()
        }

        if (!port?.times) port.times = {}

        port.portfolio[team] = +(port.portfolio?.[team] ?? 0) + +stocks
        port.times[team] = Date.now()
        await Portfolio.updateOne(
            { user: locals.user.username },
            { $set: { portfolio: port.portfolio, times: port.times } }
        )

        await credi.transaction(
            locals.user.username,
            -value * stocks,
            `Purchased ${stocks} stocks in ${team}`
        )

        return {
            portfolio: JSON.parse(JSON.stringify(port)),
        }
    },

    sell: async function ({ locals, request, fetch }) {
        const r = await request.formData()

        const team = +r.get('team')
        const sell = +r.get('sell')

        const value = (await (await fetch(`stocks/${team}`)).json()).value

        const port = await Portfolio.findOne({ user: locals.user.username })

        port.portfolio[team] = port.portfolio[team] - sell
        await Portfolio.updateOne(
            { user: locals.user.username },
            { $set: { portfolio: port.portfolio } }
        )

        await credi.transaction(
            locals.user.username,
            value * sell,
            `Sold ${sell} stocks in ${team}`
        )

        return {
            portfolio: JSON.parse(JSON.stringify(port)),
        }
    },
}
