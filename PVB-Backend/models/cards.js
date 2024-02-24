const mongoose = require('./index');

const cardSchema = new mongoose.Schema({
    party_code: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    header1: {
        type: String,
        required: true
    },
    header2: {
        type: String,
        required: true
    },
    header3: {
        type: String,
        required: true
    }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
