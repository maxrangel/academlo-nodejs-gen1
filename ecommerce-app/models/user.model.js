const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const User = db.define(
	'users',
	{
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		role: {
			type: DataTypes.STRING(20),
			allowNull: false,
			defaultValue: 'standard',
		},
		status: {
			type: DataTypes.STRING(20),
			allowNull: false,
			defaultValue: 'available',
		},
	},
	{ timestamps: false }
);

module.exports = { User };
