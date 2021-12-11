const http = require('http');

const server = http.createServer((req, res) => {
	// Recibimos una petición
	const url = req.url;
	const method = req.method;

	// HTTP verbs: GET, POST, PATCH, PUT, DELETE

	// Server side rendering -> RESTful API

	// Endpoint -> Es una URL expuesta por nuestro por nuestro servidor para recibir peticiones
	if (url === '/') {
		res.setHeader('Content-Type', 'text/html');
		res.write('<html>');
		res.write('<h1>Hola desde el servidor</h1>');
		res.write('<p>Viva Angular!</p>');
		res.write('</html>');

		return res.end();
	} else if (method === 'GET' && url === '/login') {
		res.setHeader('Content-Type', 'text/html');
		res.write('<html>');
		res.write('<h1>Login</h1>');
		res.write('<form method="POST" >');
		res.write(
			'<input type="text" name="email" /> <input name="password" type="password" />'
		);
		res.write('<button type="submit">Send</button>');
		res.write('</form>');
		res.write('</html>');
		return res.end();
	} else if (method === 'POST' && url === '/login') {
		const body = [];

		// Starts the data streamings
		req.on('data', chunk => {
			// chunk is a piece of data that we get from the streaming
			body.push(chunk);
		});

		// When the data streaming ends, we're gonna parse the body array
		req.on('end', () => {
			// We concat the chunks stored in body to read the buffer
			const parsedBody = Buffer.concat(body).toString();

			// How the data looks like -> email=max%40test.com&password=1234

			// TASK: From parsed body, get the email value and the password value, and store them in these variables
			const [email, password] = parsedBody.split('&');

			// [email, max%40test.com]
			const parsedEmail = email.split('=')[1].replace('%40', '@');

			const parsedPassword = password.split('=')[1];

			console.log(`Email: ${parsedEmail} / password: ${parsedPassword}`);
		});

		return res.end();
	}

	res.end();
});

// http://localhost:4000/
server.listen(4000);
