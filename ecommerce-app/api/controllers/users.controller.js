const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Models
const { User } = require('../models/user.model');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

exports.getUserById = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await User.findOne({
		attributes: { exclude: ['password'] },
		where: { id },
	});

	if (!user) {
		return next(new AppError('User not found', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			user,
		},
	});
});

exports.createUser = catchAsync(async (req, res, next) => {
	const { name, email, password, role } = req.body;

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const message = errors
			.array()
			.map(({ msg }) => msg)
			.join('. ');

		return next(new AppError(message, 400));
	}

	const salt = await bcrypt.genSalt(12);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = await User.create({
		name,
		email,
		password: hashedPassword,
		role: role || 'standard',
	});

	// Remove password from response
	newUser.password = undefined;

	res.status(201).json({
		status: 'success',
		data: { user: newUser },
	});
});

exports.updateUser = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { name, email } = req.body;

	if (!name || !email) {
		return next(new AppError('Must provide name and email', 400));
	}

	const user = await User.findOne({ where: { id } });

	if (!user) {
		return next(new AppError('No user found with this id', 404));
	}

	await user.update({ name, email });

	res.status(204).json({ status: 'success' });
});

exports.disableUserAccount = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await User.findOne({ where: { id } });

	if (!user) {
		return next(new AppError('User not found', 404));
	}

	await user.update({ status: 'disabled' });

	res.status(204).json({ status: 'success' });
});
