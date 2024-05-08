const { otpGen } = require('otp-gen-agent');
const OTP = require('../models/otp');

async function generateOTP(req, res) {
    const enteredNIC = req.body.nic;
    const nicRecord = await OTP.findOne({ nic: enteredNIC });
    try {
        if (nicRecord) {
            return res.status(401).json({ message: 'OTP අංකයකට සම්බන්ද NIC අංකයකි | OTP already existing for the NIC number | NIC எண்ணுக்கு ஏற்கனவே OTP உள்ளது' });
        }
        if (!nicRecord) {
            const otp = await otpGen();
            const newOTP = new OTP({ otp: otp, nic: enteredNIC });
            console.log("Saving generated OTP...");
            await newOTP.save();
            console.log("Generated OTP saved with paired NIC!");
            res.status(201).json({ otp: otp, message: 'OTP Generated successfully' });
        }
    } catch (error) {
        console.error('Error saving generated OTP to database:', error);
        res.status(500).json({ error: 'Failed to generate OTP' });
    }
}

module.exports = { generateOTP };