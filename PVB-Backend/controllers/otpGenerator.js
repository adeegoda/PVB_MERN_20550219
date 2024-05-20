const { otpGen } = require('otp-gen-agent');
const OTP = require('../models/otp');
const OTP_NIC_MAP = require('../models/otp-nic-map');
const OTP_NIC_ERROR = require('../models/otp-nic-map-errors');

async function generateOTP(req, res) {
    const enteredNIC = req.body.nic;
    const nicRecord = await OTP_NIC_MAP.findOne({ nic: enteredNIC });
    console.log('Entered NIC: ' + enteredNIC)
    try {
        if (nicRecord) {
            const fraudAttempt = new OTP_NIC_ERROR({ nic: enteredNIC })
            await fraudAttempt.save();
            console.log('Farud Attempt Recorded')
            return res.status(401).json({ message: 'OTP අංකයකට සම්බන්ද NIC අංකයකි | OTP already existing for the NIC number | NIC எண்ணுக்கு ஏற்கனவே OTP உள்ளது' });
        }
        if (!nicRecord) {
            const otp = await otpGen();
            const newOTP = new OTP({ otp: otp, nic: enteredNIC });
            const newOTP_NIC_MAP = new OTP_NIC_MAP({ generatedOtp: otp, nic: enteredNIC });
            console.log("Saving generated OTP...");
            await newOTP.save();
            await newOTP_NIC_MAP.save();
            console.log("Generated OTP saved with paired NIC!");
            res.status(201).json({ otp: otp, message: 'OTP Generated successfully' });
        }
    } catch (error) {
        console.error('Error saving generated OTP to database:', error);
        res.status(500).json({ error: 'Failed to generate OTP' });
    }
}

async function getFraudAttepts(req, res) {
    try {
        const totalNICFraudCount = await OTP_NIC_ERROR.countDocuments({});
        res.json({ totalNICFraudCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while coutning Total Farud Attempts' });
    }
}

async function getFraudAtteptsPerID(req, res) {
    const enteredOTPNIC = req.body.nic;
    try {
        const perNICFraudCount = await OTP_NIC_ERROR.countDocuments({ nic: enteredOTPNIC });
        res.json({ perNICFraudCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while coutning Per ID Farud Attempts' });
    }
}

module.exports = { generateOTP, getFraudAttepts, getFraudAtteptsPerID };