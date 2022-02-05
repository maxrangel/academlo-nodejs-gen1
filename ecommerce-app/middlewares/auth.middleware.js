const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { Op } = require('sequelize');
const { promisify } = require('util');

// require('crypto').randomBytes(64).toString('hex')

// Models
const { User } = require('../models/user.model');
const { Product } = require('../models/product.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

dotenv.config({ path: './config.env' });

exports.protectSession = catchAsync(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (!token) {
		return next(new AppError('Invalid session!', 401));
	}

	// Validate token
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	if (!decoded) return next(new AppError('Invalid token', 401));

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

exports.protectProductOwner = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { currentUser } = req;

	// Find product by id
	// SELECT * FROM products WHERE status = 'active' OR status = 'soldOut'
	const product = await Product.findOne({
		where: { id, status: { [Op.or]: ['active', 'soldOut'] } },
	});

	if (!product) {
		return next(new AppError('No product found', 404));
	}

	// Validate currentUser id with the given product
	if (product.userId !== currentUser.id) {
		return next(new AppError('You do not own this product', 401));
	}

	req.product = product;
	next();
});

exports.protectUser = catchAsync(async (req, res, next) => {
	const { currentUser } = req;
	const { id } = req.params;

	if (+currentUser.id !== +id) {
		return next(new AppError('You do not own this account', 401));
	}

	next();
});
