import express from 'express';

// Controllers
import {
	addProductToCart,
	getUserCart,
	updateProductCart,
	purchaseOrder,
	getAllOrders,
} from '../controllers/orders.controller';

// Middlewares
import {
	updateProductCartValidations,
	validateResult,
} from '../middlewares/validators.middleware';
import { protectSession } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(protectSession);

// Get user's orders
router.get('/', getAllOrders);

// Get user's cart
router.get('/get-cart', getUserCart);

// Add product to cart
router.post('/add-product-to-cart', addProductToCart);

// Update cart product quantity
router.patch(
	'/update-cart-product',
	updateProductCartValidations,
	validateResult,
	updateProductCart
);

// Remove product from cart

// Create order
router.get('/purchase-order', purchaseOrder);
 
export { router as ordersRouter };
