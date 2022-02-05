const dotenv = require('dotenv');

// Utils
const { db } = require('./utils/database');
const { initModels } = require('./utils/initModels');

// Express app
const { app } = require('./app');

dotenv.config({ path: './config.env' });

// Model relations

initModels();

db.authenticate()
	.then(() => console.log('DB authenticated'))
	.catch(err => console.log(err));

db.sync()
	.then(() => {
		console.log('Database connected');
		startServer();
	})
	.catch(err => console.log(err));

const startServer = () => {
	const PORT = process.env.PORT || 4000;

	app.listen(PORT, () => {
		console.log(`Ecommerce API running on port ${PORT}!!!!`);
	});
};
