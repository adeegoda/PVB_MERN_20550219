const Election = require('../models/election');

async function loadElectionDetails(req, res) {
    try {
        const election = await Election.find();
        res.status(200).json(election);
        console.log('Election Data Released Successfully!')
    } catch (error) {
        console.error('Error fetching election data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { loadElectionDetails };