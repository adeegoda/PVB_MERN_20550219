require('dotenv').config();
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const { env } = require('process');
let results;

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

module.exports = mongoose;

// module.exports.connectPVBDatabaseNew = async () => {
//     try {
//         await client.connect();
//         await client.db("PVB-Eballots").command({ ping: 1 });
//         console.log("Successfully connected to PVB Database!");
//     } catch (error) {
//         console.log('DB Connection error');
//         await client.close();
//     }
// }

// module.exports.getAllBallots = async () => {
//     try {
//         console.log("Retrieving Data..");
//         results = await client.db("PVB-Eballots").collection('eballots').find().toArray();
//         console.log(results);
//         return results;
//     } catch (error) {
//         console.log('DB Connection error');
//     }
// }

// module.exports.submitBallot = async (ballot) => {
//     try {
//         console.log("Submiting Ballot..");
//         await client.db("PVB-Eballots").collection('eballots').insertOne(ballot);
//         console.log("Ballot Submitted!");
//     } catch (error) {
//         console.log('DB Connection error');
//     }
// }