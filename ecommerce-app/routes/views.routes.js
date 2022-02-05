const express = require('express');

const { renderIndex } = require('../controllers/views.controller');

const router = express.Router();

router.get('/', renderIndex);
router.get('/auth', renderIndex);
router.get('/add-product', renderIndex);
router.get('/cart', renderIndex);
router.get('/orders', renderIndex);
router.get('/profile', renderIndex);

module.exports = { viewsRouter: router };
