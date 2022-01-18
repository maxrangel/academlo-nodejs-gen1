const { Op } = require('sequelize');

// Models
const { Product } = require('../models/product.model');
const { User } = require('../models/user.model');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

exports.getAllProducts = catchAsync(async (req, res, next) => {
	const products = await Product.findAll({
		where: { status: 'active' },
		include: [{ model: User, attributes: { exclude: ['password'] } }],
	});

	res.status(200).json({
		status: 'success',
		data: { products },
	});
});

exports.getProductDetails = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const product = await Product.findOne({
		where: { id },
		include: [{ model: User, attributes: { exclude: ['password'] } }],
	});

	if (!product) {
		return next(new AppError('No product found', 404));
	}

	res.status(200).json({
		status: 'success',
		data: { product },
	});
});

exports.createProduct = catchAsync(async (req, res, next) => {
	const { name, description, price, quantity, category } = req.body;
	const userId = req.currentUser.id;

	const newProduct = await Product.create({
		name,
		description,
		price,
		quantity,
		category,
		userId,
	});

	res.status(201).json({ status: 'success', data: { newProduct } });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { name, description, price, quantity, category } = req.body;

	// SELECT * FROM products WHERE status = 'active' OR status = 'soldOut'
	const product = await Product.findOne({
		where: { id, status: { [Op.or]: ['active', 'soldOut'] } },
	});

	if (!product) {
		return next(new AppError('No product found', 404));
	}

	await product.update({
		name,
		description,
		price,
		quantity: product.quantity + quantity,
		category,
	});

	res.status(204).json({ status: 'success' });
});

exports.disableProduct = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const product = await Product.findOne({
		where: { id, status: { [Op.or]: ['active', 'soldOut'] } },
	});

	if (!product) {
		return next(new AppError('No product found', 404));
	}

	await product.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});
