const { DataTypes } = require('sequelize');

// Utils
const { db } = require('../utils/database');

const ProductInCart = db.define(
	'productsInCart',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		cartId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		productId: { type: DataTypes.INTEGER, allowNull: false,  },
		quantity: { type: DataTypes.INTEGER, allowNull: false },
		price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING(20),
			allowNull: false,
			// active | removed | purchased
			defaultValue: 'active',
		},
	},
	{ timestamps: false }
);

module.exports = { ProductInCart };
