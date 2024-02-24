const mongoose = require('./index');

// Define a schema for your data
const BallotSchema = new mongoose.Schema({
    party_code: {
        type: String,
        required: true
    },
    voteDate: {
        type: Date,
        default: Date.now
    }
});

// Create a model based on the schema
const Ballot = mongoose.model('Ballot', BallotSchema);

module.exports = Ballot;
