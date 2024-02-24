const mongoose = require('./index');

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

const Ballot = mongoose.model('Ballot', BallotSchema);

module.exports = Ballot;
