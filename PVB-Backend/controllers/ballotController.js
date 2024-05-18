const Ballot = require('../models/eballot');
const CancelledBallot = require('../models/cancel-ballot');

async function submitBallot(req, res) {
    const { party_code } = req.body;
    console.log('Received Party Code:', party_code);
    try {
        const newBallot = new Ballot({
            party_code
        });
        await newBallot.save();
        res.status(201).json({ message: 'Ballot submitted successfully' });
    } catch (error) {
        console.error('Error saving ballot:', error);
        res.status(500).json({ message: 'Failed to submit Ballot' });
    }
}

async function recordCancelledVote(req, res) {
    const { voteCancelled } = req.body;
    console.log('Vote Cancelled:', voteCancelled);
    try {
        const newCancelledBallot = new CancelledBallot({
            voteCancelled
        });
        await newCancelledBallot.save();
        res.status(201).json({ message: 'Cancelled Ballot submitted successfully' });
    } catch (error) {
        console.error('Error saving ballot:', error);
        res.status(500).json({ message: 'Failed to submit Cancelled Ballot' });
    }
}

module.exports = {
    submitBallot,
    recordCancelledVote
};
