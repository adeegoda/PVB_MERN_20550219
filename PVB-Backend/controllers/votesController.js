const VOTE = require('../models/votes');

async function getVotesPerParty(req, res) {
    try {
        const votesPerParty = await VOTE.aggregate([
            { $group: { _id: '$party_code', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        res.json(votesPerParty);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while counting Part Votes' });
    }
}

async function getTotalVotesCasted(req, res) {
    try {
        const totalVotes = await VOTE.countDocuments({});
        res.json({ totalVotes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while coutning Total Votes' });
    }
}

module.exports = { getVotesPerParty, getTotalVotesCasted };