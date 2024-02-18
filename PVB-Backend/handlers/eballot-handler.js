const dbModel = require('../models');

exports.showBallots = async (req, res, next) => {
    try {
        await dbModel.connectPVBDatabaseNew();
        const ballots = dbModel.getAllBallots();
        res.status(200).json(ballots);
    } catch (error) {
        error.status = 400;
        next(error);
    }
}

exports.submitBallot = async (req, res, next) => {
    try {
        const { voter_nic, option_1 } = req.body;
        const ballot = { voter_nic, option_1 }
        await dbModel.submitBallot(ballot);

    } catch (error) {
        error.status = 400;
        next(error);
    }
}