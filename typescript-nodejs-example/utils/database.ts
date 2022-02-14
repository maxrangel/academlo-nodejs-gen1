import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const db = new Sequelize({
	dialect: 'postgres',
	host: process.env.DB_HOST as string,
	username: process.env.DB_USERNAME as string,
	password: process.env.DB_PASSWORD as string,
	database: process.env.DB as string,
	port: +(process.env.DB_PORT as string),
	logging: false,
	dialectOptions:
		process.env.NODE_ENV === 'production'
			? {
					ssl: {
						require: true,
						rejectUnauthorized: false,
					},
			  }
			: {},
});

export { db };
