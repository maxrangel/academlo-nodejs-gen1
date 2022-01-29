// Models
const { Product } = require('../models/product.model');
const { Cart } = require('../models/cart.model');
const { ProductInCart } = require('../models/productInCart.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObj');
const { AppError } = require('../utils/appError');
const { formatUserCart } = require('../utils/queryFormat');

exports.getUserCart = catchAsync(async (req, res, next) => {
	const { currentUser } = req;

	const cart = await Cart.findOne({
		attributes: { exclude: ['userId', 'status'] },
		where: { userId: currentUser.id, status: 'onGoing' },
		include: [
			{
				model: ProductInCart,
				attributes: { exclude: ['cartId', 'status'] },
				where: { status: 'active' },
				include: [
					{
						model: Product,
						attributes: {
							exclude: ['id', 'userId', 'price', 'quantity', 'status'],
						},
					},
				],
			},
		],
	});

	const formattedCart = formatUserCart(cart);

	res.status(200).json({
		status: 'success',
		data: { cart: formattedCart },
	});
});

exports.addProductToCart = catchAsync(async (req, res, next) => {
	const { product } = req.body;
	const { currentUser } = req;

	const filteredObj = filterObj(product, 'id', 'quantity');

	// Validate if quantity is less or equal to existing quantity
	const productExists = await Product.findOne({
		where: { id: filteredObj.id, status: 'active' },
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
		const totalPrice = +filteredObj.quantity * +productExists.price;

		const newCart = await Cart.create({ userId: currentUser.id, totalPrice });

		await ProductInCart.create({
			cartId: newCart.id,
			productId: filteredObj.id,
			quantity: filteredObj.quantity,
			price: productExists.price,
		});
	}

	// Update cart
	if (cart) {
		// Check if product already exists on the cart
		const productInCartExists = await ProductInCart.findOne({
			where: {
				cartId: cart.id,
				productId: filteredObj.id,
				status: 'active',
			},
		});

		if (productInCartExists) {
			return next(
				new AppError('You already added this product to the cart', 400)
			);
		}

		// Add it to the cart
		await ProductInCart.create({
			cartId: cart.id,
			productId: filteredObj.id,
			quantity: filteredObj.quantity,
			price: productExists.price,
		});

		// Calculate the cart total price
		const updatedTotalPrice =
			+cart.totalPrice + +filteredObj.quantity * +productExists.price;

		await cart.update({ totalPrice: updatedTotalPrice });
	}

	res.status(201).json({ status: 'success' });
});

exports.updateProductCart = catchAsync(async (req, res, next) => {
	const { currentUser } = req;
	const { productId, newQuantity } = req.body;

	// Find user's cart
	const userCart = await Cart.findOne({
		where: { userId: currentUser.id, status: 'onGoing' },
	});

	if (!userCart) {
		return next(new AppError('Invalid cart', 400));
	}

	// Find product in cart
	const productInCart = await ProductInCart.findOne({
		where: {
			productId,
			cartId: userCart.id,
			status: 'active',
		},
		include: [{ model: Product }],
	});

	if (!productInCart) {
		return next(new AppError('Invalid product', 400));
	}

	if (newQuantity > +productInCart.product.quantity) {
		return next(
			new AppError(
				`This product only has ${productInCart.product.quantity} items`,
				400
			)
		);
	}

	if (newQuantity === productInCart.quantity) {
		return next(
			new AppError('You already have that quantity in that product', 400)
		);
	}

	let updatedTotalPrice;

	// Check if user added or removed from the selected product
	// If user send 0 quantity to product, remove it from the cart
	if (newQuantity === 0) {
		updatedTotalPrice =
			+userCart.totalPrice - +productInCart.quantity * +productInCart.price;

		// Update quantity to product in cart
		await productInCart.update({ quantity: 0, status: 'removed' });
	} else if (newQuantity > +productInCart.quantity) {
		// New items were added
		updatedTotalPrice =
			+userCart.totalPrice +
			(newQuantity - +productInCart.quantity) * +productInCart.price;

		// Update quantity to product in cart
		await productInCart.update({ quantity: newQuantity });
	} else if (newQuantity < +productInCart.quantity) {
		// Items were removed from the cart
		updatedTotalPrice =
			+userCart.totalPrice -
			(+productInCart.quantity - newQuantity) * +productInCart.price;

		// Update quantity to product in cart
		await productInCart.update({ quantity: newQuantity });
	}

	// Calculate new total price
	await userCart.update({ totalPrice: updatedTotalPrice });

	res.status(204).json({ status: 'success' });
});

exports.purchaseOrder = catchAsync(async (req, res, next) => {
	// 1st part:
	// Get user's cart and get the products of the cart
	// Set Cart status to 'purchased'
	// Create a new order

	// [Promise]
	// const promises = products.map(async () => {
	// 	await Product.findAll()
	// })

	// await Promise.all(promises)

	// Loop through the products array, for each product
	// Set productInCart status to 'purchased', search for cartId and productId
	// Look for the Product (productId), substract and update the requested qty from the product's qty
	// Create productInOrder, pass orderId, productId, qty, price

	// 2nd part:
	// Send email to the user that purchased the order
	// The email must contain the total price and the list of products that it purchased

	res.status(200).json({ status: 'success' });
});

// Create a controller a function that gets all the user's orders
// The response must include all products that purchased