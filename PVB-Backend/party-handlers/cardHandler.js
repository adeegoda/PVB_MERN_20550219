const cards = require('./party-cards');

async function loadPartyDetails(req, res) {
    try {
        res.status(200).json(cards);
        console.log('Part Cards Released Successfully!')
    } catch (error) {
        res.status(500).json({ message: 'Failed to load Party Details' });
    }
}

module.exports = { loadPartyDetails };