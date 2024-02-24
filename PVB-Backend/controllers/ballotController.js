const Ballot = require('../models/eballot');

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
        res.status(500).json({ message: 'Failed to submit ballot' });
    }
}

module.exports = {
    submitBallot
};
