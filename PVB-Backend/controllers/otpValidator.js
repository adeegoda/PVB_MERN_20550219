const OTP = require('../models/otp');

async function validateOTP(req, res) {
    const enteredOTP = req.body.otp;
    try {
        const savedOTP = await OTP.findOne({ otp: enteredOTP });

        if (savedOTP && savedOTP.otp === enteredOTP) {
            res.json({ verified: true, message: 'OTP is valid' });
        } else {
            res.json({ verified: false, message: 'OTP is not valid' });
        }
    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).json({ error: 'Failed to verify OTP' });
    }
} 

module.exports = { validateOTP };