const Ballot = require('../models/eballot');

async function submitBallot(req, res) {
    const { party_code} = req.body;
    console.log('Received Party Code:', party_code);

    try {
        // Create a new instance of the Ballot model
        const newBallot = new Ballot({
            party_code
        });
        // Save the new ballot to the database
        await newBallot.save();
        // Respond with success message
        res.status(200).json({ message: 'Ballot submitted successfully' });
    } catch (error) {
        console.error('Error saving ballot:', error);
        // Respond with an error message
        res.status(500).json({ message: 'Failed to submit ballot' });
    }
}

module.exports = {
    submitBallot
};
