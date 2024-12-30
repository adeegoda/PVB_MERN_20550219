const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    console.error('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
    console.log('Auth middleware executed - Token validated');
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    console.error('Invalid token:', error);
  }
};

module.exports = authMiddleware;