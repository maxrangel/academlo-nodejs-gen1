const socketIO = require('socket.io');

const createSocketServer = server => {
	const io = socketIO(server, {
		cors: {
			origin: 'http://localhost:3000',
		},
	});

	io.on('connection', socket => {
		console.log('A client has connected!');

		socket.on('new-todo', todo => {
			socket.broadcast.emit('broadcast-todos', todo);
		});

		socket.on('updated-todo', todoData => {
			socket.broadcast.emit('update', todoData);
		});

		socket.on('delete-todo', todoId => {
			socket.broadcast.emit('deleted', todoId);
		});

		socket.on('disconnect', () => {
			console.log('The client has disconnected :(');
		});
	});
};

module.exports = { createSocketServer };
