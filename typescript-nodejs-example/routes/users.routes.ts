import express from 'express';

// Controllers
import {
	createUser,
	getUserById,
	updateUser,
	disableUserAccount,
	loginUser,
} from '../controllers/users.controller';

// Middlewares
import { protectSession } from '../middlewares/auth.middleware';
import {
	createUserValidations,
	updateUserValidations,
	loginUserValidations,
	validateResult,
} from '../middlewares/validators.middleware';

const router = express.Router();

// Post - Create new user
// Patch - Update user profile (email, name)
// Delete - Disable user account

router.post('/login', loginUserValidations, validateResult, loginUser);

router
	.route('/')
	.post(createUserValidations, validateResult, createUser)
	.patch(
		protectSession,
		// protectUser,
		updateUserValidations,
		validateResult,
		updateUser
	)
	.delete(
		protectSession,
		// protectUser,
		disableUserAccount
	);

// Get - Get user by id
router.get('/:id', getUserById);

export { router as userRouter };
