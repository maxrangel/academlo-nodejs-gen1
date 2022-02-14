import { DataTypes } from 'sequelize';

import { db } from '../utils/database';
import { AppError } from '../utils/appError';

const Product = db.define(
	'products',
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
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING(255),
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
			validate: {
				validQuantity(val) {
					if (val < 0) throw new AppError('Not a valid quantity', 500);
				},
			},
		},
		category: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING(20),
			allowNull: false,
			// active | deleted | soldOut
			defaultValue: 'active',
			validate: {
				checkStatus(val) {
					const status = ['active', 'deleted', 'soldOut'];

					if (!status.includes(val))
						throw new AppError('Not a valid status', 500);
				},
			},
		},
	},
	{ timestamps: false }
);

Product.addHook('afterUpdate', async (product, options) => {
	if (product.status === 'soldOut' && +product.quantity > 0) {
		await product.update({ status: 'active' });
	}

	if (product.quantity === 0) {
		await product.update({ status: 'soldOut' });
	}
});

export { Product };
