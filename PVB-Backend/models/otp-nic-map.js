const mongoose = require('./index');

const otpNicSchema = new mongoose.Schema({
    generatedOtp: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const OTP_NIC = mongoose.model('OTP_NIC', otpNicSchema);

module.exports = OTP_NIC;