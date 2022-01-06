// Utils
const { db } = require('./utils/database');

// Express app
const { app } = require('./app');

db.sync()
	.then(() => {
		console.log('Database connected');
		startServer();
	})
	.catch(err => console.log(err));

const startServer = () => {
	app.listen(4000, () => {
		console.log('To Do API running!!!!');
	});
};
