const express = require('express');

// Controllers
const { getAllUsers, createUser } = require('../controllers/user.controller');

const router = express();

router.route('/').get(getAllUsers).post(createUser).patch().delete();

module.exports = { userRouter: router };
