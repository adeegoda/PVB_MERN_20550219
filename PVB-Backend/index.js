require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers');
const routes = require('./routes');
const Ballot = require('./models/eballot');

const pvbApp = express();
pvbApp.use(express.json());
pvbApp.use(bodyParser.json());
const port = process.env.PORT;

// Import database connection
require('./models');

pvbApp.get('/', (req, res) => {
    res.json({ text: 'Hello from Anji! this is a GET request' });
    console.log("GET RQ recieved");
});

pvbApp.use(cors());
// pvbApp.use('/api/eballots', routes.eballot);
// pvbApp.use('/api/submitBallots', routes.eballot);

pvbApp.post('/', (req, res) => {
    res.json({ text: 'Hello from Anji! This is a POST request!' });
    console.log("POST RQ recieved");
});

pvbApp.post('/api/submitBallots', async(req, res) => {
    const { voter_id, option_1, option_2, option_3 } = req.body;
    console.log('Received voter_id:', voter_id);
    console.log('Received option_1:', option_1);
    console.log('Received option_2:', option_2);
    console.log('Received option_3:', option_3);

    try {
        // Create a new instance of the Ballot model
        const newBallot = new Ballot({
            voter_id,
            option_1,
            option_2,
            option_3
        });

        // Save the new ballot to the database
        await newBallot.save();

        // Respond with success message
        res.status(200).json({ message: 'Ballot submitted successfully' });
    } catch (error) {
        console.error('Error saving ballot:', error);
        // Respond with an error message
        res.status(500).json({ message: 'Failed to submit ballot' });
    }
    
});

pvbApp.use(errorHandler.resourceNotFound);
pvbApp.use(errorHandler.pvbErrorHandler);

pvbApp.listen(port, console.log(`Server started @ port ${port}`));
