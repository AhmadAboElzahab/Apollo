const jwt = require('jsonwebtoken');
const adminAuthorization = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins are allowed only.' });
    }
    req.userId = req.user.id;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = adminAuthorization;
