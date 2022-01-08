const globalErrorHandler = (err, req, res, next) => {
	// const globalErrorHandler = (err === AppError{}, req, res, next) => {

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		stack: err.stack,
	});
};

module.exports = { globalErrorHandler };

// RELATIONAL -> SQL, MYSQL, POSTGRES 
// NO RELATIONAL -> MONGO, FIREBASE

// TABLES =/= | COLLECTIONS

// users: [
// 	{},
// 	{},
// 	{},
// ]