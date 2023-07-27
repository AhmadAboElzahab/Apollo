const jwt = require('jsonwebtoken');
const adminAuthorization = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Only admins are allowed.' });
        }
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = adminAuthorization;
