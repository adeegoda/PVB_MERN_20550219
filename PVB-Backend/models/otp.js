const mongoose = require('./index');

const otpSchema = new mongoose.Schema({
    otp: {
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

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;