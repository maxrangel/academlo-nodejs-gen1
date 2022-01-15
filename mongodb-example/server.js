// Utils
const { db } = require('./utils/database');

const { app } = require('./app');

db.then(() => {
	console.log('MongoDB connected!');
}).catch(err => console.log(err));

app.listen(5000, () => {
	console.log('API running!');
});
