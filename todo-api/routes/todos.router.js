const express = require('express')

// Controllers
const { getAllTodos, createTodo } = require('../controllers/todos.controller')

const router = express.Router()

// Fetch all todos
router.get('/', getAllTodos);

// Create new todo
router.post('/', createTodo)

// Update todo (patch)
router.patch('/:id')

// Delete todo (delete)

module.exports = { todosRouter: router }

