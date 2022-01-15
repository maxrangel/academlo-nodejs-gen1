const express = require('express');

// Router
const { userRouter } = require('./routes/user.routes');

const app = express();

app.use(express.urlencoded());
app.use(express.json());

// Endpoints
app.use('/api/v1/users', userRouter);

module.exports = { app };
