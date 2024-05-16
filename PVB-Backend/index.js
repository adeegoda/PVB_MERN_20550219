require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./error-handlers');
const { loadElectionDetails } = require('./party-handlers/electionHandler');
const { loadPartyDetails } = require('./party-handlers/cardHandler');
const { submitBallot } = require('./controllers/ballotController');
const { generateOTP } = require('./controllers/otpGenerator');
const { validateOTP } = require('./controllers/otpValidator');
const { getVotesPerParty } = require('./controllers/votesController');
require('mongoose');
const port = process.env.PORT;

const pvbApp = express();
pvbApp.use(express.json());
pvbApp.use(bodyParser.json());
pvbApp.use(cors());

// Import database connection
require('./models');

// Route handlers
pvbApp.get('/pvb-api/election-details', loadElectionDetails);
pvbApp.get('/pvb-api/party-cards', loadPartyDetails);
pvbApp.post('/pvb-api/generate-otp', generateOTP);
pvbApp.post('/pvb-api/validate-otp', validateOTP);
pvbApp.post('/pvb-api/submitBallots', submitBallot);
pvbApp.get('/pvb-api/votes-per-party', getVotesPerParty);

pvbApp.use(errorHandler.resourceNotFound);
pvbApp.use(errorHandler.pvbErrorHandler);

pvbApp.listen(port, console.log(`Server started @ port ${port}`));
