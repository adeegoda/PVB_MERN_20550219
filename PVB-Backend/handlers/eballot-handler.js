const db = require('../models');

exports.showBallots = async (req, res, next) => {
    try {
        const ballots = await db.connectPVBDatabase().collection('eballots').find();
        res.status(200).json(ballots);
    } catch (error) {
        error.status = 400;
        next(error);
    }
}

exports.createBallot = async (req, res, next) => {
    try {
        const ballots = await db.connectPVBDatabase().collection('eballots').find();
        res.status(200).json(ballots);
    } catch (error) {
        error.status = 400;
        next(error);
    }
}