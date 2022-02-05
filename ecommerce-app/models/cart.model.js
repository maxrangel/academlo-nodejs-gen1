const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Cart = db.define(
	'cart',
	{
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		totalPrice: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING(20),
			allowNull: 'false',
			// onGoing | deleted | cancelled | purchased
			defaultValue: 'onGoing',
		},
	},
	{ timestamps: false }
);

module.exports = { Cart };
