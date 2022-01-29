const express = require('express');

// Controller
const {
	createProduct,
	getAllProducts,
	getProductDetails,
	updateProduct,
	disableProduct,
	getUserProducts,
} = require('../controllers/products.controller');

// Middlewares
const {
	protectSession,
	protectProductOwner,
} = require('../middlewares/auth.middleware');
const {
	createProductValidations,
	validateResult,
} = require('../middlewares/validators.middleware');

const { multerUpload } = require('../utils/multer'); // multipart/form-data

const router = express.Router();

router.use(protectSession);

// Get all products
// Create new product
router.route('/').get(getAllProducts).post(
	multerUpload.fields([{ name: 'productImgs', maxCount: 2 }]),
	// multerUpload.single('productImg'),
	createProductValidations,
	validateResult,
	createProduct
);

router.get('/user-products', getUserProducts);

// Get product's details
// Update product
// Remove product
router
	.route('/:id')
	.get(getProductDetails)
	.patch(protectProductOwner, updateProduct)
	.delete(protectProductOwner, disableProduct);

module.exports = { productsRouter: router };
