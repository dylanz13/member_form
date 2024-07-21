const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db('MembersDatabase');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

function getDb() {
    return db;
}

module.exports = { connectToDatabase, getDb };