'use strict';

const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const elasticRouter = require('./app/routes/elastic');

app.use(bodyParser.json());
app.use('/elastic', elasticRouter);
app.use(express.static(`${__dirname}/public`));

app.listen(config.app.port, () => {
    console.log("Server is up and running on port number http://localhost:" + config.app.port);
});