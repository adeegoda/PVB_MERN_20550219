const jwt = require('jsonwebtoken');

const combinedMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const otpHeader = req.headers['otp-authorization'];

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else if (otpHeader) {
    const otpToken = otpHeader.split(' ')[1];
    jwt.verify(otpToken, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = combinedMiddleware;