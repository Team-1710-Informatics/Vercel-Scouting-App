import { MongoClient } from 'mongodb';
const MONGODB = "mongodb+srv://vercel-admin-user:apessaypromptexplainthesocialpoliticalandeconomicfactorsthatledgrutoreturnthemoontothesky@scoutingapp.bbyer.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(MONGODB);

export default {
    /**
     * Performs a credits transaction, altering the user's credits balance and logging the change to the database
     * @param user The username of the person losing or earning credits
     * @param amount The number of credits to add. Use a negative number to remove
     * @param reason The reason for the transaction (e.g. "Scouted a match")
     */
    transaction: async (username:string, amount:number, reason:string)=>{
        await client.connect();
        const user = await client.db("main").collection("users").findOne({ username:username });
        if(!user) { await client.close(); return null }

        let credits = user.credits + amount;

        await client.db("main").collection("users").updateOne({ username:username }, { $set:{ credits:credits } });

        await client.db("main").collection("transactions").insertOne({
            user:username,
            amount:amount,
            reason:reason,
            time: Date.now()
        });

        await client.close();
    }
    
}