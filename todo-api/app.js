const express = require('express');

// Routers
const { todosRouter } = require('./routes/todos.router');

// Init app
const app = express();

app.use(express.urlencoded());
app.use(express.json());

// Endpoints
app.use('/api/v1/todos', todosRouter);

module.exports = { app };
