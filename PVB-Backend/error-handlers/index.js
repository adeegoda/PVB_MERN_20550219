module.exports.resourceNotFound = (req, res, next) => {
    const error = new Error('Resource Not Found');
    error.status = 404;
    next(error);
}

module.exports.pvbErrorHandler = (error, req, res, next) => {
    res.status(error.status || 500).json({
        error: error.message || 'Something went wrong!'
    });
}