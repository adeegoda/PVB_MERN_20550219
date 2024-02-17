require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers');
const db = require('./models');

const pvbApp = express();
const port = process.env.PORT;

pvbApp.get('/', (req, res) => {
    res.json({ text: 'hello world!' });
});

pvbApp.use(errorHandler.resourceNotFound);
pvbApp.use(errorHandler.pvbErrorHandler);

db.connectPVBDatabase();
pvbApp.listen(port, console.log(`Server started @ port ${port}`));

