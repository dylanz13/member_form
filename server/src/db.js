const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

async function connectToDatabase(name) {
    try {
        await client.connect();
        db = client.db();
        console.log('Connected to MongoDB');
        return Promise.resolve();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return Promise.reject(error.message);
    }
}

function getDb() {
    return db;
}

async function stop() {
    await client.close()
}

module.exports = { connectToDatabase, getDb, stop };
export {connectToDatabase, getDb, stop}