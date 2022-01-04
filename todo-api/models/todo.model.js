const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

// Define TODO model
const Todo = db.define('todos', {
	// Define attributes
	id: {
		// Define datatypes
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
		allowNull: false, // NOT NULL
	},
	content: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

// Export model
module.exports = { Todo };
