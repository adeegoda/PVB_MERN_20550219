const mongoose = require('./index');

const electionSchema = new mongoose.Schema({
    election_name_sinhala: {
        type: String,
        required: true
    },
    election_name_english: {
        type: String,
        required: true
    },
    election_name_tamil: {
        type: String,
        required: true
    },
    election_code: {
        type: String,
        required: true
    },
    election_year: {
        type: String,
        required: true
    }
});

const Election = mongoose.model('Election', electionSchema);

module.exports = Election;
