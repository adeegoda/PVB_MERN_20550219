const OTP = require('../models/otp');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const OTP_EXPIRY_DURATION_MS = 30 * 1000;

async function validateOTP(req, res) {
    const enteredOTP = req.body.otp;
    try {
        const savedOTP = await OTP.findOne({ otp: enteredOTP });
        if (!savedOTP) {
            return res.status(401).json({ message: 'OTP වලංගු නැත | OTP is not valid | OTP செல்லுபடியாகாது' });
        }
        if (savedOTP && savedOTP.otp === enteredOTP) {
            const currentTime = new Date();
            const otpCreationTime = new Date(savedOTP.createdAt);
            const otpAge = currentTime - otpCreationTime;

            if (otpAge <= OTP_EXPIRY_DURATION_MS) {
                const otptoken = jwt.sign({ userId: savedOTP.userId }, process.env.JWT_SECRET, { expiresIn: '7m' });
                res.status(202).json({ verified: true, otptoken, message: 'OTP is valid' });
                console.log('OTP Validation Token sent:', otptoken);
                console.log("Removing validated OTP..");
                await OTP.deleteOne({ _id: savedOTP._id });
                console.log("Removed validated OTP");
            } else {
                res.status(401).json({ verified: false, message: 'කල් ඉකුත් වූ OTP යකි | Expired OTP | காலாவதியான OTP' });
                await OTP.deleteOne({ _id: savedOTP._id });
            }
        } else {
            res.status(401).json({ verified: false, message: 'භාවිතා කරන ලද OTP යකි | Used OTP | காலாவதியான OTP' });
        }
    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { validateOTP };