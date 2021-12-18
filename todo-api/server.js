// Utils
const { db } = require('./utils/database');

// Model
const { User } = require('./models/user.model');

// Express app
const { app } = require('./app');

db.sync()
	.then(() => {
		console.log('Database connected');

		// Query
		// SELECT * FROM users
		return User.findAll();
	})
	.then(res => {
		console.log(res);
	})
	.catch(err => console.log(err));

app.listen(4000, () => {
	console.log('To Do API running!');
});
