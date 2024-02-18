require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI).then(() => console.log('PVB Database Connected')).catch(err => console.log(err));

module.exports = mongoose;
