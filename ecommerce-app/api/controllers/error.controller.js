// Utils
const { AppError } = require('../utils/appError');

const sendErrorDev = (err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const status = err.status || 'fail';

	return res.status(statusCode).json({
		status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (err, req, res, next) => {
	return res.status(err.statusCode).json({
		status: err.status,
		message: err.message || 'Something went wrong!',
	});
};

const handleDuplicateValues = err => {
	return new AppError('Email is already taken', 400);
};

const handleJWTInvalidSignature = () => {
	return new AppError('Please try login again!', 401);
};

const handleJWTExpiration = () => {
	return new AppError('Session expired, try log in again', 403);
};

const globalErrorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	// Validate if its production environment
	if (process.env.NODE_ENV === 'development') {
		sendErrorDev(err, req, res, next);
	} else if (process.env.NODE_ENV === 'production') {
		let error = { ...err };

		// Catch known errors
		if (err.name === 'SequelizeUniqueConstraintError')
			error = handleDuplicateValues();
		if (err.name === 'JsonWebTokenError') error = handleJWTInvalidSignature();
		if (err.name === 'TokenExpiredError') error = handleJWTExpiration();

		sendErrorProd(error, req, res, next);
	}
};

module.exports = { globalErrorHandler };
