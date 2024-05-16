const VOTE = require('../models/votes');

async function getVotesPerParty(req, res) {
    const votesPerParty = await VOTE.aggregate([
      { $group: { _id: '$party_code', count: { $sum: 1 } } }
    ]);
  
    res.json(votesPerParty);
  }
  
  module.exports = { getVotesPerParty };