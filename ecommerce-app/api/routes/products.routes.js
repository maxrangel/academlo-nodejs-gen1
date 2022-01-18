const express = require('express');

// Controller
const {
	createProduct,
	getAllProducts,
	getProductDetails,
	updateProduct,
	disableProduct,
} = require('../controllers/products.controller');

// Middlewares
const {
	protectSession,
	protectProductOwner,
} = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protectSession);

// Get all products
// Create new product
router.route('/').get(getAllProducts).post(createProduct);

// Get product's details
// Update product
// Remove product
router
	.route('/:id')
	.get(getProductDetails)
	.patch(protectProductOwner, updateProduct)
	.delete(protectProductOwner, disableProduct);

module.exports = { productsRouter: router };
