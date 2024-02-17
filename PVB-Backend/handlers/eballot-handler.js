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
