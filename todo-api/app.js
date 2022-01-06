const express = require('express');
const cors = require('cors');

// Routers
const { todosRouter } = require('./routes/todos.router');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Init app
const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use('*', cors());

// Endpoints
app.use('/api/v1/todos', todosRouter);

app.use(globalErrorHandler);

module.exports = { app };
