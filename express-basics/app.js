const path = require('path');
const express = require('express');

// Init app
const app = express();

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());

// Endpoint / -> render home page
app.get('/', (req, res) => {
	const indexPath = path.join(__dirname, 'views', 'index.html');

	res.status(200).sendFile(indexPath);
	// res.status(200).json({ status: 'success' });
});

// Endpoint /login GET -> render login page
app.get('/login', () => {});

// Endpoint /login POST -> get data from client
app.post('/login', (req, res) => {
	// Log the email and password from the client
	// { email, password }
	// Compare the email with john@test.com
	// Compare if password is pass1234
	// If success, send 200 status to client
	// If the credentials are wrong, send 500 status to client
});

// Run server on port 4000
const PORT = 4000;

app.listen(PORT, () => {
	console.log(`Express app running on port: ${PORT}`);
});
