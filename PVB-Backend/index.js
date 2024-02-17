require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers');
const db = require('./models');
const routes = require('./routes');

const pvbApp = express();
const port = process.env.PORT;

pvbApp.get('/', (req, res) => {
    res.json({ text: 'Hello from Anji! this is a GET request' });
});

pvbApp.use('/api/eballots', routes.eballot);

pvbApp.post('/', (req, res) => {
    res.json({ text: 'Hello from Anji! This is a POST request!' });
});

pvbApp.use(errorHandler.resourceNotFound);
pvbApp.use(errorHandler.pvbErrorHandler);

pvbApp.listen(port, console.log(`Server started @ port ${port}`));
