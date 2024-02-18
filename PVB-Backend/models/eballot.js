const mongoose = require('./index');

// Define a schema for your data
const BallotSchema = new mongoose.Schema({
    voter_id: String,
    option_1: Boolean,
    option_2: Boolean,
    option_3: Boolean
});

// Create a model based on the schema
const Ballot = mongoose.model('Ballot', BallotSchema);

module.exports = Ballot;
