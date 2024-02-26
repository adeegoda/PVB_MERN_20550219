const activeOTPs = {};

function sessionMiddleware(req, res, next) {
    const userOTP = req.headers['user-otp']; // Assuming OTP is sent in a header
    // Check if the user has an active OTP session
    if (userOTP && activeOTPs[userOTP]) {
        // User has an active OTP session, continue
        next();
    } else {
        // OTP is invalid or expired
        res.status(401).json({ message: 'Invalid OTP' });
    }
}

module.exports = {
    sessionMiddleware,
    activeOTPs
};
