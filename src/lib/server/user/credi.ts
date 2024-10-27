import mongoose from 'mongoose'
import { Transaction, User } from '$lib/server/models'

export default {
    /**
     * Performs a credits transaction, altering the user's credits balance and logging the change to the database
     * @param user The username of the person losing or earning credits
     * @param amount The number of credits to add. Use a negative number to remove
     * @param reason The reason for the transaction (e.g. "Scouted a match")
     */
    transaction: async (username: string, amount: number, reason: string) => {
        const user = await User.findOne({ username: username })
        if (!user?.username) return null

        //@ts-ignore
        let credits = user.credits + amount

        await User.updateOne({ username: username }, { credits: credits })

        const log = new Transaction({
            user: username,
            amount: amount,
            reason: reason,
            time: Date.now(),
        })

        await log.save()
    },
}
