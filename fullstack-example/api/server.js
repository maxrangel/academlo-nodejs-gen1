// Utils
const { db } = require('./utils/database');
const { createSocketServer } = require('./utils/socketServer');

// Express app
const { app } = require('./app');

db.sync()
	.then(() => {
		console.log('Database connected');
	})
	.catch(err => console.log(err));

const server = app.listen(4000, () => {
	console.log('To Do API running!!!!');
});

createSocketServer(server);
