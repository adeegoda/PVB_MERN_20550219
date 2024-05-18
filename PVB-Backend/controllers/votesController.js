const VOTE = require('../models/votes');
const CANCELLED = require('../models/cancelled-votes');

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
        const totalValidVotes = await VOTE.countDocuments({});
        res.json({ totalValidVotes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while coutning Total Votes' });
    }
}

async function getTotalVotesCancelled(req, res) {
    try {
        const totalCancelledVotes = await CANCELLED.countDocuments({});
        res.json({ totalCancelledVotes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while coutning Total Votes' });
    }
}

module.exports = { getVotesPerParty, getTotalVotesCasted, getTotalVotesCancelled };