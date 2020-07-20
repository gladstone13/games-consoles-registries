const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('../app/routes/routes');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(routes);

app.use((req, resp, next) => {
    return resp.status(404).json({error: "not exists."});
});

app.use((error, req, resp, next) => {
    return resp.status(500).json({error: "server error.", error});
});

module.exports = app;