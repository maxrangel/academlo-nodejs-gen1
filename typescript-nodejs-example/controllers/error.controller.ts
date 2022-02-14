import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'sequelize';

// Utils
import { AppError } from '../utils/appError';

const sendErrorDev = (
	err: AppError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = err.statusCode || 500;
	const status = err.status || 'fail';

	return res.status(statusCode).json({
		status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (
	err: AppError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return res.status(err.statusCode).json({
		status: err.status,
		message: err.message || 'Something went wrong!',
	});
};

const handleDuplicateValues = () => {
	return new AppError('Email is already taken', 400);
};

const handleJWTInvalidSignature = () => {
	return new AppError('Please try login again!', 401);
};

const handleJWTExpiration = () => {
	return new AppError('Session expired, try log in again', 403);
};

const handleSequelizeValidationError = (error: ValidationError) => {
	const message = error.errors.map(({ message }) => message).join('. ');
	return new AppError(message, 500);
};

const globalErrorHandler = (
	err: AppError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
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
		else if (err.name === 'JsonWebTokenError')
			error = handleJWTInvalidSignature();
		else if (err.name === 'TokenExpiredError') error = handleJWTExpiration();
		else if (err.name === 'SequelizeValidationError')
			error = handleSequelizeValidationError(err);

		sendErrorProd(error, req, res, next);
	}
};

export { globalErrorHandler };
