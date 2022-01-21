const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError');

// User routes validations
exports.createUserValidations = [
	body('name').isString().notEmpty().withMessage('Enter a valid name'),
	body('email').isEmail().notEmpty().withMessage('Enter a valid email'),
	body('password')
		.isAlphanumeric()
		.withMessage(`Password must include letters and numbers`)
		.isLength({ min: 6, max: 20 })
		.withMessage('Password must be 8 characters long'),
];

exports.updateUserValidations = [
	body('name').notEmpty().withMessage(`Name can't be empty`),
	body('email').isEmail().notEmpty().withMessage('Enter a valid email'),
];

exports.loginUserValidations = [
	body('email').isEmail().notEmpty().withMessage('Credentials are not valid'),
	body('password').notEmpty().withMessage('Credentials are not valid'),
];

// End: User routes validations

// Product routes validations
exports.createProductValidations = [
	// Name can't be empty
	body('name').isString().notEmpty().withMessage('Enter a valid name'),
	// Description can't be empty
	body('description')
		.isString()
		.notEmpty()
		.withMessage('Enter a valid description'),
	// Price must be a decimal
	body('price')
		.isDecimal()
		.custom(value => value > 0)
		.withMessage('Enter a valid price'),
	// Quantity must be a number
	body('quantity')
		.isNumeric()
		.custom(value => +value > 0)
		.withMessage('Enter a valid quantity'),
	// Category can't be empty
	body('category').isString().notEmpty().withMessage('Enter a valid category'),
];

// End: Product routes validations

// Order routes validations
exports.updateProductCartValidations = [
	body('newQuantity')
		.isNumeric()
		.custom(value => value >= 0)
		.withMessage('Enter a valid quantity'),
];

// End: Order routes validations

exports.validateResult = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const message = errors
			.array() // [ { msg, ... }, { msg, ... }, { msg, ... } ]
			.map(({ msg }) => msg) // [msg, msg, msg]
			.join('. '); // 'msg. msg. msg'

		return next(new AppError(message, 400));
	}

	next();
};
