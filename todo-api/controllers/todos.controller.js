// Models
const { Todo } = require('../models/todo.model');

exports.getAllTodos = async (req, res, next) => {
	try {
		// Get data from db

		// SELECT * FROM todos
		const todos = await Todo.findAll();

		res.status(200).json({
			status: 'success',
			data: { todos },
		});
	} catch (error) {
		console.log(error);
	}
};

exports.getTodoById = async (req, res, next) => {
	const { id } = req.params;

	try {
		// SELECT * FROM todos WHERE id = id
		const todo = await Todo.findOne({ where: { id } });

		res.status(200).json({
			status: 'success',
			data: { todo },
		});
	} catch (error) {
		console.log(error);
	}
};

exports.createTodo = async (req, res, next) => {
	// Get todo content from req.body
	const { content } = req.body;

	try {
		// INSERT INTO todos (content) VALUES ('Hello')
		const newTodo = await Todo.create({ content });

		// Send newTodo to the client
		res.status(201).json({
			status: 'success',
			data: { newTodo },
		});
	} catch (error) {
		console.log(error);
	}
};

exports.updateTodo = async (req, res, next) => {
	const { id } = req.params;
	const { content } = req.body;

	try {
		// Find ToDo with the given ID
		// Set new value of content

		// UPDATE todos SET content = 'fadsda' WHERE id = id
		await Todo.update({ content }, { where: { id } });

		// Return a response to the user
		res.status(204).json({
			status: 'success',
		});
	} catch (error) {
		console.log(error);
	}
};

exports.deleteTodo = async (req, res, next) => {
	const { id } = req.params;

	try {
    // DELETE FROM todos WHERE id = id
    await Todo.destroy({ where: { id } })
    
		res.status(204).json({
			status: 'success',
		});
	} catch (error) {
		console.log(error);
	}
};
