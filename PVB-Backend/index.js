require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./error-handlers');
const authRoutes = require('./routes/auth');
const { loadElectionDetails } = require('./party-handlers/electionHandler');
const { loadPartyDetails } = require('./party-handlers/cardHandler');
const { submitBallot } = require('./controllers/ballotController');
const { recordCancelledVote } = require('./controllers/ballotController');
const { generateOTP } = require('./controllers/otpGenerator');
const { validateOTP } = require('./controllers/otpValidator');
const { getVotesPerParty } = require('./controllers/votesController');
const { getTotalVotesCasted } = require('./controllers/votesController');
const { getTotalVotesCancelled } = require('./controllers/votesController');
const { getFraudAttepts } = require('./controllers/otpGenerator');
const { getFraudAtteptsPerID } = require('./controllers/otpGenerator');
require('mongoose');
const authMiddleware = require('./middleware/authMiddleware');

const port = process.env.PORT;

const pvbApp = express();
pvbApp.use(express.json());
pvbApp.use(bodyParser.json());
pvbApp.use(cors());

// Import database connection
require('./models');

// Route handlers
pvbApp.use('/auth', authRoutes);
pvbApp.get('/pvb-api/election-details', authMiddleware, loadElectionDetails);
pvbApp.get('/pvb-api/party-cards', authMiddleware, loadPartyDetails);
pvbApp.post('/pvb-api/generate-otp', authMiddleware, generateOTP);
pvbApp.post('/pvb-api/validate-otp', authMiddleware, validateOTP);
pvbApp.post('/pvb-api/submitBallots', authMiddleware, submitBallot);
pvbApp.post('/pvb-api/cancelled-ballots', authMiddleware, recordCancelledVote);
pvbApp.get('/pvb-api/votes-per-party', authMiddleware, getVotesPerParty);
pvbApp.get('/pvb-api/total-valid-votes', authMiddleware, getTotalVotesCasted);
pvbApp.get('/pvb-api/total-cancelled-votes', authMiddleware, getTotalVotesCancelled);
pvbApp.get('/pvb-api/fraud-attepmts', authMiddleware, getFraudAttepts)
pvbApp.post('/pvb-api/fraud-attepmts-perNIC', authMiddleware, getFraudAtteptsPerID)

pvbApp.use(errorHandler.resourceNotFound);
pvbApp.use(errorHandler.pvbErrorHandler);

pvbApp.listen(port, console.log(`Server started @ port ${port}`));
