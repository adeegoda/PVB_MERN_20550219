const Card = require('../models/cards');

async function loadPartyDetails(req, res) {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
        console.log('Party Cards Released Successfully!')
    } catch (error) {
        console.error('Error fetching card data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { loadPartyDetails };