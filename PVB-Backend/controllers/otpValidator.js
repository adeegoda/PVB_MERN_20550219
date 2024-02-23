const OTP = require('../models/otp');

async function validateOTP(req, res) {
    const enteredOTP = req.body.otp;
    try {
        const savedOTP = await OTP.findOne({ otp: enteredOTP });
        if (!savedOTP) {
            return res.status(404).json({ message: 'කල් ඉකුත් වූ OTP යකි | Expired OTP |காலாவதியான OTP' });
        }
        if (savedOTP && savedOTP.otp === enteredOTP) {
            res.status(202).json({ verified: true, message: 'OTP is valid' });
            console.log("Removing validated OTP..");
            await OTP.deleteOne({ _id: savedOTP._id });
            console.log("Removed validated OTP: " + savedOTP);
        } else {
            res.json({ verified: false, message: 'OTP වලංගු නැත | OTP is not valid | OTP செல்லுபடியாகாது' });
        }
    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).json({ error: 'Failed to verify OTP' });
    }
}

module.exports = { validateOTP };