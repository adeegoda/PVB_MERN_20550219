const OTP = require('../models/otp');
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
                res.status(202).json({ verified: true, message: 'OTP is valid' });
                console.log("Removing validated OTP..");
                await OTP.deleteOne({ _id: savedOTP._id });
                console.log("Removed validated OTP");
            } else {
                res.status(401).json({ verified: false, message: 'කල් ඉකුත් වූ OTP යකි | Expired OTP |காலாவதியான OTP' });
            }
        } else {
            res.status(401).json({ verified: false, message: 'භාවිතා කරන ලද OTP යකි | Used OTP |காலாவதியான OTP' });
        }
    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).json({ error: 'Failed to verify OTP' });
    }
}

module.exports = { validateOTP };