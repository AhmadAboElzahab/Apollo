const jwt = require('jsonwebtoken');


const userAuthorization = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        if (req.user.role !== 'user') {
            return res.status(403).json({ message: 'Access denied. Users are  allowed Only.' });
        }

        req.userId = req.user.id;

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = userAuthorization;
