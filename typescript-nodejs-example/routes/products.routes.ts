import express from 'express';

// Controller
import {
	createProduct,
	getAllProducts,
	getProductDetails,
	updateProduct,
	disableProduct,
	getUserProducts,
} from '../controllers/products.controller';

// Middlewares
import {
	protectSession,
	protectProductOwner,
} from '../middlewares/auth.middleware';
import {
	createProductValidations,
	validateResult,
} from '../middlewares/validators.middleware';

import { multerUpload } from '../utils/multer'; // multipart/form-data

const router = express.Router();

router.use(protectSession);

// Get all products
// Create new product
router
	.route('/')
	.get(getAllProducts)
	.post(
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

export { router as productsRouter };
