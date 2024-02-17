const express = require('express');
const errorHandler = require('./handlers');

const pvbApp = express();
const port = 4000;

pvbApp.get('/', (req, res) => {
    res.json({ text: 'hello world!' });
});

pvbApp.use(errorHandler.resourceNotFound);
pvbApp.use(errorHandler.pvbErrorHandler);

pvbApp.listen(port, console.log(`Server started @ port ${port}`));

