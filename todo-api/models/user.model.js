const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const User = db.define('users', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: DataTypes.INTEGER(),
	},
	name: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING(255),
		allowNull: false,
		unique: true,
	},
});

module.exports = { User };
