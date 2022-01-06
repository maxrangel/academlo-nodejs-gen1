const express = require('express');

// Controllers
const {
	getAllTodos,
	getTodoById,
	createTodo,
	updateTodo,
	deleteTodo,
} = require('../controllers/todos.controller');

const router = express.Router();

router.route('/').get(getAllTodos).post(createTodo);

router.route('/:id').get(getTodoById).patch(updateTodo).delete(deleteTodo);

// Fetch all todos
// router.get('/', getAllTodos);

// Create new todo
// router.post('/', createTodo)

// Update todo (patch)
// router.patch('/:id', updateTodo)

// Delete todo (delete)
// router.delete('/:id', deleteTodo)

module.exports = { todosRouter: router };
