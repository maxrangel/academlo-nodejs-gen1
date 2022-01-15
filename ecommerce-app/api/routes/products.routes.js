const express = require('express');

// Controller
const { createProduct } = require('../controllers/products.controller');

// Middlewares
const { checkJWT } = require('../middlewares/auth.middleware');

const router = express.Router();

// Get all products
// Create new product
router.route('/').get().post(checkJWT, createProduct);

// Get product's details
// Update product
// Remove product

module.exports = { productsRouter: router };
