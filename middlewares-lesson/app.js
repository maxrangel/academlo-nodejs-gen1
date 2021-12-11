const express = require('express');

// Init app
const app = express();

app.use(express.urlencoded());
app.use(express.json());

const authMiddleware = (req, res, next) => {
	console.log(
		'Middleware #2: Validar datos del usuario (que tenga el nivel de acceso)'
	);

	next();
};

app.get(
	'/',
	(req, res, next) => {
		console.log('Middleware #1: Validar los datos del req.body');

		next();
	},
	authMiddleware,
	(req, res, next) => {
		// Save, fetch, update data...

		res.status(200).json({ status: 'success' });
	}
);

app.post('/new-todo', authMiddleware, (req, res, next) => {
	console.log(req.body);
	res.status(200).json({ status: 'A new post has been created' });
});

app.listen(4000, () => {
	console.log('Express app running!');
});
