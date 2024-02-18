require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers');
const { submitBallot } = require('./controllers/ballotController');
const port = process.env.PORT;

const pvbApp = express();
pvbApp.use(express.json());
pvbApp.use(bodyParser.json());

// Import database connection
require('./models');

pvbApp.get('/', (req, res) => {
    res.json({ text: 'Hello from Anji! this is a GET request' });
    console.log("GET RQ recieved");
});

pvbApp.use(cors());

// Route handler for submitting ballots
pvbApp.post('/api/submitBallots', submitBallot);

pvbApp.use(errorHandler.resourceNotFound);
pvbApp.use(errorHandler.pvbErrorHandler);

pvbApp.listen(port, console.log(`Server started @ port ${port}`));
