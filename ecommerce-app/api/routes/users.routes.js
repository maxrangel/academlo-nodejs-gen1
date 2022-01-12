const express = require('express');
const { body } = require('express-validator');

// Controllers
const {
	createUser,
	getUserById,
	updateUser,
	disableUserAccount,
} = require('../controllers/users.controller');

const router = express.Router();

// Get - Get user profile

// Get - Get user by id
// Patch - Update user profile (email, name)
// Delete - Disable user account
router
	.route('/:id')
	.get(getUserById)
	.patch(updateUser)
	.delete(disableUserAccount);

// Post - Create new user
router.post(
	'/',
	[
		body('name').isString().notEmpty().withMessage('Enter a valid name'),
		body('email').isEmail().notEmpty().withMessage('Enter a valid email'),
		body('password')
			.isString()
			.notEmpty()
			.withMessage(`Password can't be empty`)
			.isAlphanumeric()
			.withMessage(`Password must include letters and numbers`)
			.isLength(8)
			.withMessage('Password must be 8 characters long'),
	],
	createUser
);

module.exports = { userRouter: router };
