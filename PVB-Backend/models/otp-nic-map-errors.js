const mongoose = require('./index');

const otpNicErrorSchema = new mongoose.Schema({
    nic: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const OTP_NIC_ERROR = mongoose.model('OTP_NIC_ERROR', otpNicErrorSchema);

module.exports = OTP_NIC_ERROR;