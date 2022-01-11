const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const ProductInOrder = db.define(
	'productsInOrder',
	{
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		orderId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		productId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		status: {
			type: DataTypes.STRING(20),
			allowNull: 'false',
			// available | deleted
			defaultValue: 'available',
		},
	},
	{ timestamps: false }
);

module.exports = { ProductInOrder };
