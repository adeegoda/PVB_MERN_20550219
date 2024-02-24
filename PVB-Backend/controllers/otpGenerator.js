const { otpGen } = require('otp-gen-agent');
const OTP = require('../models/otp');

async function generateOTP(req, res) {
    try {
        const otp = await otpGen();
        const newOTP = new OTP({ otp: otp });
        console.log("Saving generated OTP...");
        await newOTP.save();
        console.log("Generated OTP saved!");
        res.status(201).json({ otp: otp, message: 'OTP Generated successfully' });
    } catch (error) {
        console.error('Error saving generated OTP to database:', error);
        res.status(500).json({ error: 'Failed to generate OTP' });
    }
}

module.exports = { generateOTP };