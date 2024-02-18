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

module.exports.getAllBallots = async () => {
    try {
        console.log("Retrieving Data..");
        results = await client.db("PVB-Eballots").collection('eballots').find().toArray();
        console.log(results);
        return results;
    } catch (error) {
        console.log('DB Connection error');
    }
}

module.exports.submitBallot = async (ballot) => {
    try {
        console.log("Submiting Ballot..");
        await client.db("PVB-Eballots").collection('eballots').insertOne(ballot);
        console.log("Ballot Submitted!");
    } catch (error) {
        console.log('DB Connection error');
    }
}