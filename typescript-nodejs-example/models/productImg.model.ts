import { DataTypes } from 'sequelize';
import { db } from '../utils/database';

const ProductImg = db.define(
	'productImgs',
	{
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		productId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		imgPath: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
    status: {
			type: DataTypes.STRING(20),
			allowNull: 'false',
			// active | deleted | unavailable
			defaultValue: 'active',
		},
	},
	{ timestamps: false }
);

export { ProductImg };