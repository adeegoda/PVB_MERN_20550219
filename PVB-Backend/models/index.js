require('dotenv').config();
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
let results;

const client = new MongoClient(process.env.DB_URI);
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

module.exports.connectPVBDatabaseNew = async () => {
    try {
        await client.connect();
        await client.db("PVB-Eballots").command({ ping: 1 });
        console.log("Successfully connected to PVB Database!");
    } catch (error) {
        console.log('DB Connection error');
        await client.close();
    }
}

module.exports.getAllBallots = () => {
    try {
        console.log("Retrieving Data..");
        results = client.db("PVB-Eballots").collection('eballots').find().toArray();
        console.log(results);
        return results;
    } catch (error) {
        console.log('DB Connection error');
    }
}
