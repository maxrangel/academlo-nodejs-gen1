const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Routers
const { userRouter } = require('./routes/users.routes');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Utils
const { AppError } = require('./utils/appError');

// Init app
const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use('*', cors());

app.use(cookieParser())

// Endpoints
app.use('/api/v1/users', userRouter);

app.use('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = { app };
