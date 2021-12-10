const path = require('path');
const express = require('express');

// Init app
const app = express();

app.use(express.static(path.join(__dirname, 'views')));

// 				 Data channel
// JSON -> =========== -> body = { }
app.use(express.urlencoded());
app.use(express.json());

// Endpoint / -> render home page
app.get('/', (req, res) => {
	const indexPath = path.join(__dirname, 'views', 'index.html');

	res.status(200).sendFile(indexPath);
	// res.status(200).json({ status: 'success' });
});

// Endpoint /login GET -> render login page
app.get('/login', (req, res) => {
	const loginPath = path.join(__dirname, 'views', 'login.html');
	res.status(200).sendFile(loginPath);
});

// Endpoint /login POST -> get data from client
app.post('/login', (req, res) => {
	// Log the email and password from the client
	const { email, password } = req.body;

	// const email = req.body.email;
	// const password = req.body.password;

	// Compare the email with john@test.com and password is pass1234
	if (email === 'john@test.com' && password === 'pass1234') {
		// If success, send 200 status to client
		return res.status(200).json({
			status: 'success',
			data: { message: 'You are logged in' },
		});
	}

	// If the credentials are wrong, send 500 status to client
	res.status(500).json({ status: 'error', data: { message: 'Unauthorized' } });
});

// Middleware

// Run server on port 4000
const PORT = 4000;

app.listen(PORT, () => {
	console.log(`Express app running on port: ${PORT}`);
});
