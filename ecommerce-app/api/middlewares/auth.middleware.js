const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

dotenv.config({ path: './config.env' });

exports.checkJWT = catchAsync(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(new AppError('Invalid session!', 401));
	}

	// Validate token
	const decoded = jwt.verify(token, process.env.JWT_SECRET);

	const user = await User.findOne({
		attributes: { exclude: ['password'] },
		where: { id: decoded.id, status: 'available' },
	});

	if (!user) {
		return next(new AppError('User session is no longer valid', 401));
	}

	// Add data to req object
	req.currentUser = user;

	next();
});
