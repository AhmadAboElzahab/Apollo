const responseHandler = (req, res, next) => {
    res.sendResponse = (data, message = 'Success', status = 200) => {
        res.status(status).json({ message, data });
    };

    next();
};

module.exports = responseHandler;