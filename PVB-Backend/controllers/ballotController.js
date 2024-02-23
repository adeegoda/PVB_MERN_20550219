const Ballot = require('../models/eballot');

async function submitBallot(req, res) {
    const { option_1, option_2, option_3 } = req.body;
    console.log('Received option_1:', option_1);
    console.log('Received option_2:', option_2);
    console.log('Received option_3:', option_3);

    try {
        // Create a new instance of the Ballot model
        const newBallot = new Ballot({
            option_1,
            option_2,
            option_3
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
