import mongoose from 'mongoose';
import {Transaction, User} from '../models';

export default {
    transaction: async (username: string, amount: number, reason: string) => {
        const user = await User.findOne({username: username});
        if (!user?.username) return null;

        //@ts-ignore
        let tokens = user.tokens + amount;

        await User.updateOne({username: username}, {tokens: tokens})

        const log = new Transaction({
            user: username,
            amount: amount,
            reason: reason,
            time: Date.now(),
        })

        await log.save()

    }
}