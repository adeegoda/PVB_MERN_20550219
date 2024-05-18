const mongoose = require('mongoose');

const cancelledVoteSchema = new mongoose.Schema({
  voteCancelled: String,
  voteDate: Date
}, { collection: 'cancelledballots' });

module.exports = mongoose.model('CANCELLED', cancelledVoteSchema);