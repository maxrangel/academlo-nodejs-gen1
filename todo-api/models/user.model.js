const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const User = db.define(
	'users',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING(15),
			allowNull: false,
			defaultValue: 'available',
		},
	},
	{ timestamps: false }
);

module.exports = { User };
