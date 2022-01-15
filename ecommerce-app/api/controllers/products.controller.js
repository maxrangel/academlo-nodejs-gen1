// Models
const { Product } = require('../models/product.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');

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
