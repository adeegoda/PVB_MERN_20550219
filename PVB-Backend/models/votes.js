const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  party_code: String,
  voteDate: Date
}, { collection: 'ballots' });

module.exports = mongoose.model('VOTE', voteSchema);