const express = require('express');
const cors = require('cors');

// Routers

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Init app
const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use('*', cors());

// Endpoints

app.use(globalErrorHandler);

module.exports = { app };
