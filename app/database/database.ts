import {Collection, Db, MongoClient, ServerApiVersion} from 'mongodb';
const DB_URI: string = process.env.DB_URI
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(DB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
export const database: Db = client.db('mastermind')
export const sessionCollection: Collection = database.collection('games')
export const userCollection: Collection = database.collection('users')

export const connectToDatabase = async (): Promise<void> => {
    try {
        await client.connect()
        console.log('connected!')
    }
    catch (err: unknown) {
        console.error(`Err: ${err}`)
    }
}