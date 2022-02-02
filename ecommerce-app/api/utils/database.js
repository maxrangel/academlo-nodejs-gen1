const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const db = new Sequelize({
	dialect: 'postgres',
	host: process.env.DB_HOST,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB,
	port: process.env.DB_PORT,
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

module.exports = { db };
