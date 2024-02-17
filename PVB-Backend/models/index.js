require('dotenv').config();
const mongoose = require('mongoose');
let dbConnection;

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

module.exports.connectPVBDatabase = async () => {
    console.log("Connecting to PVB Database...");
    dbConnection = await mongoose.connect(process.env.DB_URI);
    console.log("Connected to PVB Database");
    return dbConnection;
}
