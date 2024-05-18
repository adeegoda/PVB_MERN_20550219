const mongoose = require('./index');

const CancelledBallotSchema = new mongoose.Schema({
    voteCancelled: {
        type: String,
        required: true
    },
    voteDate: {
        type: Date,
        default: Date.now
    }
});

const CancelledBallot = mongoose.model('CancelledBallot', CancelledBallotSchema);

module.exports = CancelledBallot;
