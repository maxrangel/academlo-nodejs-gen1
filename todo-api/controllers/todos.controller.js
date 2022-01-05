// Models
const { Todo } = require('../models/todo.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

exports.getAllTodos = catchAsync(async (req, res, next) => {
	// Get data from db
	// SELECT * FROM todos
	const todos = await Todo.findAll();

	res.status(200).json({
		status: 'success',
		data: { todos },
	});
});

exports.getTodoById = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	// SELECT * FROM todos WHERE id = id
	const todo = await Todo.findOne({ where: { id } });

	if (!todo) {
		return next(new AppError(`ToDo doesn't exist`, 404));
	}

	res.status(200).json({
		status: 'success',
		data: { todo },
	});
});

exports.createTodo = catchAsync(async (req, res, next) => {
	// Get todo content from req.body
	const { content } = req.body;

	// INSERT INTO todos (content) VALUES ('Hello')
	const newTodo = await Todo.create({ content });

	// Send newTodo to the client
	res.status(201).json({
		status: 'success',
		data: { newTodo },
	});
});

exports.updateTodo = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { content } = req.body;

	// Find ToDo with the given ID
	// SELECT * FROM todos WHERE id = id
	const todoExists = await Todo.findOne({ where: { id } });

	if (!todoExists) {
		// Return error message
		return next(new AppError('To Do does not exists', 404));
	}

	// Set new value of content

	// UPDATE todos SET content = 'fadsda' WHERE id = id

	// await Todo.update({ content }, { where: { id } });
	await todoExists.update({ content });

	// Return a response to the user
	res.status(204).json({
		status: 'success',
	});
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const todoExists = await Todo.findOne({ where: { id } });

	if (!todoExists) {
		return next(
			new AppError(`Can't delete ToDo because it doesn't exists`, 404)
		);
	}

	// await Todo.destroy({ where: { id } });
	await todoExists.destroy();

	res.status(204).json({
		status: 'success',
	});
});
