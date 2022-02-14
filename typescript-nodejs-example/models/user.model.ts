import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcryptjs';

import { AppError } from '../utils/appError';
import { db } from '../utils/database';

export interface UserInstance extends Model {
	id: number;
	name: string;
	email: string;
	password: string;
	role: 'standard' | 'admin';
	status: 'available' | 'deleted' | 'banned';
}

const User = db.define<UserInstance>(
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
			// validate: {
			// 	customValidation(val) {
			// 		if (val.length < 5) {
			// 			console.log('Not a valid name!!');
			// 			throw new AppError('Name must be at least 2 characters long', 400);
			// 		}
			// 	},
			// },
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
			// available | deleted | banned
			defaultValue: 'available',
			validate: {
				checkStatus(val: string) {
					const status = ['available', 'deleted', 'banned'];

					if (!status.includes(val))
						throw new AppError('Not a valid status!', 500);
				},
			},
		},
	},
	{ timestamps: false }
);

User.addHook('beforeCreate', async (user: UserInstance, options) => {
	const salt = await bcrypt.genSalt(12);
	const hashedPassword = await bcrypt.hash(user.password, salt);

	user.password = hashedPassword;
});

export { User };
