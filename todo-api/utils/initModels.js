// Models
const { User } = require('../models/user.model');
const { Todo } = require('../models/todo.model');

const initModels = () => {
	// 1 User <--> M Todo's
	User.hasMany(Todo);
	Todo.belongsTo(User);
};

module.exports = { initModels };
