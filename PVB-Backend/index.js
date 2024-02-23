require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./error-handlers');
const { submitBallot } = require('./controllers/ballotController');
const { generateOTP } = require('./controllers/otpGenerator');
const { validateOTP } = require('./controllers/otpValidator');
const port = process.env.PORT;

const pvbApp = express();
pvbApp.use(express.json());
pvbApp.use(bodyParser.json());
pvbApp.use(cors());

// Import database connection
require('./models');

// Route handlers
pvbApp.post('/generate-otp', generateOTP);
pvbApp.post('/validate-otp', validateOTP);
pvbApp.post('/api/submitBallots', submitBallot);

pvbApp.use(errorHandler.resourceNotFound);
pvbApp.use(errorHandler.pvbErrorHandler);

pvbApp.listen(port, console.log(`Server started @ port ${port}`));
