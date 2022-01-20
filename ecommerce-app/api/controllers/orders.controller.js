// Models
const { Product } = require('../models/product.model');
const { Cart } = require('../models/cart.model');
const { ProductInCart } = require('../models/productInCart.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObj');
const { AppError } = require('../utils/appError');

exports.getUserCart = catchAsync(async (req, res, next) => {
	const { currentUser } = req;

	const cart = await Cart.findOne({
		where: { userId: currentUser.id, status: 'onGoing' },
		include: [{ model: ProductInCart, include: [{ model: Product }] }],
	});

	res.status(200).json({ status: 'success', data: { cart } });
});

exports.addProductToCart = catchAsync(async (req, res, next) => {
	const { product } = req.body;
	const { currentUser } = req;

	const filteredObj = filterObj(
		product,
		'id',
		'description',
		'quantity',
		'price'
	);

	// Validate if quantity is less or equal to existing quantity
	const productExists = await Product.findOne({
		where: { id: filteredObj.id },
	});

	if (!productExists || filteredObj.quantity > productExists.quantity) {
		return next(
			new AppError(
				'Product does not exists or it exceeds the available quantity',
				400
			)
		);
	}

	// Check if current user already has a cart
	const cart = await Cart.findOne({
		where: { userId: currentUser.id, status: 'onGoing' },
	});

	// Create new cart
	if (!cart) {
		const totalPrice = +filteredObj.quantity * +filteredObj.price;

		const newCart = await Cart.create({ userId: currentUser.id, totalPrice });

		await ProductInCart.create({
			cartId: newCart.id,
			productId: filteredObj.id,
			quantity: filteredObj.quantity,
			price: filteredObj.price,
		});
	}

	// Update cart
	if (cart) {
		// Check if product already exists on the cart
		const productInCartExists = await ProductInCart.findOne({
			cartId: cart.id,
			productId: filteredObj.id,
		});

		if (productInCartExists) {
			// Update quantity
			await productInCartExists.update({ quantity: filteredObj.quantity });
		}

		if (!productInCartExists) {
			// Add it to the cart
			await ProductInCart.create({
				cartId: cart.id,
				productId: filteredObj.id,
				quantity: filteredObj.quantity,
				price: filteredObj.price,
			});
		}

		const updatedCartTotalPrice =
			cart.totalPrice + filteredObj.quantity * filteredObj.price;

		await cart.update({ totalPrice: updatedCartTotalPrice });
	}

	res.status(201).json({ status: 'success' });
});
