const dotenv = require('dotenv');

// Utils
const { db } = require('./utils/database');

// Express app
const { app } = require('./app');

dotenv.config({ path: './config.env' });

db.sync()
	.then(() => {
		console.log('Database connected');
		startServer();
	})
	.catch(err => console.log(err));

const startServer = () => {
	const PORT = process.env.PORT || 4000;

	app.listen(PORT, () => {
		console.log(`To Do API running on port ${PORT}!`);
	});
};
