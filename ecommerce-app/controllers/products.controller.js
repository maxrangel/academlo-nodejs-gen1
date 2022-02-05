const { ref, uploadBytes } = require('firebase/storage');

// Models
const { Product } = require('../models/product.model');
const { ProductImg } = require('../models/productImg.model');
const { User } = require('../models/user.model');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const { filterObj } = require('../utils/filterObj');
const { firebaseStorage } = require('../utils/firebase');

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
		include: [
			{ model: User, attributes: { exclude: ['password'] } },
			{ model: ProductImg },
		],
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
	const { currentUser } = req;

	const newProduct = await Product.create({
		name,
		description,
		price,
		quantity,
		category,
		userId: currentUser.id,
	});

	// Save imgs path
	const imgsPromises = req.files.productImgs.map(async img => {
		const imgName = `/img/products/${newProduct.id}-${currentUser.id}-${img.originalname}`;
		const imgRef = ref(firebaseStorage, imgName);

		const result = await uploadBytes(imgRef, img.buffer);

		await ProductImg.create({
			productId: newProduct.id,
			imgPath: result.metadata.fullPath,
		});
	});

	await Promise.all(imgsPromises)

	res.status(201).json({ status: 'success', data: { newProduct } });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
	const { product } = req;

	const filteredObj = filterObj(
		req.body,
		'name',
		'description',
		'price',
		'quantity',
		'category'
	);

	if (filteredObj.quantity && filteredObj.quantity < 0) {
		return next(new AppError('Invalid product quantity', 400));
	}

	await product.update({
		...filteredObj,
	});

	res.status(204).json({ status: 'success' });
});

exports.disableProduct = catchAsync(async (req, res, next) => {
	const { product } = req;

	await product.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

exports.getUserProducts = catchAsync(async (req, res, next) => {
	// Based on req.currentUser, get the user's products based on its id
	const { currentUser } = req;

	const products = await Product.findAll({ where: { userId: currentUser.id } });

	res.status(200).json({
		status: 'success',
		data: { products },
	});
});
