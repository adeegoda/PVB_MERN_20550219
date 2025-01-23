const jwt = require('jsonwebtoken');

const otpMiddleware = (req, res, next) => {
  const token = req.headers['otp-authorization'];
  if (!token) {
    console.error('No OTP token provided');
    return res.status(401).json({ message: 'No OTP token provided' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
    console.log('Auth middleware executed - OTP Token validated');
  } catch (error) {
    res.status(401).json({ message: 'Invalid OTP token' });
    console.error('Invalid OTP token:', error);
  }
};

module.exports = otpMiddleware;